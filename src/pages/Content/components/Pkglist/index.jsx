import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import selectedPkg from "../../modules/selectedPkg";

import "./Pkglist.scss";

const Pkglist = (props) => {
    const baseURL = "https://d22p4hblaqdu3x.cloudfront.net";
    const [pkg, selectPkg] = useRecoilState(selectedPkg);
    const [prevDiv, setPrevDiv] = useState(null);

    useEffect(()=>{
        if(prevDiv) {
            prevDiv.classList.remove('clicked')
        }
    },[])

    const handleClick = (e) => {
        if(prevDiv) {
            prevDiv.classList.remove('clicked')
        }
        const currentDiv = e.target.parentElement;
        currentDiv.classList.add('clicked');
        setPrevDiv(currentDiv);
        selectPkg(e.target.dataset.pkg);
    }

    return (
        <div className={`md-pkglist ${props.pkgName}`}>
        {
            props.pkglist[props.pkgName].map((pkgObj, index) => (
                <div key={index} id={`pkg-${pkgObj.name}`} className="pkg-wrapper hint--top hint--rounded" aria-label={pkgObj.name}>
                    <div className={`pkg-img-container`}  onClick={handleClick}>
                        <img className="pkg-img" src={`${baseURL}${pkgObj.path}`} alt={pkgObj.name} data-pkg={pkgObj.name}/>
                    </div>
                </div>
            ))
        }
        </div>
    )
}


export default Pkglist;