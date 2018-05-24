var NewEventEmitter = function(){


  //private variables ----------------------------------------------------------

  var listeners;


  //private code block ---------------------------------------------------------

  listeners = [];


  //public properties and methods ----------------------------------------------

  return {

    broadcast: function(){
      listeners.forEach( (listener) => {
        listener.cb();
      });
    },

    addListener: function(source, cb){
      listeners.push({source, cb});
    },

    removeListener: function(source){
      listeners = listeners.filter( listener => listener.source !== source )
    },
  };

};


//exports function -------------------------------------------------------------

export default NewEventEmitter;
