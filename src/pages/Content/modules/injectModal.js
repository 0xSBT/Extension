import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal';

const appendModal = (targetNode) => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'ooak-modal-root');
    targetNode.appendChild(rootDiv);
}

const modalToggleRunning = (btnEl) => {
    const root = document.getElementById('ooak-modal-root');
    btnEl.addEventListener('click', () => {
            root.setAttribute('class', 'modal-open');
            ReactDOM.render(
                <React.StrictMode>
                    <div className='modal-overlay' onClick={() => { closeModal(); }} ></div>
                    <Modal closeModal={closeModal} />
                </React.StrictMode>,
                root
            )
            root.setAttribute('data-modal-state', 'open');
    });
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


