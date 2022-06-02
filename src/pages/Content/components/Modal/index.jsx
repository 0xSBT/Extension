import React from 'react'
import './Modal.scss'
import ModalNav from '../ModalNav';

// export default class Modal extends React.Component {
//     render() {
//         return (
//             <div className='modal-container'>
//                 <div className='modal-content'>
//                     <ModalNav />
//                     <div class="md-pkglist">
//                         package list
//                     </div>
//                     <div class="md-main">
//                         <div>
//                             sss
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

function Modal() {
    return (
        <div className='modal-container'>
                 <div className='modal-content'>
                     <ModalNav />
                     <div class="md-pkglist">
                         package list
                     </div>
                     <div class="md-main">
                         <div>
                             sss
                         </div>
                     </div>
                 </div>
             </div>
    )
}

export default Modal;