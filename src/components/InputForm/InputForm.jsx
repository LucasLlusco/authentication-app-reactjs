import React from 'react'
import "./inputForm.scss"
const InputForm = ({state, setState, type, label, placeholder, name, error, regex , icon}) => {
    const onChange = (e) => {
      setState({...state, value: e.target.value}); 
    }

    const validation = () => {
      if(state.value.length > 0) {
        if(regex) {
          if(regex.test(state.value)) {
            setState({...state, valid: true});
          } else {
            setState({...state, valid: false});
          }
        } 
      } else {
        setState({...state, valid: null});
      }
    }
    
  return (
    <div className='input-form'>
      {label &&  
        <label className={`label ${state.valid === false ? "error" : ""}`} htmlFor={name}>{label}</label>
      }
      <div className='input-container'>
        {icon && icon}
        <input 
          type={type} 
          placeholder={placeholder} 
          id={name} 
          value={state.value} 
          onChange={onChange} 
          onKeyUp={validation}
          onBlur={validation}
          className={`input ${state.valid === false ? "error" : ""} ${icon ? "icon" : ""}`} /> 
      </div>
      <span className={`input-error ${state.valid === false ? "error" : ""}`}>{error}</span>
    </div>            
  )
}

export default InputForm


