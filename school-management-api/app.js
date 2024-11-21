import express from 'express';
import bodyParser from 'body-parser'; 
import schoolRoutes from './routes/schools.js';

const app = express();
app.use(bodyParser.json());
app.use('/api', schoolRoutes);
// console.log("inside app")
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
