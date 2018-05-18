import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-43d0f.firebaseio.com/'
})

export default instance;