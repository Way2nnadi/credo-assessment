import express from 'express';
import configServer from './configurations';
import universalRoutes from './universal-routes.js'
// import { Server } from 'http';

// initialize the server 
const server = new express();

// set configurations and middleware
configServer(server, express);
// const server = new Server(app);

// universal routing and rendering
universalRoutes(server);

// start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
})