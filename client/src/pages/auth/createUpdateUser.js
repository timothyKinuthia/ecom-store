import axios from 'axios';

const createOrUpdateUser = async (authtoken) => {
    return await axios.post('http://localhost:5000/api/create', {}, {
        headers: {
            authtoken
        }
    })
}

export default createOrUpdateUser;