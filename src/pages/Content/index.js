// import {appendModal, modalToggleRunning} from '../../injectModal';
import {appendModal, modalToggleRunning} from './modules/injectModal'

//global scope variable
let detectNodeWithInterval;
let detectPathWithInterval;
let detectResetWithInterval;
const DETECT_NODE_INTERVAL = 100; // miliseconds
const DETECT_URL_INTERVAL = 100; // miliseconds
const DETECT_TWEET_INTERVAL = 100;

//reset after tweet btn is clicked
const resetAfterTweet = (tweetBtnEl) => {
    tweetBtnEl.addEventListener('click', () => {
        detectResetWithInterval = setInterval(()=> {
            let refDiv = document.querySelectorAll('div[data-testid="toolBar"]')[0];
            if (refDiv) {
                refDiv = refDiv.children[0];
                if (refDiv.lastChild.dataset.testid !== 'emoteButton') {
                    addBtnToToolbar(refDiv, imgEl);
                    clearInterval(detectResetWithInterval);
                }
            }
        },DETECT_TWEET_INTERVAL)
    })
}

// //handle after modal close
// const handleModalClose = (modalRoot) => {
//     modalRoot.addEventListener('focus', () => {
//         stop();
//         start();
//         alert('close modal')
//     })
// }



//about route change
const detectRouteChange = () => {
    // alert('detectRouteChange')
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
            } else {
                stop();//clearInterval
                isChanged = true;
            }
        }
    }, DETECT_URL_INTERVAL)

    let resetInterval = setInterval(()=> {
        if(isChanged) {
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
                    } else {
                        stop();//clearInterval
                        isChanged= true;
                    }
                }
            }, DETECT_URL_INTERVAL)
        }
    }, RESET_INTERVAL)
    
}

//about mutation observer
const targetObserver = new MutationObserver(async (mutationList, observer) => {
    console.log('mutation is detected on target node');
    const lenOfMutationList = mutationList.length;
    if (lenOfMutationList >= 0) {
        for (let i = 0; i < lenOfMutationList; i++) {
            const lenOfAddedNodes = mutationList[i].addedNodes.length;
            for (let j = 0; j < lenOfAddedNodes; j++) {
                const addedNode = mutationList[i].addedNodes[j];
                // console.log("addedNode :");
                // console.log(addedNode);
                const emoteCommand = findCommandFromTN(addedNode);
                // console.log("emoteCommand :");
                // console.log(emoteCommand);
                const emoteURL = await convertCommandToURL(emoteCommand);
                // console.log("emoteURL :");
                // console.log(emoteURL);
                const targetNode = mutationList[i].addedNodes[j].getElementsByClassName('r-bnwqim r-qvutc0')[0];
                // console.log("targetNode :");
                // console.log(targetNode);
                if (emoteURL !== '' && targetNode !== undefined) {
                    const articleNode = addedNode.getElementsByTagName('article')[0];
                    // console.log("articleNode :");
                    // console.log(articleNode);
                    articleNode.setAttribute('data-ooak-emote', true);
                    appendEmoteToTN(emoteCommand, emoteURL, targetNode);
                }
            }
        }
    }
});

//test IMG
const baseURL = 'https://gateway.pinata.cloud/ipfs/QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn/';
const ooak_icon = 'https://gateway.pinata.cloud/ipfs/QmVuiwFkhgdPCyhB58Y9drXfnDgjMt2brFKpvTjcegXrUp';
let imgEl = document.createElement('IMG');
imgEl.setAttribute('src', ooak_icon);
imgEl.setAttribute('width', "18");


//return EmoteCommand string // TN targetNode
const findCommandFromTN = (refNode) => {
    let hashtagNodeList = refNode.querySelectorAll("span.r-18u37iz > a");
    if (hashtagNodeList[hashtagNodeList.length - 1]) {
        let hashtag = hashtagNodeList[hashtagNodeList.length - 1].innerText;
        return hashtag.substring(1);
    }
}

const convertCommandToURL = async (emoteCommand) => {
    let emoteURL = '';
    let response;
    if (chrome.runtime?.id) {
        response = await chrome.runtime.sendMessage({
            message: 'emoteCommandToURL',
            command: emoteCommand
        });
        // console.log(response);
        if (response.success) {
            emoteURL += response.result;
        }
        // console.log("emote url : " + emoteURL);
        return emoteURL;
    }
    return emoteURL;
}

const appendEmoteToTN = (emoteCommand, imgURL, targetNode) => {
    let divEl = document.createElement('div');
    let imgEl = document.createElement('IMG');
    imgEl.setAttribute('src', imgURL);
    imgEl.setAttribute('width', "150");
    divEl.setAttribute('id', emoteCommand);
    divEl.setAttribute('data-emote-div', true);
    divEl.appendChild(imgEl);
    targetNode.appendChild(divEl);
}

