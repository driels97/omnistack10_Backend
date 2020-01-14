const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.getAll);
routes.get('/devs/:name', DevController.getOne);
routes.post('/devs', DevController.store);
routes.put('/devs/:name', DevController.update);
routes.delete('/devs/:name', DevController.destroy);

routes.get('/search', SearchController.getFilter);
module.exports = routes;