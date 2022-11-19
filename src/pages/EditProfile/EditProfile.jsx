import React, { useState } from 'react'
import { useAuthContext } from '../../context/authContext';
import "./editProfile.scss";
import { AiOutlineLeft, AiFillCamera } from 'react-icons/ai';
import { BiLoaderAlt } from 'react-icons/bi';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../../components/InputForm/InputForm';
import TextareaForm from '../../components/TextareaForm/TextareaForm';

const EditProfile = () => {
    const [newPhoto, setNewPhoto] = useState("");
    const [newName, setNewName] = useState({value: "", valid: null}); 
    const [newBio, setNewBio] = useState({value: "", valid: null});
    const [newEmail, setNewEmail] = useState({value: "", valid: null});
    const [newPhone, setNewPhone] = useState({value: "", valid: null});
    const [newPassword, setNewPassword] = useState({value: "", valid: null}); 

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const inputFile = useRef(null); 

    const regex = {
        name: /^[a-zA-ZÀ-ÿ\s]{2,18}$/, 
        bio: /^.{1,100}$/, 
        phone: /^\d+$/,   
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/ 
    }
    const { currentUser, 
        setCurrentUser,
        changePhoto, 
        changeEmail, 
        changePassword, 
        changePhone, 
        changeName,
        changeBio
    } =  useAuthContext();

    const { email, image, name, phone, bio, } = currentUser;

    const handleFileInput = (e) => {
        if(e.target.files[0]) {
            setNewPhoto(e.target.files[0])
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(""); 
        setIsLoading(true);
        let imgURL = "";

        try {     
            if(newEmail.valid === true) {
                await changeEmail(newEmail.value);
            }
            if(newPassword.valid === true) {
                await changePassword(newPassword.value); 
            }      
            if(newPhoto) {
                imgURL = await changePhoto(newPhoto); 
            }
            if(newName.valid === true) {
                await changeName(newName.value);
            }
            if(newBio.valid === true) {
                await changeBio(newBio.value); 
            }
            if(newPhone.valid === true) {
                await changePhone(newPhone.value); 
            }    
            setCurrentUser({
                ...currentUser,  
                name: newName.value || name,  
                email: newEmail.value || email, 
                image: imgURL || image,  
                bio: newBio.value || bio, 
                phone: newPhone.value || phone,
            });     
        } catch (error) {
            setError(error.message)
        } finally { 
            setIsLoading(false);
            setNewPhoto(""); 
            setNewName({value: "", valid: null})
            setNewBio({value: "", valid: null});
            setNewPhone({value: "", valid: null});
            setNewEmail({value: "", valid: null});
            setNewPassword({value: "", valid: null});
        }        
    }
  return (
    <section className="edit">
        <div className="edit-container">
            <div className='back-link'>
                <AiOutlineLeft/>
                <Link to={"/"}>Back</Link>
            </div> 
            <form className="edit-card" onSubmit={handleSubmit}>
                <div className="edit-info">
                    <h3>Change info</h3>
                    <p>changes will be reflected to every services</p>
                </div>
                <div className="edit-item edit-photo">
                    <div className='wrapper'>
                        {currentUser.image? (
                            <img src={currentUser.image} alt="avatar" referrerPolicy="no-referrer" />
                        ): (
                            <img src="/user-default.jpg" alt="avatar" />
                        )}
                        <AiFillCamera/>                        
                    </div>
                    <input type="file" onChange={handleFileInput} ref={inputFile} accept="image/*"/>
                    <span className='image-button' onClick={() => inputFile.current.click()}>CHANGE PHOTO</span>
                    <span>{newPhoto && newPhoto.name}</span>
                </div>
                <div className="edit-item">
                    <InputForm 
                        state={newName} 
                        setState={setNewName} 
                        type="text"
                        label="Name"
                        placeholder="Enter your name..."
                        name="Name"
                        error="Name should be 2-18 characters and only contain letters"
                        regex={regex.name} 
                    /> 
                </div>
                <div className="edit-item">
                    <TextareaForm
                        state={newBio} 
                        setState={setNewBio} 
                        type="textarea"
                        label="Bio"
                        placeholder="Enter your bio..."
                        name="Bio"
                        error="Bio should be 1-100 characters"
                        regex={regex.bio} 
                    /> 
                </div>
                <div className="edit-item">
                    <InputForm
                        state={newPhone} 
                        setState={setNewPhone} 
                        type="text"
                        label="Phone"
                        placeholder="Enter your phone..."
                        name="Phone"
                        error="Phone should only contain numbers"
                        regex={regex.phone}
                    />
                </div>
                <div className="edit-item">
                    <InputForm
                        state={newEmail} 
                        setState={setNewEmail} 
                        type="email"
                        label="Email (requires recent login)"
                        placeholder="Enter your email..."
                        name="Email"
                        error="It should be a valid email address"
                        regex={regex.email}  
                    />  
                </div>
                <div className="edit-item">
                    <InputForm
                        state={newPassword} 
                        setState={setNewPassword} 
                        type="password"
                        label="Password (requires recent login)"
                        placeholder="Enter your new password..."
                        name="Password"
                        error="Password should be 8-20 characters and include at least 1 letter and 1 number"
                        regex={regex.password}  
                    />   
                </div>
                <div className="edit-item">
                    <button type='submit' disabled={isLoading} >
                        {isLoading && <BiLoaderAlt/>}
                        Save
                    </button>
                </div>
                <div className="edit-item">
                    {error && <p className='form-error'>{error}</p>}                    
                </div>
            </form>
        </div>
    </section>
  )
}

export default EditProfile