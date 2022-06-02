import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../components/Modal';

const appendModal = (targetNode) => {
    const rootDiv = document.createElement('div');
    const modalOverlay = document.createElement('div');
    rootDiv.setAttribute('id', 'ooak-modal-root');

    targetNode.appendChild(rootDiv);
}

const modalToggleRunning = (btnEl) => {
    let isOpen = false;
    const root = document.getElementById('ooak-modal-root');
    btnEl.addEventListener('click', () => {
            root.setAttribute('class', 'modal-open');
            ReactDOM.render(
                <React.StrictMode>
                    <div className='modal-overlay' onClick={() => { close(); }}></div>
                    <Modal />
                </React.StrictMode>,
                root
            )
    });
    const close = () => {
        root.classList.remove('modal-open');
        ReactDOM.render(
            <React.StrictMode>
            </React.StrictMode>,
            root
        )
    }
}

export { appendModal, modalToggleRunning };


