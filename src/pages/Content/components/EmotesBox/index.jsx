import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import selectedPkg from "../../modules/selectedPkg";

import "./EmotesBox.scss";


const EmotesBox = (props) => {

    const [pkg, selectPkg] = useRecoilState(selectedPkg);
    const [isSelected, setIsSelected] = useState(false);

    //load obj from server 로 고쳐야함 일단 하드코딩
    const pkgToEmoteObj = {
        NONE: { list: [] },
        OOAK_Free: { type: "gif", hash: "QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn", list: ["fly", "fly_2", "greeting", "heart"] },
        KlayBee_Free: { type: "gif", hash: "QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn", list: ["fly", "fly_2", "greeting", "heart"] },
        KlayBee_NFT: { type: "gif", hash: "QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn", list: ["fly", "fly_2", "greeting", "heart"] },
        PDAO: { type: "gif", hash: "QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn", list: ["fly", "fly_2", "greeting", "heart"] },
    }

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
        // const textBoxes = document.querySelectorAll('[data-testid="tweetTextarea_0"]');
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
            {isSelected === true &&
                pkgToEmoteObj[pkg].list.map((emote, index) => (
                    <div key={index} className={`emote-img-container ${emote}`} onClick={handleClick} title={emote} data-emote-name="#KlayB_fly_2"><img className={`emote-img ${emote}`} src={`https://gateway.pinata.cloud/ipfs/${pkgToEmoteObj[pkg].hash}/${emote}.${pkgToEmoteObj[pkg].type}`} alt={emote} data-emote-name="#KlayB_fly_2" /></div>
                ))
            }
            {isSelected === false &&
                <div>준비 중입니다.</div>
            }
        </div>
    )
}

export default EmotesBox;