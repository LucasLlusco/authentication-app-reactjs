import React, { useState } from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import { BiLoaderAlt } from 'react-icons/bi';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import { useAuthContext } from '../../context/authContext';
import { useDarkModeContext } from '../../context/darkModeContext';
import "./recoverPassword.scss";

const RecoverPassword = () => {
    const [email, setEmail] = useState({value: ""});
    const [error, setError] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useAuthContext();
    const { darkMode } = useDarkModeContext();

    const handleResetPassword = async (e) => {
      e.preventDefault()
      setError(""); 
      setEmailMsg("")
      setIsLoading(true);
      try {
        if(email.value.length > 0) {
          await resetPassword(email.value); 
          setEmailMsg(`We sent an email to ${email.value} with a link to reset your password.`);
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false);
      }
    }
  return (
    <section className='recover'>
      <div className='recover-card'>
        <h1>
        {darkMode ? (
          <img src="/devchallenges-light.svg" alt="logo" />
        ) : (
          <img src="/devchallenges.svg" alt="logo" />
        )}
        </h1>
        <h2 className='text-header'>Recover Password</h2>
        <form onSubmit={handleResetPassword}>
          {error && <p className='form-error'>{error}</p> }
          {emailMsg && <p className='form-success'>{emailMsg}</p>}
          <InputForm
            state={email} 
            setState={setEmail} 
            type="email"
            placeholder="Email"
            name="Email"
            error="It should be a valid email address"
            icon={<FaEnvelope/>}
          />  
          <button type="submit" disabled={isLoading}>
            {isLoading && <BiLoaderAlt/>}
            Send
          </button>
        </form>
        <div className="back-link">
          <AiOutlineLeft />
          <Link to={"/login"}>Back</Link>
        </div>
      </div>
    </section>

  )
}

export default RecoverPassword
