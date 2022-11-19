import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useDarkModeContext } from '../../context/darkModeContext';
import "./login.scss"
import { FaEnvelope, FaFacebook, FaGithub, FaGoogle, FaLock } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi';
import InputForm from '../../components/InputForm/InputForm';


const Login = () => {
  const [email, setEmail] = useState({value: ""});
  const [password, setPassword] = useState({value: ""}); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginUser, 
    googleProvider,
    facebookProvider,
    githubProvider,
    loginWithSocialNetwork
   } = useAuthContext();
  
  const { darkMode } = useDarkModeContext();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); 
    setIsLoading(true)
    try { 
      if(email.value.length > 0 && password.value.length > 0) { 
        await loginUser(email.value, password.value);
      } else {
        setError("Please complete the form correctly")
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  const handleLoginWithSocialNewtwork = async (provider) => {
    setError(""); 
    setIsLoading(true); 
    try {
      await loginWithSocialNetwork(provider);
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className='login'>
      <div className='login-card'>
        <h1>
        {darkMode ? (
          <img src="/devchallenges-light.svg" alt="logo" />
        ) : (
          <img src="/devchallenges.svg" alt="logo" />
        )}
        </h1>
        <h2 className='text-header'>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className='form-error'>{error}</p>}
          <InputForm
            state={email} 
            setState={setEmail} 
            type="email"
            placeholder="Email"
            name="Email"
            icon={<FaEnvelope/>}
          />  
          <InputForm
            state={password} 
            setState={setPassword} 
            type="password"
            placeholder="Password"
            name="Password"
            icon={<FaLock/>}
          />  
          <button type="submit" disabled={isLoading}>
            {isLoading && <BiLoaderAlt/>}
            Login
          </button>
        </form>
        <span className='spacing'>or continue with these social profile</span>
        <ul className='social-list'>
          <li className='list-item google' onClick={()=> handleLoginWithSocialNewtwork(googleProvider)}>
            <FaGoogle />
          </li>
          <li className='list-item facebook' onClick={()=> handleLoginWithSocialNewtwork(facebookProvider)}>
            <FaFacebook/>
          </li>
          <li className='list-item github' onClick={()=> handleLoginWithSocialNewtwork(githubProvider)}>
            <FaGithub/>
          </li>
        </ul>
        <p className='member-link'><Link to={"/recover_password"}>Forgot your password?</Link></p>      
        <p className='member-link'>Don’t have an account yet? <Link to={"/register"}>Register</Link></p>      
      </div>
    </section>
  )
}

export default Login