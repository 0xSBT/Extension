import {atom} from 'recoil'

const selectedCategory = atom({
    key: 'selectedCategory',
    default: 1 //FREE
});

export default selectedCategory;