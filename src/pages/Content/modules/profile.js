import * as Caver from 'caver-js/index';
import ABI from '../abi.json';

const CHAIN_ID = '8217'; //MAINNET 8217 TESTNET 1001
const KAS_KEY = process.env.REACT_APP_PRIVATE_KEY;
const option = {
    headers: [
        {
            name: 'Authorization',
            value: KAS_KEY,
        },
        { name: 'x-chain-id', value: CHAIN_ID },
    ],
};

const caverForCall = new Caver(
    new Caver.providers.HttpProvider(
        'https://node-api.klaytnapi.com/v1/klaytn',
        option,
    ),
);
const contractAddress = '0x465F2CeA7385Bea2711cA1b6b0A8c65108b1E3cF';
const sbtContract = new caverForCall.contract(ABI, contractAddress);

// find profile btn 
const modifyProfilePage = () => {
    const PROFILE_INTERVAL = 1000; //ms
    let count = 0;

    let detectProfileWithInterval = setInterval(() => {
        const userNameBox = document.querySelector('[data-testid="UserName"]');
        if (userNameBox) {
            appendTagTo(userNameBox);
            clearInterval(detectProfileWithInterval)
        } else {
            count++;
            if (count >= 5) {
                clearInterval(detectProfileWithInterval)
            }
        }
    }, PROFILE_INTERVAL)
}

const appendTagTo = async (targetNode) => {
    targetNode.setAttribute('id', 'id-tag-appended');
    const targetId = targetNode.getAttribute('id');
    if (targetId === null) {
        targetNode.setAttribute('id', 'id-tag-appended');
        const userId = targetNode.innerText.split('@')[1].split('\n')[0];
        const addr = await sbtContract.methods.twitterIdToAddress(userId).call();
        const hasSoul = addr !== "0x0000000000000000000000000000000000000000" ? true : false;
        if (hasSoul) {
            const tagEl = createSoulTagEl(hasSoul);
            targetNode.appendChild(tagEl);
        }
    } else if (targetId === 'id-tag-appended') {
        const textDiv = targetNode.querySelector('div.id-tag-text-box');
        const userId = targetNode.innerText.split('@')[1].split('\n')[0];
        const addr = await sbtContract.methods.twitterIdToAddress(userId).call();
        const hasSoul = addr !== "0x0000000000000000000000000000000000000000" ? true : false;
        if (!hasSoul) return;
        if (textDiv === undefined || textDiv === null) {
            const tagEl = createSoulTagEl(hasSoul);
            targetNode.appendChild(tagEl);
        }
    }
}

const createSoulTagEl = (hasSoul) => {
    const rootDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const linkEl = document.createElement('a');
    const imgEl = document.createElement('img');
    const textDiv = document.createElement('div');
    const src = 'https://d22p4hblaqdu3x.cloudfront.net/Soul/soul-32.png';
    const href = 'https://da0xsbt.xyz';

    rootDiv.setAttribute('class', 'soul-tag-container');
    rootDiv.setAttribute('aria-label', 'Soul-Tag');
    linkEl.setAttribute('href', href);
    linkEl.setAttribute('target', '_blank');
    imgEl.setAttribute('class', 'id-tag id-tag-img');
    imgEl.setAttribute('src', src);
    imgDiv.setAttribute('class', 'id-tag-img-container id-tag-flex-box hint--top hint--rounded')
    imgDiv.setAttribute('aria-label', 'Join DA0xSBT');
    textDiv.setAttribute('class', 'id-tag-flex-box id-tag-text-box');
    textDiv.innerText = hasSoul ? "0xSOUL" : "I do not have SOUL...";

    linkEl.appendChild(imgEl);
    imgDiv.appendChild(linkEl);
    rootDiv.appendChild(imgDiv);
    rootDiv.appendChild(textDiv);
    return rootDiv;
}

const pauseControlProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) {
        userNameBox.removeAttribute('id');
        const soulTagContainer = userNameBox.querySelector('div.soul-tag-container');
        if (soulTagContainer) soulTagContainer.remove();
    }
}

const resetProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) appendTagTo(userNameBox);
}




export { modifyProfilePage, pauseControlProfilePage, resetProfilePage };