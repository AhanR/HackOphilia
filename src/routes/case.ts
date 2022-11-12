import express from 'express';
import { addCase, getCase, updateCase } from '../controllers/case';

const caseRoutes = express();

caseRoutes.get('/:doctorId', getCase);
caseRoutes.post('/', addCase);
caseRoutes.post('/update/:caseId', updateCase);

export default caseRoutes;