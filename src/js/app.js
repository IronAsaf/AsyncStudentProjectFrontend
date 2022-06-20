import {Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./signup";
import SignIn from "./signin";
import orders from "./orders"
import Dashboard from "./dashboard";
import {useState} from "react";
import {userCredentials} from "./userAuthContext";


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
            <Route path="/" element={<SignUp/>}/>
            <Route path="signin" element={<SignIn onLogin={handleLogin}/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
        </Routes>
        </userCredentials.Provider>

    )
}

export default App;
