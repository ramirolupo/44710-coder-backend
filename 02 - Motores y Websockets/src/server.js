import express from 'express';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.Router.js';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.get('/', (req, res) => {
    res.render('websockets')
});

const httpServer = app.listen(8080, ()=>{
    console.log('🚀 Server listening on port 8080');
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) =>{
    console.log('usuario conectado!', socket.id);
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado!');
    });
});