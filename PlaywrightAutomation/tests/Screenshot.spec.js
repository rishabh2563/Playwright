const {test,expect}=require('@playwright/test');
test('Launch directly with page',async({page})=>{
    await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'})
    await page.locator('#hide-textbox').click()
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden()
})