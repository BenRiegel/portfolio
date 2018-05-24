import React from 'react';


const SubmitButton = ( {className, text} ) => {

  //private functions ----------------------------------------------------------

  var blur = function(evt){
    evt.target.blur();
  }


  //returned jsx ---------------------------------------------------------------

  return (
    <input type='submit'
           className={className}
           onClick={blur}
           value={text} />
  );

};

export default SubmitButton;
