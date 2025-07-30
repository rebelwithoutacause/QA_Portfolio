import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
    stages: [
        { duration: '15s', target: 10 },
        { duration: '1m', target: 1 },
        { duration: '15s', target: 0 }
    ]
};

export default function () {
    http.get('https://test.k6.io/');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
}

export function handleSummary(data) {
    return {
        'summary.html': htmlReport(data),
    };
}
