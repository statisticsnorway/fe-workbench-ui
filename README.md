# MOD P2 Leveranseavtale arbeidsbenk UI #

### Summary ###

A simple Spring Boot application with React running the front-end.

### Running ###

To run the front-end, cd into ./leveranse-frontend -> install yarn and run it:

```yarn install```

```yarn start```

By default, this will start the front-end at http://localhost:3000. If you want to
change the default port, modify package.json and change the start script section to:

```yarn start: export PORT=3006 && react-scripts start```

To run the back-end, from the project root directory, run:

```mvn spring-boot:run```

By default, this will start the backend server at http://localhost:8080. To change the port, modify src/main/resources/application.properties to include server.port=xxxx where xxxx is your desired port number.

Other APIs the application relies upon are handled in .env under ./leveranse-frontend

### Installation ###

In the source directory, run:

```mvn install -DskipTests```

In the leveranse-frontend directory run:

``` yarn install```

You might have to install the appropriate versions of npm or mvn.

