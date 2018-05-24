import React from 'react';


const TextInput = ( {type, className, value, onChange} ) => {


  //private functions ----------------------------------------------------------

  var handleUserInput = function(evt){
    var newValue = evt.target;
    var newErrors = ValidateField(newValue, type);
    var newValidity = (newErrors.length == 0);
    onChange(newValue, newValidity, newErrors);
  }


  //returned component ---------------------------------------------------------

  return (
    <input className={className}
           type={type}
           value={value}
           onChange={onChange}
    />
  );

}
