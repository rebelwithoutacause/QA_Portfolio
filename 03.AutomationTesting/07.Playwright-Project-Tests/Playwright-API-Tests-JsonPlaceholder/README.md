# Playwright API Tests — JSONPlaceholder

API-only test suite using Playwright's `request` fixture (no browser) against
[jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com), demonstrating:

- GET (single resource, 404 handling, query-param filtering)
- POST (create, status 201, response shape)
- PUT (update, request/response body matching)
- DELETE
- `response.ok()` / `response.status()` / `response.json()` assertions

## Structure

```
tests/
  posts.spec.js
```

## Run

```bash
npm install
npx playwright install
npm test
npm run test:ui
npm run report
```
