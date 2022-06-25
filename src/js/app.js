import {Route, Routes, useNavigate} from "react-router-dom";
import SignIn from "./signin";
import Dashboard from "./dashboard";
import {useState} from "react";
import {userCredentials} from "./userAuthContext";
import Orders from "./orders";


const App = () => {
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (userId, password) => {
        setUserId(userId);
        setPassword(password);
        navigate('/dashboard');
    }

    return (
        <userCredentials.Provider value={{userId, password}}>
            <Routes>
                <Route path="/" element={<SignIn onLogin={handleLogin}/>}/>
                <Route path="dashboard/*" element={<Dashboard/>}/>
                <Route path="orders" element={<Orders/>}/>

            </Routes>
        </userCredentials.Provider>

    )
}

export default App;
