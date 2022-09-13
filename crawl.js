const scheduler = require("node-schedule");
const cheerio = require("cheerio");
const request = require("request");
const alert = require("./alert.js");

let crawlUrl = "";
const type = "feed"; //feed or text

function musinsa(itemNum, size) {
  //TODO: 테스트를 위해 5초마다 실행
  const schedule = scheduler.scheduleJob("*/5 * * * * *", function () {
    crawlUrl = "https://store.musinsa.com/app/goods/";
    let url = crawlUrl + itemNum;
    request(url, function (error, response, html) {
      if (error) {
        throw error;
      }
      const $ = cheerio.load(html);
      const name = $(".product_title em").text();
      const option = $(".option1 option");
      const image = $(".product-img img").attr("src");
      let map = new Map();

      for (let i = 1; i < option.length; i++) {
        map.set(option[i].attribs.value, option[i].attribs.jaego_yn);
      }

      if (map.get(size) === "Y") {
        let msg = `{
            "name": "${name}",
            "value": "${size}",
            "description": "무신사, ${name} 재고알림 사이즈:${size}, 재고: ${map.get(size)}",
            "url": "${url}",
            "image": "https:${image}",
            "type": "${type}"
          }`;
        alert.sendMessage(msg);
        //재고가 있으면 종료
        schedule.cancel();
      }
    });
  });
}

function naver(){
  const schedule = scheduler.scheduleJob("*/5 * * * * *", function () {
    if (1 === 1) {
      const name = "이름"
      const value = "값"
      let msg = `{
            "name": "${name}",
            "value": "${value}",
            "description": "네이버 크롤링, ${name}:${value}",            
            "url": "",
            "image": "https://",
            "type": "${type}"
          }`;
      alert.sendMessage(msg);
      //재고가 있으면 종료
      schedule.cancel();
    }
  });
}
module.exports = {
  musinsa: musinsa,
  naver: naver,
};