const clearAllEmotes = () => {
    const targetArticleList = document.querySelectorAll('[data-ooak-emote = "true"]');
    const targetNodeList = document.querySelectorAll('[data-emote-div = "true"]');
    // console.log(targetArticleList)
    if (targetArticleList[0]) {
        for (let i = 0; i < targetNodeList.length; i++) {
            targetArticleList[i].removeAttribute('data-ooak-emote');
        }
    }
    if (targetNodeList[0]) {
        for (let i = 0; i < targetNodeList.length; i++) {
            targetNodeList[i].remove();
        }
    }
}


//add emote btn to toolbar
const addBtnToToolbar = (toolbarEl, btnImgURL) => {
    //root div
    let btnRootDiv = document.createElement('div');
    btnRootDiv.setAttribute('id', "ooak-emote-btn");
    btnRootDiv.setAttribute('aria-label', "Add Emotes");
    btnRootDiv.setAttribute('role', "button");
    btnRootDiv.setAttribute('tabindex', "0");
    btnRootDiv.setAttribute('class', "css-18t94o4 css-1dbjc4n r-1niwhzg r-42olwf r-sdzlij r-1phboty r-rs99b7 r-2yi16 r-1qi8awa r-1ny4l3l r-o7ynqc r-6416eg r-lrvibr emote-btn");
    btnRootDiv.setAttribute('data-testid', "emoteButton");
    //firstChild div
    let childDiv = document.createElement('div');
    childDiv.setAttribute('dir', "auto");
    childDiv.setAttribute('title', "NFT Emotes");
    childDiv.setAttribute('class', "css-901oao r-1awozwy r-1cvl2hr r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0");
    //grandChild span
    let span = document.createElement('span');
    span.setAttribute('class', "css-901oao css-16my406 css-bfa6kz r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0");
    span.setAttribute('class', "")
    //btn img
    childDiv.appendChild(btnImgURL);
    
    //append modal root to body
    const body = document.querySelector('html');
    appendModal(body);

    //add modal btn on toolbar
    childDiv.appendChild(span);
    btnRootDiv.appendChild(childDiv);
    toolbarEl.appendChild(btnRootDiv);
    modalToggleRunning(btnRootDiv);
}

const start = () => {
    detectNodeWithInterval = setInterval(async () => {
        const section = document.getElementsByTagName('section')[0];
        let articleList;
        let targetUnderObservation;
        if (section) {
            //reset after tweet 
            const tweetBtnEl = document.querySelector('[data-testid="tweetButtonInline"]');
            resetAfterTweet(tweetBtnEl);
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
                                let emoteCommand = findCommandFromTN(articleList[i]);
                                // console.log(emoteCommand);
                                let emoteURL = await convertCommandToURL(emoteCommand);
                                // console.log("emote url : " + emoteURL);
                                if (emoteURL !== '' && emoteURL !== undefined) {
                                    if (articleList[i].getAttribute('data-ooak-emote') !== "true") {
                                        articleList[i].setAttribute("data-ooak-emote", true);
                                        let targetNode = articleList[i].getElementsByClassName('r-bnwqim r-qvutc0')[0];
                                        appendEmoteToTN(emoteCommand, emoteURL, targetNode);
                                    }
                                }
                            }
                        }
                    }
                    //add Emote-Button To Toolbar
                    let refDiv = document.querySelectorAll('div[data-testid="toolBar"]')[0];
                    if (refDiv) {
                        refDiv = refDiv.children[0];
                        if (refDiv.lastChild.dataset.testid !== 'emoteButton') {
                            addBtnToToolbar(refDiv, imgEl);
                        }
                    }
                    // detect mutation that articles (appear/hide)
                    const config = { attributes: false, childList: true, subtree: false }
                    targetObserver.observe(targetUnderObservation, config);
                    // clear interval
                    clearInterval(detectNodeWithInterval);
                }
            }
        }
    }, DETECT_NODE_INTERVAL);
}

const stop = () => {
    if (targetObserver) targetObserver.disconnect();
    clearAllEmotes();
    clearInterval(detectNodeWithInterval);
    clearInterval(detectPathWithInterval);
}

const init = async () => {
    const result = await chrome.storage.sync.get(['lastState']);
    if (result.lastState === undefined) {
        await chrome.storage.sync.set({ lastState: "ON" });
        await chrome.storage.sync.set({ isExtensionOn: true });
        start();
        detectRouteChange();
    } else if (result.lastState === "ON") {
        stop();
        start();
        detectRouteChange();
    } else if (result.lastState === "OFF") {
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
        } else {
            stop();
        }
    })
}


window.onload = () => {
    init();
}




// home에서 등록시 트윗 적는 곳
//div class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"
// div 밑 span data-offset-key="a1dcl-0-0"
// span밑 data-text="true"
//document.querySelectorAll('span[data-text=true]')[0];

// home에서 등록시 버튼 있는 곳
// div class="css-1dbjc4n r-1awozwy r-18u37iz r-1s2bzr4"
// data-testid="toolBar"
//document.querySelectorAll('div[data-testid="toolBar"]')[0];
