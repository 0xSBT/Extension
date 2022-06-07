import React from 'react'
import { useRecoilState } from 'recoil';
import selectedCategory from '../../modules/selectedCategory';
import "./ModalNavbar.scss";

const ModalNavbar = (props) => {
    const [category, selectCategory] = useRecoilState(selectedCategory); // default : 0(none) 

    const handleClick = (num) => {
        selectCategory(num);
    }

    return (
        <div className="md-navbar">
            <div className={`md-navbar-item ${(category === props.category.FREE) ? 'navbar-item-clicked' : ''}`} onClick = {() =>{handleClick(props.category.FREE)}}>
                <span className="md-navbar-item-text">FREE</span>
            </div>
            <div className={`md-navbar-item ${(category === props.category.NFT) ? 'navbar-item-clicked' : ''}`} onClick = {() =>{handleClick(props.category.NFT)}}>
                <span className="md-navbar-item-text">NFT</span>
            </div>
            <div className={`md-navbar-item ${(category === props.category.DAO) ? 'navbar-item-clicked' : ''}`} onClick = {() =>{handleClick(props.category.DAO)}}>
                <span className="md-navbar-item-text">DAO</span>
            </div>
        </div>
    );
}

export default ModalNavbar;