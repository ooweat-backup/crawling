const request = require("request");
const accessToken = "jbWv2P8JfpcxIf4rxNCnos1tjRMfEUmCWVV9-IhlCilv1QAAAYM0o89y";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: "Bearer " + accessToken,
};

function sendMessage(msg) {
  let text = JSON.parse(msg);

  const template_object =
      text.type === 'text' ?
      `template_object={
          "object_type": "text",
          "text": "${text.description}",
          "link": {
              "android_execution_params": "${text.url}",
              "ios_execution_params": "${text.url}"
          },
          "button_title": "바로 확인"
      }`
      :
      `template_object={
          "object_type": "feed",
          "content": {
                  "title": "${text.name}",
                  "description": "${text.description}",
                  "image_url": "${text.image}",
                  "image_width": 640,
                  "image_height": 640,
                  "link": {
                      "web_url": "${text.url}",
                      "mobile_web_url": "${text.url}",
                      "android_execution_params": "contentId=100",
                      "ios_execution_params": "contentId=100"
                  }
              },
          "buttons": [
                  {
                      "title": "웹으로 이동",
                      "link": {
                          "web_url": "${text.url}",
                          "mobile_web_url": "${text.url}"
                      }
                  },
                  {
                      "title": "앱으로 이동",
                      "link": {
                          "android_execution_params": "contentId=100",
                          "ios_execution_params": "contentId=100"
                      }
                  }
              ]
      }`
  ;

  const options = {
    url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
    method: "POST",
    headers: headers,
    body: template_object,
  };

  request(options, (error, response, body) => {
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      //성공처리
    } else {
      //오류처리
    }
  });
}

module.exports = {
  sendMessage: sendMessage,
};
