Readme de Proyecto bicicletas Javier

el repositorio donde se encuentra el proyecto es: https://bitbucket.org/marcoperez99/red_bicicletas/src/master/

Las rutas para probar la API con Postman son:
  http://localhost:3000/api/bicicletas (para buscar con Get)
  http://localhost:3000/api/bicicletas/create 
  http://localhost:3000/api/bicicletas/delete
  http://localhost:3000/api/bicicletas/update 


*Ejemplo para agregar una nueva bicicleta con api:
{
    "id": 5,
    "color":"roja",
    "modelo":"montaña",
    "lat":-34.895388, 
    "lng":-56.189233
}

*si se quiere modificar el id de la bicicleta, además de agregar "id": en el JSON para editar en Postman se agrega "newid"
*si no se quiere modificar alguna de las características basta con borrar esa línea  
*Ejemplos de edición:
ej 1)
{
    "id": 5,
    "newid": 3,
    "color":"blanca",
    "modelo":"urbana",
    "lat":-34.895351, 
    "lng":-56.189211
}
ej 2)
{
    "id": 3,
    "color":"amarilla",
    "lat":-34.895388, 
    "lng":-56.189233
}
