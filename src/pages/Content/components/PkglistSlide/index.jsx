import React, { useEffect, useState } from "react";
import selectedCategory from "../../modules/selectedCategory";
import { useRecoilState } from "recoil";

import Pkglist from "../Pkglist";

import "./PkglistSlide.scss";


// const pkglistsInfo = {
//     FREE : [{name: , imgURL:}, {name: , imgURL:}, {name: , imgURL:}, ...]
//     NFT : [{name: , imgURL:}, {name: , imgURL:}, {name: , imgURL:}, ...]
//      DAO : [{name: , imgURL:}, {name: , imgURL:}, {name: , imgURL:}, ...]
//  } 


const PkglistSlide = (props) => {
    const [category, setCategory] = useRecoilState(selectedCategory);

    const [pkglistsInfo, setPkglistsInfo] = useState({
        FREE : [{name: "OOAK_Free", imgURL:"https://gateway.pinata.cloud/ipfs/QmaaDdBFPrXMCnJ6CCCjTYuZCnsbm4vhG32ngNGs2kWrpY"}, {name: "KlayBee_Free", imgURL:"https://gateway.pinata.cloud/ipfs/QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn/greeting.gif"}],
        NFT : [{name: "KlayBee_NFT", imgURL:"https://gateway.pinata.cloud/ipfs/QmUNbq38LSe89g57RYBiaaSHgF4yvYiXWRggn3QM6CtDWn/greeting.gif"}],
        DAO : [{name: "PDAO", imgURL:"https://gateway.pinata.cloud/ipfs/Qma93f8F2pmB3ndwKG4yy4qih1NAEK8JgfPR9Faj7sQSnh"}]
    });
    
    switch (category) {
        case props.category.FREE:
            return (
                <div className="md-pkglist-container">
                    <Pkglist pkgName = "FREE" pkglist = {pkglistsInfo}/>
                </div>
            )
        case props.category.NFT:
            return (
                <div className="md-pkglist-container">
                    <Pkglist pkgName = "NFT" pkglist = {pkglistsInfo}/>
                </div>
            )
        case props.category.DAO:
            return (
                <div className="md-pkglist-container">
                    <Pkglist pkgName = "DAO" pkglist = {pkglistsInfo}/>
                </div>
            )
        default:
            return (
                <div className="md-pkglist-container">
                    <Pkglist pkgName = "FREE" pkglist = {pkglistsInfo}/>
                </div>
            )
    }
}


export default PkglistSlide;