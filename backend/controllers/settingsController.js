import {db} from '../models/index.js';

console.log("Are user settings available? ", !!db.user_practice_settings);

  
export const getUserPracticeSettings = async (req, res) => {
  console.log("Inside the getUserPracticeSettings controller");

  const userId = req.params.userId;
  try {
    const userSettings = await db.user_practice_settings.findOne({ where: { user_id: userId } });
    if (!userSettings) {
      return res.status(404).json({ error: "User settings not found." });
    }
    res.json(userSettings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    let settings = await db.user_practice_settings.findOne({ where: { user_id: userId } });
    if (!settings) {
      return res.status(404).send('Settings not found');
    }
    settings = await settings.update(req.body);
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const createUserPracticeSettings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if settings already exist for the user
    const existingSettings = await db.user_practice_settings.findOne({ where: { user_id: userId } });
    if (existingSettings) {
      return res.status(400).json({ error: 'Settings already exist for this user.' });
    }

    // Create new user practice settings
    const newUserSettings = await db.user_practice_settings.create({
      user_id: userId,
      // Add other properties from req.body as needed
    });

    res.status(201).json(newUserSettings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export default {
  updateUserSettings,
  getUserPracticeSettings,
  createUserPracticeSettings
}
