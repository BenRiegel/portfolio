var text = function(value, name){
  var errors = [];
  var hasText = Boolean(value);
  if (!hasText){
    errors.push(`Please enter a ${name.toLowerCase()}`);    //modify this for a/an
  }
  return errors;
}

var textArea = function(value, name){
  var errors = [];
  var hasText = Boolean(value);
  if (!hasText){
    errors.push(`Please enter a ${name.toLowerCase()}`);
  }
  return errors;
}

var email = function(value, name){
  var errors = [];
  var hasText = Boolean(value);
  if (!hasText){
    errors.push(`Please enter an email address`);
    return errors;
  }
  var validFormat = Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
  if (!validFormat){
    errors.push(`Please enter a valid email address`);
  }
  return errors;
}

var validateField = function(type, value, name){
  switch(type){
    case "text":
      return text(value, name);
      break;
    case "textarea":
      return textArea(value, name);
      break;
    case "email":
      return email(value, name);
      break;
    default:
      return [];
      break;
  }
}

export default validateField;
