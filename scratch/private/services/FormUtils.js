import validateField from './FieldValidation.js';


var getChildrenByComponentName = function(children, targetName){
  return children.filter ( child => child.type.name === targetName);
}

var updateFieldValidity = function(required, type, value, label){
  if (required){
    return validateField(type, value, label);
  } else {
    return [];
  }
}

var calculateFieldData = function(children){
  var fields = {};
  children.forEach( (component) => {
    var { type, className, label, required } = component.props;
    var value = "";  //enter default value
    var errors = updateFieldValidity(required, type, value, label)
    var valid = (errors.length === 0);
    fields[label] = {type, className, label, required, value, valid, errors};
  });
  return fields;
};

var calculateHasRequiredFields = function(fields){
  var entries = Object.entries(fields);
  return entries.some( (entry) => entry[1].required );
}

var calculateFormValidity = function(fields){
  var entries = Object.entries(fields);
  return entries.every( (entry) => entry[1].valid );
}

export {getChildrenByComponentName, updateFieldValidity,
        calculateFieldData, calculateHasRequiredFields, calculateFormValidity};
