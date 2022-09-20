const { NOMBRE1, NOMBRE2 } = require("./consts/nombres");
const axios = require("axios");

const users = axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((response) => console.log(response.data));

console.log(NOMBRE1);
console.log(NOMBRE2);
console.log(users);
