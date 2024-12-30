const {test,expect,request}=require('@playwright/test')
const {APIutils}=require('./Utils/APIutils')
const payload={userEmail: "rishabh.tripathi@fleekitsolutions.com", userPassword: "Test@321"}
const orderdata={orders: [
   {country: "India",
   productOrderedId: "6262e990e26b7e1a10e89bfa"}
]
}
const fakeresponse={data:[],message:"No Orders"}
let response;

test.beforeAll(async()=>{
   const apicontext= await request.newContext()
   const apiutil=new APIutils(apicontext,payload);
   response= await apiutil.createorder(orderdata)
  
})

test('end To End Scenario', async ({ page }) => {
   
 
   page.addInitScript(value=>{
      window.localStorage.setItem('token',value);
   },response.token);
   await page.goto('https://rahulshettyacademy.com/client');
   await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6295e566e26b7e1a10ec7b05',
   async(route)=>{
    const response=await page.request.fetch(route.request())
    let body=fakeresponse
    route.fulfill({
        response,
        body
    })
   })
   await page.pause()
    await page.locator('button[routerlink*="myorders"]').click()
    await page.locator('tbody').waitFor()
    const rows=await page.locator('tbody>tr')
    for (let i = 0; i <await rows.count(); ++i) {
        
        const roworderid=await rows.nth(i).locator("th").textContent()
        if(response.orderid.includes(roworderid)){
            await rows.nth(i).locator('button').first().click()
            break;
        }
    }
    const orderiddetail=await page.locator('div.col-text.-main').textContent()
    await page.pause()
    expect(response.orderid.includes(orderiddetail)).toBeTruthy()
   

});

// in the above test we have bypassed login and  create order test by handling the tests with
// the API calls.