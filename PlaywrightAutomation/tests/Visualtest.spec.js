const {test,expect}=require('@playwright/test');
test('Launch directly with page',async({page})=>{
    await page.goto('https://uk.flightaware.com/')
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})