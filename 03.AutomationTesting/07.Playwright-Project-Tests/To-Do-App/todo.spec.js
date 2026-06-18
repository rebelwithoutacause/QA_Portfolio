//Add new task
const {test, expect} = require('@playwright/test');

test( 'User should add new todo task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input','Buy coffee');
    await page.click('#add-task');

    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Buy coffee');
});

// Delete a task
test ( 'User should delete a task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input','Buy coffee');
    await page.click('#add-task');
    await page.click('.delete-task');

    await expect(page.locator('.task')).toHaveCount(0);
});
   
// Mark a task as completed
test ( 'User should mark a task as completed', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input','Buy coffee');
    await page.click('#add-task');
    await page.click('.task .task-complete');

    const taskCompleted = await page.$('.task.completed');
    expect(taskCompleted).not.toBeNull();
});

// Filter a task
test ( 'User should filter tasks', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input','Buy coffee');
    await page.click('#add-task');
    await page.fill('#task-input','Walk the dog');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    await page.selectOption('#filter', 'completed');

    const completedTasks = await page.$$('.task.completed');
    expect(completedTasks.length).toBe(1);
});
