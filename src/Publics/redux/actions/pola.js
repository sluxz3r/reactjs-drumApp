import axios from 'axios';

const url = 'https://mydrum-app.herokuapp.com';

export const pola = () => {
    return {
        type: 'GET_POLA',
        payload: axios.get(`${url}/user/pola/`,
            {
                headers: {
                    "authorization": "x-control-user",
                }
            }),

    }
};

export const updatePola = (pola ,id) => {
    return {
        type: 'UPDATE_POLA',
        payload: axios.patch(`${url}/user/pola/${id}`, {pola:pola},
            {
                headers: {
                    "authorization": "x-control-user",
                }
            }),

    }
};