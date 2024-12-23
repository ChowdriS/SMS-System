import express from 'express';
import { addSchool, listSchools } from '../controllers/schoolsController.js'; 
const router = express.Router();

// console.log("inside schools")
router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);

export default router; 
