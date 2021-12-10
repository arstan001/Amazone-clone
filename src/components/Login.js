import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { signIn, signUp } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        const auth = await signIn(email, password);
        if (auth.success) {
            setError('');
            navigate('/')
        }
        else {
            setError(auth.error)
        }
    }
    const register = async (e) => {
        e.preventDefault();
        const auth = await signUp(email, password);
        if (auth.success) {
            setError('');
            navigate('/');
        }
        else {
            setError(auth.error);
        }
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='' className='login_logo' />
            </Link>
            <div className='login_container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={val => setEmail(val.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={val => setPassword(val.target.value)} />

                    <button className='login_signin' type='submit' onClick={(e) => handleSignIn(e)}>Sign in</button>
                </form>
                {error !== '' && <p className='login_error'>{error}</p>}
                <p>
                    By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>

                <button className='login_register' onClick={(e) => register(e)}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login