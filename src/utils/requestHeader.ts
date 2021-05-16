import md5 from "../assets/sdk/md5"
import equipment from "./equipment"
let platform = equipment.isIos() ? "iphone" : "android";
console.warn(`手机系统：${platform}`);
// 生成签名
function buildSign(platform: string, macAddress: string, time: number) {
  var pjStr = "platform=" + platform + "&macAddress=" + macAddress + "&time=" + time + "&appsecret=ZePD4yB5";
  var signStr = pjStr.toLowerCase();
  var sign = md5.mhex_md5(signStr);
  return sign;
}

interface header {
    'Content-Type': string,
    platform: string,
    macAddress: string,
    time: Number,
    sign: string,
    appKey: string,
    sid: string
}

const header:header = {
  "Content-Type": "application/json",
  platform: "h5",
  macAddress: "",
  time: 0,
  sign: "",
  appKey: "uniqloApp",
  sid: ""
};

function getRequestHeader(): header {
    var timestamp = Date.parse(String(new Date())) / 1000;
    header["sign"] = buildSign("h5", "", timestamp);
    header["time"] = timestamp;
    return header;
}
export default {
    getRequestHeader
}