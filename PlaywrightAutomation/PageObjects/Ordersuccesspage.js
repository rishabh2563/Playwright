const { expect } = require('@playwright/test');
class Ordersuccesspage{
constructor(page){
    this.page=page
    this.successtext=page.locator('.hero-primary')
    this.orderidtext=page.locator('.em-spacer-1 .ng-star-inserted')
    this.ordersbtn=page.locator('button[routerlink*="myorders"]')
    this.tablebody=page.locator('tbody')
    this.tablerow=page.locator('tbody>tr')
}
async verifysuccessmessage(){
    await expect(this.successtext).toHaveText(' Thankyou for the order. ')
}
async verifyorderid(){
    const orderid=await this.orderidtext.textContent()
    console.log(orderid)
    await this.ordersbtn.click()
    await this.tablebody.waitFor()
    const rows=await this.tablerow
    for (let i = 0; i <await rows.count(); ++i) {
        
        const roworderid=await rows.nth(i).locator("th").textContent()
        if(orderid.includes(roworderid)){
            await rows.nth(i).locator('button').first().click()
            break;
        }
    }
    const orderiddetail=await this.page.locator('div.col-text.-main').textContent()
    expect(orderid.includes(orderiddetail)).toBeTruthy()
}
}
module.exports={Ordersuccesspage}