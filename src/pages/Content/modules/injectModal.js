import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal';

const appendModal = (targetNode) => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'ooak-modal-root');
    let len = 0;
    const isAppended = document.getElementsByClassName('root-pinned');
    if(isAppended) len = isAppended.length;
    if(len === 0) targetNode.appendChild(rootDiv);
}

const modalToggleRunning = (btnEl) => {
    const root = document.getElementById('ooak-modal-root');
    //open after click
    btnEl.addEventListener('click', () => {
            root.setAttribute('class', 'modal-open root-pinned');
            ReactDOM.render(
                <React.StrictMode>
                    <div className='modal-overlay' onClick={() => { closeModal(); }} ></div>
                    <Modal closeModal={closeModal} />
                </React.StrictMode>,
                root
            )
            root.setAttribute('data-modal-state', 'open');
    });

    //close after press key "esc"
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape") closeModal();
    })

    //close modal ftn
    const closeModal = () => {
        const root = document.getElementById('ooak-modal-root');
        root.classList.remove('modal-open');
        ReactDOM.render(
            <React.StrictMode>
            </React.StrictMode>,
            root
        )
        root.setAttribute('data-modal-state', 'closed');
    }
}



export { appendModal, modalToggleRunning };


