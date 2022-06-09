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

    const handleClick = () => {
        //text area에 입력
        const el = document.createElement('textarea');
        el.value = "text";
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        //
        document.execCommand
        document.execCommand('copy');
        document.body.removeChild(el);

        // 입력창에 입력
        const textBox = document.querySelector('[data-text="true"]');
        textBox.focus();
        textBox.innerText += "#KlayBee"
        props.closeModal();
    }

    // const copyClipboard = async (
    //     text,
    //     successAction,
    //     failAction
    // ) => {
    //     try {
    //         await navigator.clipboard.writeText(text);
    //         successAction && successAction();
    //     } catch (error) {
    //         failAction && failAction();
    //     }
    // }

    return (
        <div className="emote-box-container">
            <textarea className="temp-text"></textarea>
            {isSelected === true &&
                pkgToEmoteObj[pkg].list.map((emote, index) => (
                    <div key={index} className={`emote-img-container ${emote}`} onClick={handleClick} title={emote}><img className={`emote-img ${emote}`} src={`https://gateway.pinata.cloud/ipfs/${pkgToEmoteObj[pkg].hash}/${emote}.${pkgToEmoteObj[pkg].type}`} alt={emote} /></div>
                ))
            }
            {isSelected === false &&
                <div>준비 중입니다.</div>
            }
        </div>
    )
}

export default EmotesBox;