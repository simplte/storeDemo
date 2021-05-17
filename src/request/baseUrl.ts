let baseUrl:String = "/api";
let elUrl:String = '/elApi'
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
    case "dev":
      baseUrl = "https://test-event.ccc.cn/ccc_new_cms"; 
      elUrl= "https://elm.cangdu.org"
      break;
    case "pre":
      baseUrl = "https://test-event.ccc.cn/ccc_uat_cms";
      elUrl= "https://elm.cangdu.org"
      break;
    case "production":
      baseUrl = "https://event.ccc.cn/ccc_new_cms";
      elUrl= "https://elm.cangdu.org"
      break;
  }
export default {
    baseUrl,
    elUrl
}