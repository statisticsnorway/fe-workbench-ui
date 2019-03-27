# workbench-ui
A React application that currently lets a user work with GSIM objects through a workflow. Its goal is to function as a 
total workbench for employees at SSB.

### How it works
This is a fairly small application which implements and structures its functions through imported libraries. 

### Its concept
The longterm goal of this application is to function as the work tool for employees in SSB. It will let them login with 
their work user and tasks related to their role in the organization will appear to them.

As more tasks are defined for an employee at SSB through future projects, they will be implemented in this application.
This way, in the end, this workbench will be the only tool needed for an employee to fullfill their tasks throughout the day.

### Why ReactJS
ReactJS is a JavaScript framework that makes it easy to build large and complex user interfaces as web applications. 
It is based on a component philosophy in which each element in a web application is a React component and controls itelf 
and its structure through state and props.

For us this makes it easy to seperate components into external libraries which can be reused in any React application.

This application then works as a parent to all our libraries and lets us implement them together in a way fit forpurpose.

### Try it
The first time you clone the repository, remember to run `yarn install`

Run yarn start` and navigate to `http://localhost:3000/`

### Run tests
`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

[Jest](https://jestjs.io/docs/en/tutorial-react) and 
[react-testing-library](https://github.com/kentcdodds/react-testing-library) is used for testing.

### Note
At the moment this application imports **react-components-library** and **react-workflow** directly from GitHub 
which means that you need readaccess to the repositories in order to fetch them as dependencies. This will change later 
when we get to upload React libraries to Nexus or go public. This also means that updates to dependencies **will not be** 
reflected unless you run `yarn upgrade`.
