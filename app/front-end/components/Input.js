import React from 'react';


const Input = ( {type, className, value, onChange, label} ) => {

  //private functions ----------------------------------------------------------

  var handleUserInput = function(evt){
    var newValue = evt.target.value;
    onChange(label, newValue);
  }

  var renderTextArea = function(){
    return (
      <textarea className={className}
                value={value}
                onChange={handleUserInput} />
    );
  }

  var renderTextInput = function(){
    return (
      <input className={className}
             type={type}
             value={value}
             onChange={handleUserInput} />
    );
  }


  //returned jsx ---------------------------------------------------------------

  switch(type){
    case "textarea":
      return renderTextArea();
      break;
    case "text":
    case "email":
      return renderTextInput();
    default:
      return null;
  }

}


export default Input;
