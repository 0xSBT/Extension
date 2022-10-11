import { modifyProfilePage, pauseControlProfilePage, resetProfilePage } from './modules/profile';
import * as Caver from 'caver-js/index';
import ABI from './abi.json';

const CHAIN_ID = '1001'; //MAINNET 8217 TESTNET 1001
const KAS_KEY = 'Basic S0FTS05WTk1JNUw0OEpSTUpEM0ROMEk2OnVhZmR2ZURNVTVjUmVEMC0zcF9Zei01NHVobkxWbm84bkZ1bG16NG4=';
const option = {
    headers: [
        {
            name: 'Authorization',
            value: KAS_KEY,
        },
        { name: 'x-chain-id', value: CHAIN_ID },
    ],
};

//define caver for call
const caverForCall = new Caver(
    new Caver.providers.HttpProvider(
        'https://node-api.klaytnapi.com/v1/klaytn',
        option,
    ),
);

const address = '0x13A3920e58edbDdd5a49dBa7fd75f20f08F05E96';
const soulContractVer2 = new caverForCall.contract(ABI, address);
const getSoulBalance = async address => {
    const balance = await soulContractVer2.methods.balanceOf(address).call();
    return balance;
};

//global scope variable
let detectNodeWithInterval;
let detectPathWithInterval;
const DETECT_NODE_INTERVAL = 100; // ms
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
    detectNodeWithInterval = setInterval(async () => {
        const section = document.getElementsByTagName('section')[0];
        let articleList;
        let targetUnderObservation;
        if (section) {
            //continue
            targetUnderObservation = section.children[1].children[0];
            if (targetUnderObservation !== undefined) {
                articleList = document.getElementsByTagName('article');
                if (articleList[0] !== undefined) {
                    const length = document.getElementsByTagName('article').length;
                    for (let i = 0; i < length; i++) {
                        if (articleList[i]) {
                            let emoteIsAdded = articleList[i].getAttribute('data-ooak-emote');
                            // emoteIsAdded >> true or null                            
                            if (!emoteIsAdded) {
                                // console.log(emoteCommand);
                                // console.log("emote url : " + emoteURL);
                            }
                        }
                    }
                    //add Emote-Button To Toolbar
                    let refDiv = document.querySelectorAll('div[data-testid="toolBar"]')[0];
                    if (refDiv) {
                        refDiv = refDiv.children[0];
                        if (refDiv.lastChild.dataset.testid !== 'emoteButton') {
                        }
                    }
                    // detect mutation that articles (appear/hide)
                    // clear interval
                    clearInterval(detectNodeWithInterval);
                }
            }
        }
    }, DETECT_NODE_INTERVAL);
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
        modifyProfilePage();
        detectRouteChange();
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


