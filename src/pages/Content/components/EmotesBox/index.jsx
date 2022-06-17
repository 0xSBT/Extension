import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import selectedPkg from "../../modules/selectedPkg";
import axios from "axios";

import "./EmotesBox.scss";


const EmotesBox = (props) => {
    const baseURL = "https://d22p4hblaqdu3x.cloudfront.net/";
    const [pkg, selectPkg] = useRecoilState(selectedPkg);
    const [isSelected, setIsSelected] = useState(false);
    const [emotelists, setEmotelists] = useState(null);

    // load obj from server 로 고쳐야함 일단 하드코딩
    // key: pkg -> 이모티콘 리스트(path, list, )
    // baseURL/${pkg}/emoticon file(path)
    // emotelist: [{name: command, type: gif , png or jpg...}...]:  
    const test = {
        NONE: {emotelist: []},
        OOAK_Free: {baseCmd: "OOAK", emotelist: [{name: "logo", type:"png"},{name: "ID_TAG", type:"png"}]},
        KlayBee_Free: {baseCmd: "KlayBee", emotelist: [{name: "hi", type:"gif"},{name: "heart", type:"gif"},{name: "fly", type:"gif"}]},
        KlayBee_NFT: {emotelist: []},
        PDAO: {baseCmd: "PDAO", emotelist: [{name: "logo", type:"png"},{name: "pepe", type:"png"}]}
    }
    useEffect(()=>{
        const serverUrl = "https://onyx-osprey-353112.du.r.appspot.com/emotelists";
        axios.get(serverUrl).then((res)=> {
            let obj = res.data;
            setEmotelists({...obj});
        }).catch((err)=>{
            console.log(err)
            alert('서버에 문제가 생겨 복구 중입니다...')
        })
    },[])

    useEffect(() => {
        if (pkg !== "NONE") {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    }, [pkg])

    const handleClick = (e) => {
        // create el
        const el = document.createElement('textarea');
        // set text
        el.value = e.target.dataset.emoteName
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        // copy and delete temp el
        document.execCommand('copy');
        document.body.removeChild(el);

        // paste and close modal        
        const textBoxes = document.querySelectorAll('[role="textbox"]');
        const len = textBoxes.length;
        if(len === 1){
            const lastBox = textBoxes[len - 1];
            lastBox.setAttribute('data-focusvisible-polyfill', true);
            lastBox.focus();
            document.execCommand('paste');
        } else if (len > 1) {
            const lastBox = textBoxes[len - 2];
            lastBox.focus();
            document.execCommand('paste');
        }
        props.closeModal();

        //만약 copy and paste 거부당하면 span 찾아서 innerText로 바꾸자
    }

    return (
        <div className="emote-box-container">
            {(isSelected === true && emotelists[pkg].emotelist.length !==0)&&
                emotelists[pkg].emotelist.map((emote, index) => (
                    <div key={index} className={`emote-img-container ${pkg}`} onClick={handleClick} title={`${test[pkg].baseCmd}_${emote.name}`} data-emote-name={emote.name === "logo" ? `#${test[pkg].baseCmd}` : `#${test[pkg].baseCmd}_${emote.name}`}><img className={`emote-img ${pkg}`} src={`${baseURL}${test[pkg].baseCmd}/${emote.name}.${emote.type}`} alt={emote.name} data-emote-name={emote.name === "logo" ? `#${test[pkg].baseCmd}` :`#${test[pkg].baseCmd}_${emote.name}`} /></div>
                ))
            }
            {(isSelected === true && emotelists[pkg].emotelist.length ===0)&&
                <div className="emote-box-default">곧 출시될 예정입니다!!!</div>
            }
            {(isSelected === false && emotelists !== null) &&
                <div className="emote-box-default">원하는 이모티콘 패키지를 선택해 주세요.</div>
            }
            {emotelists === null &&
                <div className="emote-box-default">잠시만 기다려 주세요.</div>
            }
        </div>
    )
}

export default EmotesBox;