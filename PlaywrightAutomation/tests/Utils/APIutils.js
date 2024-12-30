const {test,expect,request}=require('@playwright/test')
class APIutils{

    constructor(apicontext,payload){
        this.apicontext=apicontext
        this.payload=payload
    }
    // get token method which returns the token
    async get_token(){
        const loginresponse=await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
   {
    data:this.payload
   }
   )
   expect(loginresponse.ok()).toBeTruthy()
   const loginresponsejson=await loginresponse.json()
    const token=loginresponsejson.token
    return token;
    }
    // create order method that accepts orderdata as a parameter and returns response object having 
    // orderid and token
    async createorder(orderdata){
        let response={};
        response.token= await this.get_token()
        const orderresponse= await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
   {
      data:orderdata,
      headers:{
         'Authorization' :response.token,
         'Content-Type'  : 'application/json'

      }
   }
   )
   const orderresjson=await orderresponse.json()
   console.log(orderresjson)
   const orderid=orderresjson.orders[0];
   response.orderid=orderid;
   return response
    }
}
module.exports= {APIutils}