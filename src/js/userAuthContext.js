import {createContext, useContext} from 'react';

export const userCredentials = createContext({
    userId: null,
    password: null
})

export const useCredentials = () => {
    return useContext(userCredentials);
}
