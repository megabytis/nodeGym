const name = "Madhusudan";
const yearOfBirth = 2004;
const calculateAge = (yearOfBirth) => 2025 - yearOfBirth;

module.exports = {
  name,
  // we can also create our own key name
  yrOfBir: yearOfBirth,
  calcAge: calculateAge,
};

/* here we can also do like;

module.exports.nm = name;
module.exports.calcAge = calculateAge;
module.exports.yrOfBir = yearOfBirth;

⚠️⚠️⚠️ IMPORTANT ⚠️⚠️⚠️
Why ?
cuz 'module.exports' is an "EMPTY OBJECT".
so, by writting module.exports.nm = name; 
we r creating an key 'nm' which holds 'name' varibale of this file
*/
