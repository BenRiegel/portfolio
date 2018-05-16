var NewAnimation = function(duration, cycleFunction){


  //private variables ----------------------------------------------------------

  var startTimeStamp;


  //private functions ----------------------------------------------------------

  var cycle = function(resolve, reject){
    var currentTimeStamp = new Date().getTime();
    var currentRunTime = currentTimeStamp - startTimeStamp;
    var totalProgress = currentRunTime / duration;
    totalProgress = Math.min(totalProgress, 1);

    try{
      cycleFunction(totalProgress);
    }
    catch(error){
      reject("error");
    }

    if (currentRunTime < duration){
      requestAnimationFrame( () => {
        cycle(resolve, reject);
      });
    } else {
      resolve("done!");
    }
  };


  //returns a promise ----------------------------------------------------------

  return new Promise( (resolve, reject) => {
    if (typeof cycleFunction !== "function" || typeof duration !== "number"){
      reject("invalid parameters");
    } else {
      startTimeStamp = new Date().getTime();
      requestAnimationFrame( () => {
        cycle(resolve, reject);
      });
    }
  });

};


//exports function -------------------------------------------------------------

export default NewAnimation;
