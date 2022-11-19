import React from 'react'
import "./textareaForm.scss"

const TextareaForm = ({state, setState, label, placeholder, name, error, regex}) => {
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
      <div className="textarea-form">
        {label &&  
          <label className={`label ${state.valid === false ? "error" : ""}`} htmlFor={name}>{label}</label>
        }
        <textarea 
          placeholder={placeholder}
          id={name} 
          value={state.value}
          onChange={onChange} 
          onKeyUp={validation}
          onBlur={validation} 
          className={`textarea ${state.valid === false ? "error" : ""}`}>
        </textarea>
        <span className={`textarea-error ${state.valid === false ? "error" : ""}`}>{error}</span>
      </div>
  )
}

export default TextareaForm
