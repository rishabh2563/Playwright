const { test, expect } = require('@playwright/test');
const {Loginpage}=require('../PageObjects/Loginpage')
const {Dashboardpage}=require('../PageObjects/DashBoardpage');
const {Orderdetailspage}= require('../PageObjects/Orderdetailspage');
const {Ordersuccesspage}= require('../PageObjects/Ordersuccesspage');
const dataset=JSON.parse(JSON.stringify(require('../Testdata/Testdata.json')));
const {customtest}=require('../tests/Utils/testbase')


customtest('end To End Scenario', async ({ page,testorderdata }) => {
   
    const loginpage= new Loginpage(page)
    const dashboard= new Dashboardpage(page)
    const orderdetailspage= new Orderdetailspage(page)
    const ordersuccesspage= new Ordersuccesspage(page)
    await loginpage.visiturl()
    await loginpage.validlogin(testorderdata.email,testorderdata.password)
    await dashboard.Addproducttocart(testorderdata.productName)
    await dashboard.navigatetocart()
    await dashboard.validate_productoncartpage()
    await dashboard.click_checkoutbtn()
    await orderdetailspage.addorderdetails()      //Select country
    await orderdetailspage.validateusername(testorderdata.email)// validate user name on order details page
    await orderdetailspage.placeorder()// click placeorder button
    await ordersuccesspage.verifysuccessmessage()// verify message on ordersuccess page
    await ordersuccesspage.verifyorderid()// verify the order id on orderspage
});
