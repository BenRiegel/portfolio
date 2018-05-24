import React from 'react';


const TextAreaInput = ( {className, value, onChange} ) => {


  //private functions ----------------------------------------------------------

  var handleUserInput = function(evt){
    var newValue = evt.target;
    var newErrors = ValidateField(newValue, "text");
    var newValidity = (newErrors.length == 0);
    onChange(newValue, newValidity, newErrors);
  }


  //returned component ---------------------------------------------------------

  return (
    <textarea className={className}
              value={value}
              onChange={onChange}
    />
  );

}
