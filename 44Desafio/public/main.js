// const socket = io({
//   reconnection: false, // defaults to true
// });

// const enviarMensaje = () => {
//   const text = document.getElementById("text").value;
//   const email = document.getElementById("userMail").innerHTML;

//   const mensaje = { email, text };

//   console.log(email);
//   console.log(text);

//   socket.emit("new_message", mensaje);
//   return false;
// };

// const crearEtiquetasMensaje = (mensaje) => {
//   const { email, text } = mensaje;
//   return `
//     <div class="p-1">
//       <strong class="text-danger">${email}</strong>
//       <em class="text-primary ">[ ${text} ]</em>
//     </div>
//   `;
// };

// const agregarMensajes = (mensajes) => {
//   const mensajesFinal = mensajes
//     .map((mensaje) => crearEtiquetasMensaje(mensaje))
//     .join(" ");
//   document.getElementById("messages").innerHTML = mensajesFinal;
// };

// socket.on("messages", (messages) => agregarMensajes(messages));