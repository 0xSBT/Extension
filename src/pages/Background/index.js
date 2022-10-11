//test map
const emoteCommandToURL = new Map();
const baseURL = 'https://d22p4hblaqdu3x.cloudfront.net/';
const imgURL_heart = baseURL + "KlayBee/heart.gif"
const imgURL_hi = baseURL + "KlayBee/hi.gif"
const imgURL_fly = baseURL + "KlayBee/fly.gif"
const imgURL_PDAO = baseURL + 'PDAO/logo.png';
const imgURL_PDAO_pepe = baseURL + 'PDAO/pepe.png'
const imgURL_PDAO_pepe2 = baseURL + 'PDAO/pepe2.png'
const imgURL_OOAK = baseURL + 'OOAK/logo.png'
const imgURL_OOAK_ID_TAG = baseURL + 'OOAK/ID_TAG.png'

//test img
emoteCommandToURL.set("KlayBee_heart", imgURL_heart);
emoteCommandToURL.set("KlayBee_hi", imgURL_hi);
emoteCommandToURL.set("KlayBee_fly", imgURL_fly);
emoteCommandToURL.set("PDAO", imgURL_PDAO);
emoteCommandToURL.set("PDAO_pepe", imgURL_PDAO_pepe);
emoteCommandToURL.set("PDAO_pepe2", imgURL_PDAO_pepe2);
emoteCommandToURL.set("OOAK", imgURL_OOAK);
emoteCommandToURL.set("OOAK_ID_TAG", imgURL_OOAK_ID_TAG);
//test img 추가



//message : "emoteCommandToURL"
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'emoteCommandToURL') {
    if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);

    const url = emoteCommandToURL.get(request.command);
    // console.log('request command : ' + request.command);
    // console.log("background url : " + url);
    let response = {
      success: false,
      result: ''
    };
    if (url === undefined || url === '') {
      response = {
        success: false,
        result: ''
      }
    } else {
      response = {
        success: true,
        result: url
      }
    }
    sendResponse(response);
    return true;
  } else if (request.message === "setBadgeState") {
    if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);
    const state = request.state;
    if (state === "ON") {
      chrome.action.setBadgeText({ text: "" })
      sendResponse({ success: true })
    } else if (state === "OFF") {
      chrome.action.setBadgeText({ text: "OFF" })
      chrome.action.setBadgeBackgroundColor(
        { color: "red" }
      );
      sendResponse({ success: true })
    } else {
      sendResponse({ success: false })
    }
  }
});