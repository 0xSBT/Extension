//test map
const emoteCommandToURL = new Map();
const baseURL = 'https://gateway.pinata.cloud/ipfs/QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn/';
const imgURL_heart = baseURL + "heart.gif"
const imgURL_greeting = baseURL + "greeting.gif"
const imgURL_fly = baseURL + "fly.gif"
const imgURL_fly_2 = baseURL + "fly_2.gif"
const imgURL_PDAO = 'https://gateway.pinata.cloud/ipfs/Qma93f8F2pmB3ndwKG4yy4qih1NAEK8JgfPR9Faj7sQSnh';

//test img
emoteCommandToURL.set("KlayB_heart", imgURL_heart);
emoteCommandToURL.set("KlayB_hi", imgURL_greeting);
emoteCommandToURL.set("KlayB_fly", imgURL_fly);
emoteCommandToURL.set("KlayB_fly_2", imgURL_fly_2);
emoteCommandToURL.set("PDAO", imgURL_PDAO);

//test img 추가
// emoteCommandToURL.set("NFT", imgURL_fly_2);



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
    if (url === undefined || url ==='') {
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
      sendResponse({success: true})
    } else if(state === "OFF") {
      chrome.action.setBadgeText({ text: "OFF" })
      chrome.action.setBadgeBackgroundColor(
          { color: "red" }
      );
      sendResponse({success: true})
    } else {
      sendResponse({success: false})
    }
  }
});