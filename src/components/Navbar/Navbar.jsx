import React from 'react'
import "./navbar.scss"
import { AiFillCaretDown } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'
import { IoIosLogOut } from 'react-icons/io'
import { BsSun, BsMoon } from 'react-icons/bs'
import { useState } from 'react'
import { useDarkModeContext } from '../../context/darkModeContext'
import { useAuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useEffect } from 'react'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleRef = useRef(null);

  const { darkMode, toggle } = useDarkModeContext();
  const { currentUser, logout} = useAuthContext();

  useEffect(() => {
    const closeDropdown = (e) => { 
      if(!toggleRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", closeDropdown);

    return () => { 
      document.removeEventListener("mousedown", closeDropdown);
    }
  }, [])
  
  const handleLogout = async () => {
    try {
      await logout() 
      setShowMenu(!showMenu); 
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <header className='header'>
      {darkMode ? (
        <img src="/devchallenges-light.svg" alt="logo" />
      ) : (
        <img src="/devchallenges.svg" alt="logo" />
      )}
      <div className="profile-menu">
        <div className="theme-icon"  onClick={toggle}>
          {darkMode ? (
          <BsSun/>          
          ) : (
            <BsMoon/>
          )}
        </div>
        <div className="menu" ref={toggleRef}>
        {currentUser && 
          <div 
            className={`${showMenu ? "menu-trigger active" : "menu-trigger"}`}
            onClick={() => setShowMenu(!showMenu)}>
              {currentUser.image? (
                <img src={currentUser.image} alt="avatar" referrerPolicy="no-referrer" />
              ): (
                <img src="/user-default.jpg" alt="avatar" />
              )}
              <span className='name'>{currentUser.name? currentUser.name : "Me"}</span>
              <AiFillCaretDown/>
          </div>}
          <ul className={`${showMenu ? "menu-list active" : "menu-list"}`}>
            <li className='list-item active'>
              <Link to={"/"}>
                <FaUserCircle/>
                My Profile
              </Link>
            </li>
            <li className="list-item">
              <a>
                <HiUsers/>
                Group Chat
              </a>
            </li>
            <li className='spacing'></li>
            <li className='list-item logout' >
              <a onClick={handleLogout}>
                <IoIosLogOut/>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
