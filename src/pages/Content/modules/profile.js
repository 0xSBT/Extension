import * as Caver from 'caver-js/index';
import ABI from '../abi.json';

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

const caverForCall = new Caver(
    new Caver.providers.HttpProvider(
        'https://node-api.klaytnapi.com/v1/klaytn',
        option,
    ),
);
const contractAddress = '0xA75C4980Cfac23f268368eBb5507D70B14a1f484';
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
    // console.log(targetNode);
    if (targetId === null) {
        targetNode.setAttribute('id', 'id-tag-appended');
        // console.log(targetId);
        const userId = targetNode.innerText.split('@')[1].split('\n')[0];
        // console.log(userId);
        const addr = await sbtContract.methods.getAddressFromTwitterId(userId).call();
        const hasSoul = addr !== "0x0000000000000000000000000000000000000000" ? true : false;
        if (hasSoul) {
            const tagEl = createSoulTagEl(hasSoul);
            targetNode.appendChild(tagEl);
        }
    } else if (targetId === 'id-tag-appended') {
        const textDiv = targetNode.querySelector('div.id-tag-text-box');
        const userId = targetNode.innerText.split('@')[1].split('\n')[0];
        const addr = await sbtContract.methods.getAddressFromTwitterId(userId).call();
        const hasSoul = addr !== "0x0000000000000000000000000000000000000000" ? true : false;
        if (!hasSoul) return;
        if (textDiv === undefined || textDiv === null) {
            const tagEl = createSoulTagEl(hasSoul);
            targetNode.appendChild(tagEl);
        }
    }
    // if (targetId === null) { // if not appended
    //     targetNode.setAttribute('id', 'id-tag-appended');
    //     let userId = targetNode.innerText.split('@')[1];
    //     userId = userId.split('\n')[0];
    //     console.log(userId);
    //     const serverURL = `${baseURL}idtag?twitterId=${userId}`;
    //     axios.get(serverURL).then((res) => {
    //         const result = res.data.result;
    //         if (result === "success") {
    //             //id tag
    //             const nickname = res.data.idTag;
    //             const idTagEl = createIdTagEl(nickname);
    //             targetNode.appendChild(idTagEl);
    //             //dao list
    //             const DAOArr = res.data.DAO;
    //             const DAOlistEl = createDAOlistEl(DAOArr);
    //             targetNode.appendChild(DAOlistEl);
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //         alert('서버에 문제가 생겨 복구 중입니다...')
    //     })
    // } else if (targetId === 'id-tag-appended') { //else if appended

    //     let userId = targetNode.innerText.split('@')[1];
    //     userId = userId.split('\n')[0];
    //     const serverURL = `${baseURL}idtag?twitterId=${userId}`;
    //     axios.get(serverURL).then((res) => {
    //         const result = res.data.result;
    //         if (result === "success") {
    //             //id tag
    //             const nickname = res.data.idTag;
    //             const textDiv = targetNode.querySelector('div.id-tag-text-box');
    //             if (textDiv) {
    //                 textDiv.innerText = nickname;
    //             } else {
    //                 const idTagEl = createIdTagEl(nickname);
    //                 targetNode.appendChild(idTagEl);
    //             }
    //             //dao list
    //             const DAOArr = res.data.DAO;
    //             const DAOlistContainer = targetNode.querySelector('div.daolist-container');
    //             if (DAOlistContainer) {
    //                 DAOlistContainer.remove();
    //                 const DAOlistEl = createDAOlistEl(DAOArr);
    //                 targetNode.appendChild(DAOlistEl);
    //             } else {
    //                 const DAOlistEl = createDAOlistEl(DAOArr);
    //                 targetNode.appendChild(DAOlistEl);
    //             }
    //         } else {
    //             targetNode.removeAttribute('id');
    //             const idTagContainer = targetNode.querySelector('div.id-tag-container');
    //             const DAOlistContainer = targetNode.querySelector('div.daolist-container');
    //             if (idTagContainer) idTagContainer.remove();
    //             if (DAOlistContainer) DAOlistContainer.remove();
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //         alert('서버에 문제가 생겨 복구 중입니다...')
    //     })
    // }
}

const createSoulTagEl = (hasSoul) => {
    const rootDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const linkEl = document.createElement('a');
    const imgEl = document.createElement('img');
    const textDiv = document.createElement('div');
    const src = 'https://d22p4hblaqdu3x.cloudfront.net/Soul/soul-32.png';
    const href = 'https://da0xsbt.xyz';

    rootDiv.setAttribute('class', 'id-tag-container');
    rootDiv.setAttribute('aria-label', 'Soul-Tag');
    linkEl.setAttribute('href', href);
    linkEl.setAttribute('target', '_blank');
    imgEl.setAttribute('class', 'id-tag id-tag-img');
    imgEl.setAttribute('src', src);
    imgDiv.setAttribute('class', 'id-tag-img-container id-tag-flex-box hint--top hint--rounded')
    imgDiv.setAttribute('aria-label', 'SOUL TAG');
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
        const idTagContainer = userNameBox.querySelector('div.id-tag-container');
        if (idTagContainer) idTagContainer.remove();
    }
}

const resetProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) appendTagTo(userNameBox);
}




export { modifyProfilePage, pauseControlProfilePage, resetProfilePage };