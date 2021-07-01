import express from 'express';
import cors from 'cors';
import db from './app/models';
import AppRouter from './app/routes/tutorial.routes';

const app = express();
const corsOptions = {
    origin : 'http://localhost:3000'
}

// middleware
app.use(cors(corsOptions));

// parse request of content-type - application.json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended : true }));

db.sequelize.sync();
AppRouter(app);

// simple route
app.get('/' , (req,res) => {
    res.json({ message: `welcome! tutorial api` })
})


// PORT번호 세팅, listen for requests.
const PORT = process.env.PORT || 8080;
app.listen( PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})

