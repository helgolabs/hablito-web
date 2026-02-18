import express from 'express';
const router = express.Router();
import verbController from '../controllers/verbController.js'

router.get('/verbs', verbController.getAllVerbs); 
router.post('/randomverb', verbController.getRandomVerb);
router.post('/conjugation', verbController.getConjugation);
// In your verbRoutes.js (or a relevant route file)
router.get('/testDbConnection', verbController.testDbConnection);


export default router;

