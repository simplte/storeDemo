let baseUrl:String = "/api";
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
    case "dev":
      baseUrl = "https://test-event.ccc.cn/ccc_new_cms"; 
      break;
    case "pre":
      baseUrl = "https://test-event.ccc.cn/ccc_uat_cms";
      break;
    case "production":
      baseUrl = "https://event.ccc.cn/ccc_new_cms";
      break;
  }
export default {
    baseUrl
}