class Loginpage{
    constructor(page){
        this.page=page
        this.email=page.locator("#userEmail")
        this.password=page.locator("#userPassword")
        this.siginbtn=page.locator("#login")
    }
    async validlogin(email,password){
    await this.email.type(email)
    await this.password.type(password)
    await this.siginbtn.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector("section[id='sidebar'] p");
    }

    async visiturl(){
       await this.page.goto('https://rahulshettyacademy.com/client/')
    }
    

}
module.exports={Loginpage}