import express from 'express';
const router = express.Router();
import settingsController from '../controllers/settingsController.js';

// Route to get settings for a user
router.get('/userpracticesettings/:userId', settingsController.getUserPracticeSettings);

// Route to update settings for a user
router.post('/updateuserpracticesettings/:userId', settingsController.updateUserSettings);

// Route for creating user practice settings db entry
router.post('/createuserpracticesettings/:userId', settingsController.createUserPracticeSettings);

export default router;
