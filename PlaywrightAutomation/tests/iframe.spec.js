const { test,expect } = require('@playwright/test')
test('handle alert popups',async({page})=>{
    await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/')
    const frame=page.frameLocator('#courses-iframe');
    frame.locator('li a[href*=life]:visible').click();
})