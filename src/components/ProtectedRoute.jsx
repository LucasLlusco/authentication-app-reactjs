import React from 'react'
import { Navigate } from 'react-router-dom'; 
import { useAuthContext } from '../context/authContext'

const ProtectedRoute = ({children}) => {
    const { currentUser } = useAuthContext();

    if(!currentUser) {
      return <Navigate to={"/login"} />
    }
    
  return children;
}

export default ProtectedRoute