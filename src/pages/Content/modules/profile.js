import axios from "axios"

// find profile btn 
const modifyProfilePage = () => {
    const PROFILE_INTERVAL = 1000; //ms
    let count = 0;

    let detectProfileWithInterval = setInterval(() => {
        const userNameBox = document.querySelector('[data-testid="UserName"]');
        if (userNameBox) {
            appendIdTagTo(userNameBox);
            clearInterval(detectProfileWithInterval)
        } else {
            count++;
            if (count >= 5) {
                clearInterval(detectProfileWithInterval)
            }
        }
    }, PROFILE_INTERVAL)
}

const appendIdTagTo = (targetNode) => {
    const targetId = targetNode.getAttribute('id');
    const baseURL = "https://onyx-osprey-353112.du.r.appspot.com/"
    if (targetId === null) { // if not appended
        targetNode.setAttribute('id', 'id-tag-appended');
        let userId = targetNode.innerText.split('@')[1];
        userId = userId.split('\n')[0];

        const serverURL = `${baseURL}idtag?twitterId=${userId}`;
        axios.get(serverURL).then((res) => {
            const result = res.data.result;
            if (result === "success") {
                //id tag
                const nickname = res.data.idTag;
                const idTagEl = createIdTagEl(nickname);
                targetNode.appendChild(idTagEl);
                //dao list
                const DAOArr = res.data.DAO;
                const DAOlistEl = createDAOlistEl(DAOArr);
                targetNode.appendChild(DAOlistEl);
            }
        }).catch((err) => {
            console.log(err)
            alert('서버에 문제가 생겨 복구 중입니다...')
        })



    } else if (targetId === 'id-tag-appended') { //else if appended

        let userId = targetNode.innerText.split('@')[1];
        userId = userId.split('\n')[0];
        const serverURL = `${baseURL}idtag?twitterId=${userId}`;
        axios.get(serverURL).then((res) => {
            const result = res.data.result;
            if (result === "success") {
                //id tag
                const nickname = res.data.idTag;
                const textDiv = targetNode.querySelector('div.id-tag-text-box');
                if (textDiv) {
                    textDiv.innerText = nickname;
                } else {
                    const idTagEl = createIdTagEl(nickname);
                    targetNode.appendChild(idTagEl);
                }
                //dao list
                const DAOArr = res.data.DAO;
                const DAOlistContainer = targetNode.querySelector('div.daolist-container');
                if (DAOlistContainer) {
                    DAOlistContainer.remove();
                    const DAOlistEl = createDAOlistEl(DAOArr);
                    targetNode.appendChild(DAOlistEl);
                } else {
                    const DAOlistEl = createDAOlistEl(DAOArr);
                    targetNode.appendChild(DAOlistEl);
                }
            } else {
                targetNode.removeAttribute('id');
                const idTagContainer = targetNode.querySelector('div.id-tag-container');
                const DAOlistContainer = targetNode.querySelector('div.daolist-container');
                if (idTagContainer) idTagContainer.remove();
                if (DAOlistContainer) DAOlistContainer.remove();
            }
        }).catch((err) => {
            console.log(err)
            alert('서버에 문제가 생겨 복구 중입니다...')
        })
    }
}

const createIdTagEl = (nickname) => {
    const rootDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const linkEl = document.createElement('a');
    const imgEl = document.createElement('img');
    const textDiv = document.createElement('div');
    const src = 'https://d22p4hblaqdu3x.cloudfront.net/ID_TAG_ICONS/logo18.png';
    const href = 'https://theooak.io';

    rootDiv.setAttribute('class', 'id-tag-container');
    rootDiv.setAttribute('aria-label', 'ID Tag');
    linkEl.setAttribute('href', href);
    linkEl.setAttribute('target', '_blank');
    imgEl.setAttribute('class', 'id-tag id-tag-img');
    imgEl.setAttribute('src', src);
    imgDiv.setAttribute('class', 'id-tag-img-container id-tag-flex-box hint--top hint--rounded')
    imgDiv.setAttribute('aria-label', 'ID TAG');
    textDiv.setAttribute('class', 'id-tag-flex-box id-tag-text-box');
    textDiv.innerText = nickname;

    linkEl.appendChild(imgEl);
    imgDiv.appendChild(linkEl);
    rootDiv.appendChild(imgDiv);
    rootDiv.appendChild(textDiv);
    return rootDiv;
}

const createDAOlistEl = (DAOArr) => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', 'daolist-container')
    DAOArr.forEach(obj => {
        const DAOEl = createDAOEl(obj.name, obj.imgPath, obj.href);
        rootDiv.appendChild(DAOEl);
    });
    return rootDiv;
}

const createDAOEl = (name, imgPath, href) => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', `dao-badge-container dao-${name}`);
    const linkEl = document.createElement('a');
    linkEl.setAttribute('class', 'hint--top hint--rounded');
    linkEl.setAttribute('aria-label', `${name}`)
    linkEl.setAttribute('href', href)
    linkEl.setAttribute('target', '_blank')
    const imgEl = document.createElement('img');
    imgEl.setAttribute('class', 'dao-badge dao-badge-img');
    imgEl.setAttribute('src', `https://d22p4hblaqdu3x.cloudfront.net/${imgPath}`);
    imgEl.setAttribute('width', 21);

    linkEl.appendChild(imgEl);
    rootDiv.appendChild(linkEl);
    return rootDiv;
}

const pauseControlProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) {
        userNameBox.removeAttribute('id');
        const idTagContainer = userNameBox.querySelector('div.id-tag-container');
        const DAOlistContainer = userNameBox.querySelector('div.daolist-container');
        if (idTagContainer) idTagContainer.remove();
        if (DAOlistContainer) DAOlistContainer.remove();
    }
}

const resetProfilePage = () => {
    const userNameBox = document.querySelector('[data-testid="UserName"]');
    if (userNameBox) appendIdTagTo(userNameBox);
}




export { modifyProfilePage, pauseControlProfilePage, resetProfilePage };