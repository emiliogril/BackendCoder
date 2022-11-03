const { calculoPesado } = require("./calculo");

process.on("message", (cantidad) => {
  console.log(cantidad);
  const randomNumbers = calculoPesado(cantidad);


  process.send(randomNumbers);
});