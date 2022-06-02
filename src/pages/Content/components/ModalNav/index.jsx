import React from 'react'
import { useState } from 'react';
import "./ModalNav.css";

const ModalNav = () => {
    
    const [categoryNum, setCategoryNum] = useState(0); // default : 0(none) 

    const selectCategory = (num) => {
        setCategoryNum(num);
    }

    return (
        <div className="md-nav">
            <div className={`md-nav-content ${(categoryNum === 1) ? 'nav-content-clicked' : ''}`} onClick = {() =>{selectCategory(1)}}>
                <span className="md-nav-content-text">FREE</span>
            </div>
            <div className={`md-nav-content ${(categoryNum === 2) ? 'nav-content-clicked' : ''}`} onClick = {() =>{selectCategory(2)}}>
                <span className="md-nav-content-text">NFTs</span>
            </div>
            <div className={`md-nav-content ${(categoryNum === 3) ? 'nav-content-clicked' : ''}`} onClick = {() =>{selectCategory(3)}}>
                <span className="md-nav-content-text">DAO</span>
            </div>
        </div>
    );
}

export default ModalNav;