# Desafio GraphQL

El proyecto de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.

Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

# Comandos para Graphql Products
# localhost:8080/graphql
``` 
 query {
  getProducts {
         title
     _id
     price
   category
   description
   },
 }
<br>
  query{ getProductById(_id:"6331b63ee9f30fda7d425d13") {     title
     _id
   }
 }
<br>
 query {
   getProductById(_id:"633362f1871e1cfc203da3b7") {
     title
     _id
   }
 }
<br>
 mutation{
   addProduct(title:"lata de Whiskey", thumbnail:"hola.com/ase123", price:127, description:"hola que ace", category:"bebida") {
     title,
   }
 }
<br>
mutation{
  deleteOneProduct(_id:"6331b63ee9f30fda7d425d13"){
    title
  }
}


```
# Comandos para Graphql Users
# localhost:8080/graphqlUser

```
query {
	getUsers{
    _id,
    username
  }
}

mutation{
  createUser(username: "Emilio Gril", password:"123456",
    email:"e@gmail.com", address:"santa fe 1234", age: 46,
    phone:5411188907654) {
    username
  }
}


