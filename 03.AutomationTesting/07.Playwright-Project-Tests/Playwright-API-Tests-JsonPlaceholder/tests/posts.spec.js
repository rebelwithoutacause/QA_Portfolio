import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('GET /posts/1 returns a single post', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    // toBeOK() - built-in matcher, проверява status в диапазон 200-299
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      userId: 1,
    });
    expect(body.title).toBeTruthy();
  });

  test('GET /posts/9999 returns 404 for missing post', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/9999`);
    expect(response.status()).toBe(404);
  });

  test('POST /posts creates a new post', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: {
        title: 'Playwright API testing',
        body: 'Учим се да пишем API тестове',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201); // 201 Created
    const body = await response.json();
    expect(body.title).toBe('Playwright API testing');
    expect(body.id).toBeDefined();
  });

  test('GET /posts?userId=1 filters by query param', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`, {
      params: { userId: 1 },
    });

    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });

  test('PUT /posts/1 updates an existing post', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: {
        id: 1,
        title: 'Updated Title',
        body: 'Updated body content',
        userId: 1,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe('Updated Title');
    expect(body.body).toBe('Updated body content');
  });

  test('DELETE /posts/1 deletes a post', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);
    expect(response.status()).toBe(200);
  });
});