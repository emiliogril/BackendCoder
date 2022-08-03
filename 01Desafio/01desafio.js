// Clase 02: Principios básicos de Javascript
// Desafio 01:
// Alumno : Emilio Gril

// class Usuario {
//     constructor(nombre, apellido, libros, mascotas){
//         if(typeof nombre != "string") { nombre =""; };
//         if(typeof apellido != "string") { apellido =""; };
//         if(typeof libros != "string") { libros =""; };
//         if(typeof mascotas != "string") { mascotas ="";};

//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.libros = libros;
//         this.mascotas = mascotas;
//     };

//     getFullName() {
//         return `${this.nombre} ${this.apellido}`;
//     };

//     addMascotas(mascotas) {
//         this.mascotas.push(mascotas);
//     };

//     countMascotas() {
//         return this.mascotas.length;
//     };

//     addBook(nombre, autor) {
//         this.libros.push( nombre, autor);
//     }

//     getBookName() {
//         let listaLibros = [];
//         this.libros.forEach(libro => {
//             listaLibros.push(libro.nombre);
            
//         });
//         return listaLibros;
//     };
// };

// let nombreUsuario1 = "Emilio";
// let apellidoUsuario1 = "Gril";
// let mascotasUsuario1 = ["Milo"];
// let librosUsuario1 = [{ "nombre": "El ciclismo", "autor": "Diego Ayala" }];

// const usuario1 = new Usuario(nombreUsuario1, apellidoUsuario1, librosUsuario1, mascotasUsuario1);

// console.log(`Nombre del usuario: ${usuario1.getFullName()}`);
// console.log(`Cantidad inicial de mascotas: ${usuario1.countMascotas()} --> ${usuario1.mascotas}`);

// usuario1.addMascotas('India');
// console.log(`Cantidad de mascotas: ${usuario1.countMascotas()} --> ${usuario1.mascotas}`);

// console.log(`Libros: ${usuario1.getBookName()}`);
// usuario1.addBook("Como mejorar el entrenamiento", "Diego Ayala");
// console.log(`Libros Final: ${usuario1.getBookName()}`);

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;       // String
        this.apellido = apellido;   // String
        this.libros = libros;       // Object[]
        this.mascotas = mascotas;   // String[]
    }
    getFullName() {                                     // Return Full Name
        return `${this.nombre} ${this.apellido}`;   
    }
    addMascota(mascota) {                               // Add Mascota to String[]
        this.mascotas.push(mascota);
    }
    countMascotas() {                                   // Return number of Mascotas
        return this.mascotas.length;
    }
    addBook(nombre, autor) {                            // Add book to Object[]
        this.libros.push({
            nombre,
            autor
        });
    }
    getBookNames() {                                    // Return Array only book's names
        return this.libros.map(libro => libro.nombre);
    }
}

const usuario = new Usuario('Cristian', 'Torchia', 
[{nombre:'Steve Jobs',autor:'Walter Isaacson'},{nombre:'Hamlet',autor:'William Shakespeare'}],
['Perro', 'Gato']);

// ******************************************************************************

console.log('Cantidad de Mascotas:', usuario.countMascotas());
console.log('Nombres de libros:',usuario.getBookNames())
console.log('Nombre completo:', usuario.getFullName());

usuario.addBook('El código Da Vinci','DAN Brown');
usuario.addMascota('loro')

console.log('******** Luego de agregar Elementos: **********');
console.log('Cantidad de Mascotas:', usuario.countMascotas());
console.log('Nombres de libros:',usuario.getBookNames())