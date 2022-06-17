import React, { useEffect, useState } from "react";
import selectedCategory from "../../modules/selectedCategory";
import selectedPkg from "../../modules/selectedPkg";
import { useRecoilState } from "recoil";
import axios from 'axios';

import Pkglist from "../Pkglist";

import "./PkglistSlide.scss";


const PkglistSlide = (props) => {
    const [category, setCategory] = useRecoilState(selectedCategory);
    const [pkg, setPkg] = useRecoilState(selectedPkg);
    const [pkglistsInfo, setPkglistsInfo] = useState({FREE:[], NFT:[],DAO:[]});
    useEffect(()=>{
        setPkg("NONE");
    },[category])
    useEffect(()=>{
        const serverUrl = "https://onyx-osprey-353112.du.r.appspot.com/pkglists/info";
        axios.get(serverUrl).then((res)=> {
            let obj = res.data;
            setPkglistsInfo({...obj});
        }).catch((err)=>{
            alert('서버에 문제가 생겨 복구 중입니다...')
        })
    },[])
    
    switch (category) {
        case props.category.FREE:
            return (
                <div className="md-pkglist-container">
                    <div className="md-pkglist-title">Emote package</div>
                    <Pkglist pkgName = "FREE" pkglist = {pkglistsInfo}/>
                </div>
            )
        case props.category.NFT:
            return (
                <div className="md-pkglist-container">
                    <div className="md-pkglist-title">Emotes Package</div>
                    <Pkglist pkgName = "NFT" pkglist = {pkglistsInfo}/>
                </div>
            )
        case props.category.DAO:
            return (
                <div className="md-pkglist-container">
                    <div className="md-pkglist-title">Emotes Package</div>
                    <Pkglist pkgName = "DAO" pkglist = {pkglistsInfo}/>
                </div>
            )
        default:
            return (
                <div className="md-pkglist-container">
                    <div className="md-pkglist-title">Emotes Package</div>
                    <Pkglist pkgName = "FREE" pkglist = {pkglistsInfo}/>
                </div>
            )
    }
}


export default PkglistSlide;