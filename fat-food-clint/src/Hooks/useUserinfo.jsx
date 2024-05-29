import { useContext } from 'react';
import { AuthContext } from '../Providers/ContextProvider';

const useUserinfo = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useUserinfo;