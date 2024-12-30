const {test,expect}=require('@playwright/test');

test.describe.configure({mode:'serial'}) // to tell wether the test will run paralley or serially
test('Launch with browser context',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage()
    const username= page.locator('#username')
    const signinbtn=page.locator('#signInBtn')
    const cardtitle= page.locator('.card-body a')
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title());
   await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
   await username.type('rahulshetty')
   await page.locator('#password').type('learning')
   await page.locator('#signInBtn').click()
   console.log(await page.locator('div[style*="block"]').textContent());
   await expect(page.locator('div[style*="block"]')).toContainText('Incorrect')
   await username.fill("");
   await username.fill('rahulshettyacademy')
   await Promise.all(
       [
       page.waitForNavigation(),
       signinbtn.click(),
     ]
    )
   console.log(await page.locator('.card-body a').first().textContent())
   const cardtitles=await cardtitle.allTextContents()
   console.log(cardtitles)
})

test('Launch directly with page',async({page})=>{
   const products=page.locator('div.card-body')
   const productname='zara coat 3'
   await page.goto('https://rahulshettyacademy.com/client');
   await page.locator('#userEmail').type('rishabh.tripathi@fleekitsolutions.com');
   await page.locator('#userPassword').type('Test@321');
   await page.locator('#login').click();
   await page.waitForLoadState('networkidle');
   const titles = await page.locator('.card-body b').allTextContents();
   console.log(titles);
    const count= await products.count();
    for (let i = 0; i < count; i++) {
       if(await products.nth(i).locator('b').textContent()== productname)
       {
          await products.nth(i).locator('text=Add To Cart').click()
          break;
       } 
    }
    await page.waitForLoadState('networkidle')
    await page.locator("button[routerlink='/dashboard/cart']").click()
    await page.locator('div.cart li').first().waitFor()
    const bool= await page.locator('h3:has-text("zara coat 3")').isVisible()
    expect(bool).toBeTruthy()
    await page.locator('button[type="button"]').nth(1).click()
    await page.locator('div.field.small input[type="text"]').first().type('102')
    await page.locator("div.field input[type='text']").nth(2).type('Rishabh')
    await page.locator('input[name="coupon"]').type('RahulShettyAcademy')
    await page.locator('input[placeholder="Select Country"]').type("ind",{delay:400})
    const dropdown= page.locator('section.ta-results')
    await dropdown.waitFor()
    optioncount= await dropdown.locator('button').count();
    for (let i = 0; i < optioncount; i++) {
      const text=await dropdown.locator('button').nth(i).textContent()
      if(text==' India'){
         await dropdown.locator('button').nth(i).click()
         break;
      }
       
    }
    

})



// in parallel mode everything will execute parallely but in serial mode the if a test case fails then
// the next tests will be skipped basically we use this when there is dependency between the tests.