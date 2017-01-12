import path from 'path';

export default function configServer(server, express) {
  server.set('view engine', 'ejs');
  server.set('views', path.join(__dirname, 'views'));

  // define the folder that will be used for static assets
  server.use(express.static(path.join(__dirname, 'static')));
}