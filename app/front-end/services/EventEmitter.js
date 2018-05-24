var NewEventEmitter = function(){


  //private variables ----------------------------------------------------------

  var listeners;


  //private code block ---------------------------------------------------------

  listeners = [];


  //public properties and methods ----------------------------------------------

  return {

    broadcast: function(){
      listeners.forEach( (listener) => {
        listener();
      });
    },

    addListener: function(cb){
      listeners.push(cb);
    },

    removeListener: function(cb){
      listeners = listeners.filter( listener => listener !== cb );
    },
  };

};


//exports function -------------------------------------------------------------

export default NewEventEmitter;
