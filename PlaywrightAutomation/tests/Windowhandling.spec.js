const {test,expect}=require('@playwright/test');
test('Window handling test',async({browser})=>{
    const context= await browser.newContext()
    const page =await context.newPage()
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    const username= page.locator('#username')
    const blinkinglink=page.locator('a[href*="documents"]')
    const [newpage]=await Promise.all(
        [
            context.waitForEvent('page'),
             blinkinglink.click(),
        ]
    )
    const text= await newpage.locator('div.top-left ul.clearfix:nth-of-type(1) li:nth-child(1)').textContent()
    const arr1=text.split('@')
    const email=arr1[1];
    console.log(email)
    await username.type(email);
   
    

})
// contact@rahulshettyacademy.com