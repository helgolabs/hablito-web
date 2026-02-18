import express from 'express';
const router = express.Router();
import tenseController from '../controllers/tenseController.js'

// Route to get all tenses
router.get('/', tenseController.getAllTenses);

// // Route to get verbs for a specific tense
// router.get('/:tenseId/verbs', tenseController.getTenseVerbs);

// Route to get specific verb for a specific tense
// router.get('/:tense/:infinitive', tenseController.getVerbForTense)


router.get('/Present/:infinitive', tenseController.getPresentConjugations)
router.get('/Preterite/:infinitive', tenseController.getPreteriteConjugations);
router.get('/Future/:infinitive', tenseController.getFutureConjugations);
router.get('/Imperfect/:infinitive', tenseController.getImperfectConjugations);
router.get('/Conditional/:infinitive', tenseController.getConditionalConjugations);
router.get('/PresentPerfect/:infinitive', tenseController.getPresentPerfectConjugations);
router.get('/PreteritePerfect/:infinitive', tenseController.getPreteritePerfectConjugations);
router.get('/Pluperfect/:infinitive', tenseController.getPluperfectConjugations);
router.get('/FuturePerfect/:infinitive', tenseController.getFuturePerfectConjugations);
router.get('/ConditionalPerfect/:infinitive', tenseController.getConditionalPerfectConjugations);
router.get('/PresentSubjunctive/:infinitive', tenseController.getPresentSubjunctiveConjugations);
router.get('/ImperfectSubjunctiveRa/:infinitive', tenseController.getImperfectSubjunctiveRaConjugations);
router.get('/ImperfectSubjunctiveSe/:infinitive', tenseController.getImperfectSubjunctiveSeConjugations);
router.get('/Imperative/:infinitive', tenseController.getImperativeConjugations);
router.get('/NegativeImperative/:infinitive', tenseController.getNegativeImperativeConjugations);


export default router;
