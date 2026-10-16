import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login=()=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const responseGoogle = async(authResult:any)=>{
        setLoading(true);
        try{
            const res = await axios.post(`${import.meta.env.auth_server_url}/api/auth/login`, 
                {
                    code: authResult.code
                }
            );
            localStorage.setItem("token", res.data.token);
            setLoading(false);
            navigate("/");
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }
    return(
        <>
        
        </>
    )
}

export default Login;