const { test, expect } = require('@playwright/test');
test('end To End Scenario', async ({ page }) => {
    const email='rishabh.tripathi@fleekitsolutions.com'
    const productName = "zara coat 3"
    const products = page.locator(".card-body")
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator("#userEmail").type('rishabh.tripathi@fleekitsolutions.com')
    await page.locator("#userPassword").type('Test@321')
 
    await page.locator("#login").click();
 
    //await page.waitForLoadState('networkidle');
    await page.waitForSelector("section[id='sidebar'] p");
    const alltitles = await page.locator("div[class='card-body'] h5 b").allTextContents()
    console.log("alltitles: " + alltitles)
 
    const count = await products.count()
    for (let i = 0; i < count; i++) {
        console.log("----" + await products.nth(i).locator("b").textContent())
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add product to cart
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }
 
    await page.waitForLoadState('networkidle')
    await page.locator("button[routerlink='/dashboard/cart']").dispatchEvent('click')
    await page.locator("div li").first().waitFor()
    const bool = await page.locator("h3:has-text('zara coat 3')").last().isVisible()
    expect(bool).toBeTruthy();
 
    //Click on checkout
    await page.waitForLoadState('networkidle')
    await page.locator("text=Checkout").dispatchEvent('click')
    //await page.pause()
    //Select expiry date and type cvv and name on card
 
    //Select country
    await page.waitForLoadState('networkidle')
    await page.locator("[placeholder*='Country']").type("India", { delay: 1700 })
    const dropdown = page.locator(".list-group")
    await dropdown.waitFor()
    optionsCount = await dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; ++i) {
        text = await dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click()
            break;
        }
    }
    await expect(page.locator('div.user__name>label')).toHaveText('rishabh.tripathi@fleekitsolutions.com')
    await page.locator('div.actions a').click()
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    const orderid=await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(orderid)
    await page.locator('button[routerlink*="myorders"]').click()
    await page.locator('tbody').waitFor()
    const rows=await page.locator('tbody>tr')
    for (let i = 0; i <await rows.count(); ++i) {
        
        const roworderid=await rows.nth(i).locator("th").textContent()
        if(orderid.includes(roworderid)){
            await rows.nth(i).locator('button').first().click()
            break;
        }
    }
    const orderiddetail=await page.locator('div.col-text.-main').textContent()
    expect(orderid.includes(orderiddetail)).toBeTruthy()
 
});