const { expect } = require('@playwright/test');
class Orderdetailspage{
constructor(page){
    this.page=page
    this.countryfield=page.locator("[placeholder*='Country']")
    this.dropdown=page.locator(".list-group")
    this.placeorderbtn=page.locator('div.actions a')
}
 async addorderdetails(){
    
    await this.countryfield.type("India", { delay: 1700 })
    await this.dropdown.waitFor()
    const optionsCount = await this.dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; ++i) {
      const  text = await this.dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India") {
            await this.dropdown.locator("button").nth(i).click()
            break;
        }
    }
 }
  async validateusername(email){
    await expect(this.page.locator('div.user__name>label')).toHaveText(email)
  }
  async placeorder(){
    await this.placeorderbtn.click()
  }
}
module.exports={Orderdetailspage}