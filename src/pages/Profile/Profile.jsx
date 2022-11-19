import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import "./profile.scss";
const Profile = () => {
  const { currentUser } = useAuthContext();

  return (
    <section className='profile'>
      <div className="profile-header">
        <h2>Personal info</h2>
        <p>Basic info, like your name and photo</p>
      </div>
      <div className="profile-card">
        <div className="profile-info">
          <div>
            <h3>Profile</h3>
            <p>Some info may be visible to other people</p>
          </div>
          <Link to={"/edit"} >Edit</Link>
        </div>
        <div className="profile-item">
          <p className='label'>PHOTO</p>
          <div className="content">
            {currentUser.image? (
            <img src={currentUser.image} alt="avatar" referrerPolicy="no-referrer" />
            ): (
              <img src="/user-default.jpg" alt="avatar" />
            )}
          </div>
        </div>
        <div className="profile-item">
          <p className='label'>NAME</p>
          <p className='content'>{currentUser.name? currentUser.name : "No name yet"}</p>
        </div>
        <div className="profile-item">
          <p className='label'>BIO</p>
          <p className='content'>{currentUser.bio? currentUser.bio : "No bio yet"}</p>
        </div>
        <div className="profile-item">
          <p className='label'>PHONE</p>
          <p className='content'>{currentUser.phone? currentUser.phone : "No phone number yet"}</p>
        </div>
        <div className="profile-item">
          <p className='label' >EMAIL</p>
          <p className='content'>{currentUser.email? currentUser.email: "No email yet"}</p>
        </div>
        <div className="profile-item">
          <p className='label'>PASSWORD</p>
          <p className='content'>**********</p>
        </div>      
      </div>
    </section>
  )
}

export default Profile

