import { modifyProfilePage, pauseControlProfilePage, resetProfilePage } from './modules/profile';

//global scope variable
let detectNodeWithInterval;
let detectPathWithInterval;
const DETECT_URL_INTERVAL = 100; // ms

//about route change
const detectRouteChange = () => {
    let url = location.href;
    let path;
    let isChanged = false;
    const RESET_INTERVAL = 100;

    detectPathWithInterval = setInterval(() => {
        if (url !== location.href) {
            url = location.href;
            path = location.pathname;
            path = path.substring(1, 9);
            if (path !== 'messages') {
                stop();//clearInterval
                start();
                isChanged = true;
                modifyProfilePage();
            } else {
                stop();//clearInterval
                isChanged = true;
            }
        }
    }, DETECT_URL_INTERVAL)

    let resetInterval = setInterval(() => {
        if (isChanged) {
            isChanged = false;
            detectPathWithInterval = setInterval(() => {
                if (url !== location.href) {
                    url = location.href;
                    path = location.pathname;
                    path = path.substring(1, 9);
                    if (path !== 'messages') {
                        stop();//clearInterval
                        start();
                        isChanged = true;
                        modifyProfilePage();
                    } else {
                        stop();//clearInterval
                        isChanged = true;
                    }
                }
            }, DETECT_URL_INTERVAL)
        }
    }, RESET_INTERVAL)

}

const start = () => {

}

const stop = () => {
    clearInterval(detectNodeWithInterval);
    clearInterval(detectPathWithInterval);
    pauseControlProfilePage();
}

const init = async () => {
    const result = await chrome.storage.sync.get(['lastState']);
    if (result.lastState === undefined) {
        await chrome.storage.sync.set({ lastState: "ON" });
        await chrome.storage.sync.set({ isExtensionOn: true });
        start();
        detectRouteChange();
        modifyProfilePage();
    } else if (result.lastState === "ON") {
        stop();
        start();
        detectRouteChange();
        modifyProfilePage();
    } else if (result.lastState === "OFF") {
        stop();
        chrome.runtime.sendMessage({
            message: 'setBadgeState',
            state: "OFF"
        }, (response) => {
            if (!response.success) console.log("setBadgeState message error!")
        });
    }

    chrome.storage.onChanged.addListener((changes, namespace) => {
        let isExtensionOn;
        if (changes['isExtensionOn']) {
            isExtensionOn = changes.isExtensionOn.newValue;
        }
        if (isExtensionOn) {
            stop();
            start();
            detectRouteChange();
            resetProfilePage();
        } else {
            stop();
        }
    })
}


window.onload = () => {
    init();
}


