// QA smoke test: loads every HTML page under docs/, fails the build if any
// page throws a console/page error, has a failed network request, links to
// a local file that doesn't exist, or overflows horizontally on a phone-
// width viewport (this last one is how the mobile layout bugs fixed this
// session - clipped titles, buttons pushed outside the panel - slipped
// through: the rest of this test only ever ran at desktop width).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, '../../docs');
const PORT = 8177;
const BASE_URL = `http://localhost:${PORT}`;
const MOBILE_VIEWPORT = { width: 375, height: 667 }; // iPhone SE-class width
const OVERFLOW_TOLERANCE_PX = 2; // sub-pixel rounding slack

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.mp3': 'audio/mpeg',
    '.ico': 'image/x-icon',
};

function startServer() {
    const server = createServer(async (req, res) => {
        try {
            let urlPath = decodeURIComponent(req.url.split('?')[0]);
            let filePath = path.join(DOCS_ROOT, urlPath);
            if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');

            const st = await stat(filePath).catch(() => null);
            if (st && st.isDirectory()) filePath = path.join(filePath, 'index.html');

            if (!existsSync(filePath)) {
                res.writeHead(404);
                res.end('Not found');
                return;
            }

            const ext = path.extname(filePath);
            const body = await readFile(filePath);
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
            res.end(body);
        } catch (err) {
            res.writeHead(500);
            res.end(String(err));
        }
    });
    return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

function findHtmlFiles(dir, base = dir) {
    let results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(findHtmlFiles(full, base));
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            results.push(path.relative(base, full).split(path.sep).join('/'));
        }
    }
    return results;
}

function isLocalLink(href) {
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (/^[a-z]+:/i.test(href)) return false; // http:, https:, mailto:, tel:, data:, javascript:
    if (href.startsWith('//')) return false;
    return true;
}

async function checkPage(page, pagePath) {
    const url = `${BASE_URL}/${pagePath}`;
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    const onConsole = (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
    };
    const onPageError = (err) => pageErrors.push(err.message);
    const onRequestFailed = (req) => {
        failedRequests.push(`${req.url()} -> ${req.failure()?.errorText}`);
    };

    page.on('console', onConsole);
    page.on('pageerror', onPageError);
    page.on('requestfailed', onRequestFailed);

    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

    // Check local links resolve to a real file/route.
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    const brokenLinks = [];
    const pageDir = path.posix.dirname(pagePath);
    for (const href of hrefs) {
        if (!isLocalLink(href)) continue;
        const cleanHref = href.split('#')[0].split('?')[0];
        if (!cleanHref) continue; // pure #fragment link
        let targetPath = path.posix.normalize(path.posix.join(pageDir, cleanHref));
        if (targetPath.startsWith('..')) {
            brokenLinks.push(`${href} (resolves outside docs/: ${targetPath})`);
            continue;
        }
        let fsTarget = path.join(DOCS_ROOT, targetPath);
        if (targetPath.endsWith('/') || !path.extname(fsTarget)) {
            fsTarget = path.join(fsTarget, 'index.html');
        }
        if (!existsSync(fsTarget)) {
            brokenLinks.push(`${href} -> missing ${path.relative(DOCS_ROOT, fsTarget)}`);
        }
    }

    page.off('console', onConsole);
    page.off('pageerror', onPageError);
    page.off('requestfailed', onRequestFailed);

    return { pagePath, consoleErrors, pageErrors, failedRequests, brokenLinks };
}

// Loads the page at phone width and checks whether anything pushes the
// document wider than the viewport - the same symptom (scrollWidth >
// clientWidth) behind every mobile layout bug fixed this session.
async function checkMobileOverflow(mobilePage, pagePath) {
    const url = `${BASE_URL}/${pagePath}`;
    await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

    const { scrollWidth, clientWidth } = await mobilePage.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
    }));

    const overflowPx = scrollWidth - clientWidth;
    if (overflowPx > OVERFLOW_TOLERANCE_PX) {
        return [`horizontal overflow at ${MOBILE_VIEWPORT.width}px viewport: content is ${scrollWidth}px wide (${overflowPx}px too wide)`];
    }
    return [];
}

async function main() {
    const server = await startServer();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const mobilePage = await browser.newPage({ viewport: MOBILE_VIEWPORT });

    const htmlFiles = findHtmlFiles(DOCS_ROOT).sort();
    console.log(`Found ${htmlFiles.length} page(s) under docs/:\n  ${htmlFiles.join('\n  ')}\n`);

    const results = [];
    for (const file of htmlFiles) {
        process.stdout.write(`Checking ${file} ... `);
        const result = await checkPage(page, file);
        result.mobileIssues = await checkMobileOverflow(mobilePage, file);
        const hasIssues =
            result.consoleErrors.length ||
            result.pageErrors.length ||
            result.failedRequests.length ||
            result.brokenLinks.length ||
            result.mobileIssues.length;
        console.log(hasIssues ? 'FAIL' : 'ok');
        results.push(result);
    }

    await browser.close();
    server.close();

    let failed = false;
    for (const r of results) {
        const issues = [
            ...r.consoleErrors.map((m) => `console error: ${m}`),
            ...r.pageErrors.map((m) => `page error: ${m}`),
            ...r.failedRequests.map((m) => `failed request: ${m}`),
            ...r.brokenLinks.map((m) => `broken link: ${m}`),
            ...r.mobileIssues.map((m) => `mobile: ${m}`),
        ];
        if (issues.length) {
            failed = true;
            console.log(`\n--- ${r.pagePath} ---`);
            issues.forEach((i) => console.log(`  ✗ ${i}`));
        }
    }

    if (failed) {
        console.log('\nQA smoke test FAILED.');
        process.exit(1);
    } else {
        console.log('\nAll pages passed QA smoke test.');
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
