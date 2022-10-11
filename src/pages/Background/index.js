chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "setBadgeState") {
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