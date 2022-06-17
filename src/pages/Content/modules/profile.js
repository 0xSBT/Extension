import axios from "axios"

// find profile btn 
const detectProfilePage = () => {
    const PROFILE_INTERVAL = 1000; //ms
    let count = 0;

    let detectProfileWithInterval = setInterval(()=>{
        const userNameBox = document.querySelector('[data-testid="UserName"]');
        if (userNameBox) {       
            appendIdTagTo(userNameBox);
            clearInterval(detectProfileWithInterval)
        } else {
            //useNameBox가 안찾아짐 => 5초 뒤 포기 , 동일 path  OR useNameBox가 안찾아지는데 path는 바뀌었을 때 => 10초동안은 계속 찾음
            count++;
            if (count >= 5) {
                // alert('over 5 seconds')                
                clearInterval(detectProfileWithInterval)
            }
        }
    }, PROFILE_INTERVAL)
}

const appendIdTagTo = (targetNode) => {
    const targetId = targetNode.getAttribute('id');
    if (targetId === null) { // if not appended
        targetNode.setAttribute('id', 'id-tag-appended');
        const userId = targetNode.innerText.split('@')[1];
        /* twitterId => id tag(nickname) */
        const serverURL = `http://localhost:8081/idtag?twitterId=${userId}`;
        axios.get(serverURL).then((res) => {
            const result = res.data.result;
            if (result === "success") {
                const nickname = res.data.idTag;
                const idTagEl = createIdTagEl(nickname);
                targetNode.appendChild(idTagEl);

                const rootDiv = createDAOListEl('PDAO', 'PDAO/logo.png', 'https://dao.postech.ac.kr/');
                targetNode.appendChild(rootDiv);
            }
        }).catch((err) => {
            console.log(err)
            alert('서버에 문제가 생겨 복구 중입니다...')
        })

        //DAO badge test -> 추후 추가
        

    } else if (targetId === 'id-tag-appended') { //else if appended
        const userId = targetNode.innerText.split('@')[1];
        const serverURL = `http://localhost:8081/idtag?twitterId=${userId}`;
        axios.get(serverURL).then((res) => {
            const result = res.data.result;
            if (result === "success") {
                const nickname = res.data.idTag;
                const textDiv = targetNode.querySelector('div.text-box');
                textDiv.innerText = nickname;
            } else {
                targetNode.removeAttribute('id');
                const idTagRootDiv = targetNode.querySelector('div.id-tag-container');
                idTagRootDiv.remove();
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
    const href = 'https://theooak.io'
    
    rootDiv.setAttribute('class', 'id-tag-container');
    rootDiv.setAttribute('aria-label', 'ID Tag');
    linkEl.setAttribute('href', href);
    linkEl.setAttribute('target', '_blank');
    imgEl.setAttribute('class', 'id-tag id-tag-img');
    imgEl.setAttribute('src', src);
    // imgEl.setAttribute('title', 'ID TAG');
    imgDiv.setAttribute('class', 'id-tag-img-container id-tag-flex-box hint--top hint--rounded')
    imgDiv.setAttribute('aria-label', 'ID TAG');
    textDiv.setAttribute('class', 'id-tag-flex-box text-box');
    textDiv.innerText = nickname;

    linkEl.appendChild(imgEl);
    imgDiv.appendChild(linkEl);
    rootDiv.appendChild(imgDiv);
    rootDiv.appendChild(textDiv);
    return rootDiv;
}

const createDAOListEl = (name, imgPath, href) => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('class', `dao-badge-container dao-${name}`);
    const linkEl = document.createElement('a');
    linkEl.setAttribute('class', 'hint--top hint--rounded');
    linkEl.setAttribute('aria-label', `${name}`)
    linkEl.setAttribute('href', href)
    linkEl.setAttribute('target', '_blank')
    const imgEl = document.createElement('img');
    imgEl.setAttribute('class', 'dao-badge dao-badge-img');
    imgEl.setAttribute('title', `${name}`);
    imgEl.setAttribute('src', `https://d22p4hblaqdu3x.cloudfront.net/${imgPath}`);
    imgEl.setAttribute('width', 21);

    linkEl.appendChild(imgEl);
    rootDiv.appendChild(linkEl);
    return rootDiv;
}



export { detectProfilePage };