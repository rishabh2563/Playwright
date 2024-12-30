const { expect } = require('@playwright/test');
class Dashboardpage{
    constructor(page){
        this.page=page;
        this.cardtitles=page.locator("div[class='card-body'] h5 b");
        this.products= page.locator(".card-body");
        this.cartbtn= page.locator("button[routerlink='/dashboard/cart']")
        
    }

    async Addproducttocart(productName){
        const alltitles = await this.cardtitles.allTextContents()
        console.log("alltitles: " + alltitles);
        const count = await this.products.count()
        for (let i = 0; i < count; i++) {
            // console.log("----" + await this.products.nth(i).locator("b").textContent())
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add product to cart
                await this.products.nth(i).locator("text= Add To Cart").click()
                break;
            }
        }

    }
    async navigatetocart(){
    await this.cartbtn.dispatchEvent('click')
    await this.page.waitForLoadState('networkidle')
    
    }
     async validate_productoncartpage(){
      
        await this.page.locator("div li").first().waitFor('5000')
    
    const bool = await this.page.locator("h3:has-text('zara coat 3')").last().isVisible()
    await expect(bool).toBeTruthy();
     }

     async click_checkoutbtn(){
        //Click on checkout
    await this.page.waitForLoadState('networkidle')
    await this.page.locator("text=Checkout").dispatchEvent('click')
    await this.page.waitForLoadState('networkidle')
     }

   

}
module.exports={Dashboardpage}