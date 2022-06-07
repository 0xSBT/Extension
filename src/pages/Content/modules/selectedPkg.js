import {atom} from 'recoil'

const selectedPkg = atom({
    key: 'selectedPkg',
    default: "NONE"
});

export default selectedPkg;