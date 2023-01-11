import app from './app.js';
import logger from './services/loggerService.js';


app.listen();

const port = app.get('port');


app.listen(port , () => {
    logger.info( `Servidor corriendo en el puerto ${port}`);
});