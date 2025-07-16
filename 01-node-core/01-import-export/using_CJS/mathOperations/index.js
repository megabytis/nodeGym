module.exports = {
  mul: require("./mult"),
  add: require("./sum"),
};

/* 
By doing so, we made 'mathOperations' folder an 'MODULE',
from now whatever .js file will be require in any directory, from this directory,
we'll just import this directory name, that's it
*/
