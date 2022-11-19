import React, { useState } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useDarkModeContext } from '../../context/darkModeContext';
import "./register.scss";
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi';
import InputForm from '../../components/InputForm/InputForm';


const Register = () => {
  const [email, setEmail] = useState({value: "", valid: null});
  const [password, setPassword] = useState({value: "", valid: null}); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const regex = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/ 
  }

  const { createUser, 
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
      if(email.valid === true && password.valid === true) {
        await createUser(email.value, password.value);
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
    try {
      await loginWithSocialNetwork(provider);
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <section className='register'>
      <div className='register-card'>
        <h1>
        {darkMode ? (
          <img src="/devchallenges-light.svg" alt="logo" />
        ) : (
          <img src="/devchallenges.svg" alt="logo" />
        )}
        </h1>
        <h2 className='text-header'>Join thousands of learners from around the world </h2>
        <p className='sub-header'>Master web development by making real-life projects. There are multiple paths for you to choose</p>
        <form onSubmit={handleSubmit}>
          {error && <p className='form-error'>{error}</p>}
          <InputForm
            state={email} 
            setState={setEmail} 
            type="email"
            placeholder="Email"
            name="Email"
            error="It should be a valid email address"
            regex={regex.email}  
            icon={<FaEnvelope/>}
          />  
          <InputForm
            state={password} 
            setState={setPassword} 
            type="password"
            placeholder="Password"
            name="Password"
            error="Password should be 8-20 characters and include at least 1 letter and 1 number"
            regex={regex.password}  
            icon={<FaLock/>}
          />  
          <button type="submit" disabled={isLoading}>
            {isLoading && <BiLoaderAlt/>}
            Start coding now
          </button>
        </form>
        <span className='spacing'>or continue with these social profile</span>
        <ul className='social-list'>
          <li className='list-item google' onClick={()=> handleLoginWithSocialNewtwork(googleProvider)}>
            <FaGoogle/>
          </li>
          <li className='list-item facebook' onClick={()=> handleLoginWithSocialNewtwork(facebookProvider)}>
            <FaFacebook/>
          </li>
          <li className='list-item github' onClick={()=> handleLoginWithSocialNewtwork(githubProvider)}>
            <FaGithub/>
          </li>
        </ul>
        <p className='member-link'>Already a member? <Link to={"/login"}>Login</Link></p>      
      </div>
    </section>
  )
}

export default Register