import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useGoogleLogin} from '@react-oauth/google';

const Login=()=>{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    interface GoogleAuthResult {
        code: string;
    }

    const responseGoogle = async(authResult: GoogleAuthResult)=>{
        setLoading(true);
        try{
            const res = await axios.post(`${import.meta.env.VITE_AUTH_SERVER_URL}/api/auth/login`,
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

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (errorResponse) => console.log(errorResponse),
        flow: 'auth-code',
    });
    return(
        <>
        <h1 className="text-3xl font-bold underline">login</h1>
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="flex justify-center">
                    <button
                        onClick={() => googleLogin()}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Login with Google"}
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;