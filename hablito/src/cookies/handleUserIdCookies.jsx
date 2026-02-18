import { createUserPracticeSettings } from '../api/createUserPracticeSettings';
import { fetchUserSettings } from '../api/fetchUserSettings';

// Function to generate a unique integer user ID
const generateIntegerUserId = () => {
  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Extract the last 9 digits of the timestamp
  const last9Digits = timestamp.toString().slice(-9);

  // Convert the result to an integer
  const userId = parseInt(last9Digits, 10);

  return userId;
};

// Function to get or generate the user ID
export const handleUserIdCookies = async () => {
  try {
    // Check if the document object is available (running in a browser environment)
    if (typeof document !== 'undefined') {
      // Retrieve existing user ID from cookie
      const cookieString = document.cookie;
      console.log('Cookie String:', cookieString);

      // Check if the cookie string exists before attempting to split
      const userIdCookie = cookieString ? cookieString.split('; ').find(row => row.startsWith('userId=')) : null;
      const existingUserId = userIdCookie ? parseInt(userIdCookie.split('=')[1], 10) : null;
      console.log('Existing User ID:', existingUserId);

      // Use the existing user ID if it exists, otherwise generate a new one
      const userId = existingUserId || generateIntegerUserId();
      console.log('Final User ID:', userId);

      // Set or update the cookie with the user ID
      document.cookie = `userId=${userId}; expires=${new Date(Date.now() + 31536000000).toUTCString()}; path=/`;
      console.log('Cookie Set:', document.cookie);

      // Check if the user practice settings exist for this user
      const userPracticeSettingsPromise = fetchUserSettings(userId);

      // Wait for the userPracticeSettingsPromise to resolve
      let userPracticeSettings;
      try {
        userPracticeSettings = await userPracticeSettingsPromise;
        console.log('User practice settings found for user ID:', userId);
      } catch (fetchError) {
        console.error('Error fetching user settings:', fetchError);
        // If the error is a 404 (Not Found), log it and proceed
        if (fetchError.response && fetchError.response.status === 404) {
          console.log('User practice settings not found for user ID:', userId);
        } else {
          // Handle other errors appropriately
          throw fetchError;
        }
      }

      // If user practice settings don't exist, create a new entry
      if (!userPracticeSettings) {
        try {
          await createUserPracticeSettings(userId);
          console.log('User practice settings created for user ID:', userId);
        } catch (createError) {
          console.error('Error creating user practice settings:', createError);
          // Handle the error appropriately
        }
      }

      return userId;
    } else {
      console.error('Document object not available. Code is running in a non-browser environment.');
      return null;
    }
  } catch (error) {
    console.error('Error getting or generating user ID:', error);
    // Handle the error appropriately
    return null;
  }
};
