const base=require('@playwright/test')

exports.customtest=base.test.extend({
    testorderdata: 
        {
            email:"rishabh.tripathi@fleekitsolutions.com",
            password:"Test@321",
            productName:"zara coat 3"
            },
    
}
)