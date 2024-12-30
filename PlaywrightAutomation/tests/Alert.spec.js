const { test,expect } = require('@playwright/test')
test('handle alert popups',async({page})=>{
    await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/')
    page.on('dialog',dialog=>dialog.dismiss());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
})