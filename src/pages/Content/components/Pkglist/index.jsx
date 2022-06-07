import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import selectedPkg from "../../modules/selectedPkg";

import "./Pkglist.scss";

const Pkglist = (props) => {
    
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
                <div key={index} className={`pkg-img-container ${pkgObj.name}`}  onClick={handleClick} title={pkgObj.name}><img className="pkg-img" src={pkgObj.imgURL} alt={pkgObj.name} data-pkg={pkgObj.name}/></div>
            ))
        }
        </div>
    )
}


export default Pkglist;