# Next.jss OpenJira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__, es decir, que el proceso no se va a detener al terminar.

* MongoDB URL Local
```
mongodb://localhost:27017/entriesdb
```

* Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Llenar la base de datos con información de prueba
Llamar al endpoint:
```
http://localhost:3000/api/seed
```