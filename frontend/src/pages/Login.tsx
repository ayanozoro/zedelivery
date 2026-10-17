import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useGoogleLogin} from '@react-oauth/google';

const Login=()=>{
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    interface GoogleAuthResult {
        code: string;
    }

    const responseGoogle = async(authResult: GoogleAuthResult)=>{
        setLoading(true);
        setErrorMessage("");
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
            setErrorMessage("We couldn't sign you in. Please try again.");
            setLoading(false);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (errorResponse) => console.log(errorResponse),
        flow: 'auth-code',
    });
    return(
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
            <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/40 md:grid-cols-2">
                <section className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-10 text-white md:flex md:flex-col md:justify-between">
                    <div>
                        <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl font-bold ring-1 ring-white/25">
                            Z
                        </div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                            Welcome back
                        </p>
                        <h1 className="max-w-xs text-4xl font-bold leading-tight">
                            Everything you need, in one place.
                        </h1>
                    </div>
                    <p className="text-sm text-blue-100">
                        Sign in securely to continue to ZeDelivery.
                    </p>
                </section>

                <section className="p-8 sm:p-12">
                    <div className="mb-10 md:hidden">
                        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                            Z
                        </div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Welcome back
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Use your Google account to access your dashboard.
                        </p>
                    </div>
                    <div className="space-y-4">
                    <button
                        onClick={() => googleLogin()}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {!loading && (
                            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"/>
                                <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z"/>
                                <path fill="#FBBC05" d="M6.53 13.58A5.86 5.86 0 0 1 6.22 12c0-.55.11-1.08.31-1.58V7.89H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.11l3.24-2.53Z"/>
                                <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.39l3.24 2.53C7.3 8.11 9.46 6.39 12 6.39Z"/>
                            </svg>
                        )}
                        {loading ? "Signing you in..." : "Continue with Google"}
                    </button>
                    {errorMessage && (
                        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )}
                    </div>
                    <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                        By continuing, you agree to our terms and privacy policy.
                    </p>
                </section>
            </div>
        </main>
    )
}

export default Login;