import React from "react";
import { useRecoilState } from "recoil";
import selectedPkg from "../../modules/selectedPkg";

import "./EmotesBox.scss";


const EmotesBox = () => {

    const [pkg, selectPkg] = useRecoilState(selectedPkg);

    const pkgToEmotelist = {
        OOAK_Free: [],
        KlayBee_Free: {type: "gif", hash: "QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn", list: ["fly", "fly_2", "greeting", "heart"]},
        KlayBee_NFT: [],
        PDAO: [],
    }

    return (
        <div className="emote-box-container">
                {
                    pkgToEmotelist.KlayBee_Free.list.map((emote, index) =>(
                        <div key={index} className={`emote-img-container ${emote}`}><img className={`emote-img ${emote}`} src={`https://gateway.pinata.cloud/ipfs/${pkgToEmotelist.KlayBee_Free.hash}/${emote}.${pkgToEmotelist.KlayBee_Free.type}`} alt={emote}/></div>
                    ))
                }
        </div>
    )
}

export default EmotesBox;