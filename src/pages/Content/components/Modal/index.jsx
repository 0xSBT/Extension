import React from 'react'
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil'

import ModalNavbar from '../ModalNavbar';
import PkglistSlide from '../PkglistSlide';
import EmotesBox from '../EmotesBox';

import './Modal.scss'

function Modal(props) {
    const eCategory = {
        NONE: 0,                       
        FREE: 1,
        NFT: 2,
        DAO: 3,
        LIST: ["NONE", "FREE", "NFT", "DAO"]
    }

    useEffect(() => {
        Object.freeze(eCategory);
    }, [])

    //FREE >> KlayBee_FREE // NFT >> KlayBee_NFT // DAO >> PDAO
    return (
        <RecoilRoot>
            <div className='modal-container'>
                <div className='modal-content'>
                    <ModalNavbar category={eCategory} />
                    <PkglistSlide category={eCategory} />
                    <div class="md-main">
                        <EmotesBox closeModal={props.closeModal}/>
                    </div>
                </div>
            </div>
        </RecoilRoot>
    )
}

export default Modal;