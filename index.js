import express from 'express';
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotevn from 'dotenv';
import helmet from "helmet";
import morgan from 'morgan';

import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// // data imports
import ProductModel from './models/ProductModel.js';
// import ProductStat from './models/ProductStat.js';
import { dataProduct, dataProductStat} from "./data/index.js"

/* Configurations */
dotevn.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    app.listen(9001, ()=> console.log(`Server Port ${PORT}`))

    /* Add Data Only Once */
    // UserModel.insertMany(dataUser);
    // ProductModel.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);

}).catch((error) => console.log(`${error} did not connect`))

 //? -<  Close Port not in use
process.on('SIGINT', () => {
    // Close your server or perform cleanup operations here
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});