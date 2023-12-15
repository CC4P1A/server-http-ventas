import express from 'express';
import socket from './src/client.js';
import router from './src/router.js';
import { config_apirest, config_socket } from './src/config.js';

const port = config_apirest.port;
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/api', router);
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

const server = config_socket;
try {
    const response = await socket.tryConnect(server.port, server.host);
    console.log('response', response);
} catch (error) {
    console.log('error', error);
}