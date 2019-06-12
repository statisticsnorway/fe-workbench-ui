# workbench-ui
A React application with a goal to function as a total and complete workbench for employees at SSB.

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

For us this makes it easy to separate components into external libraries which can be reused in any React application.

This application then works as a parent to all our libraries and lets us implement them together in a way fit for purpose.

### Environment variables
Environment variables are stored in `.env.<env>` files, see https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables.


### Try it
The first time you clone the repository, remember to run `yarn install`

Run `yarn start` and navigate to `http://localhost:3000/`

For running the application standalone, without any service dependencies (that is, with mock data), run the script `start_dev.sh`

### Properties / Configuration
Properties for each environment (typically, URLs to APIs) are stored in .js files in the `properties` folder. Which file to used is decided by
`./properties/properties.js`. If `yarn test` is run, it will use `properties-test.js`, otherwise, it will use the environment variable
`REACT_APP_ENV` to resolve which properties to use

If you want to run the application with specific environment properties, run `REACT_APP_ENV=<environment> yarn start` where `<environment>` 
matches the `properties-<environment>.js` file you want to use

### Run tests
`yarn test` runs all tests and `yarn coverage` calculates (rather unreliably) test coverage.

[Jest](https://jestjs.io/docs/en/tutorial-react) and 
[react-testing-library](https://github.com/kentcdodds/react-testing-library) is used for testing.
