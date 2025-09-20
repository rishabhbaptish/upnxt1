# upnXT Project

A modern learning platform built with Firebase authentication and a clean, responsive UI.

## Setup Instructions

### Firebase Configuration

1. **Get your Firebase config**:

   - Go to your [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click on the gear icon ⚙️ > Project settings
   - Scroll down to "Your apps" section
   - Copy the configuration object

2. **Configure the application**:
   - Locate the `config.example.js` file in the project root
   - Rename it to `config.js`
   - Fill in your Firebase configuration details:

```javascript
// config.js - Add your actual Firebase config here
const firebaseConfig = {
  apiKey: "your_actual_api_key_here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789000",
  appId: "1:123456789000:web:abcdef123456",
  measurementId: "G-ABCDEF1234",
};
```

3. **Important**: Never commit your actual `config.js` with real API keys to version control. The `.gitignore` file is configured to exclude `config.js` from being tracked.

## Installation

1. Clone the repository
2. Set up Firebase configuration as described above
3. Open index.html in your browser or use a local server

## Development

The project uses:

- Firebase Authentication
- Vanilla JavaScript
- Modern CSS with Flexbox/Grid
- Font Awesome icons
