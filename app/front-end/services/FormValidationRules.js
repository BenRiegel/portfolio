var text = function(value, name){
  var errors = [];
  var hasText = Boolean(value);
  if (!hasText){
    errors.push(`Please enter a ${name}`);    //modify this for a/an
  }
  return [(errors.length==0), errors];
}

var textArea = function(value, name){
  var errors = [];
  var hasText = Boolean(value);
  if (!hasText){
    errors.push(`Please enter a ${name}`);
  }
  return [(errors.length==0), errors];
}

var email = function(value, name){
  var errors = [];
  var hasText = Boolean(value);
  if (!hasText){
    errors.push(`Please enter an email address`);
    return [false, errors];
  }
  var validFormat = Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
  if (!validFormat){
    errors.push(`Please enter a valid email address`);
  }
  return [(errors.length==0), errors];
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
      break;
  }
}

export default validateField;
