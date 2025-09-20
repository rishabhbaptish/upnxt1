// firebase-auth.js (CDN version)
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const firebaseAuth = {
  // Sign up with email and password
  async signUp(email, password, username) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Update profile with username
      await user.updateProfile({
        displayName: username
      });
      
      const userData = {
        uid: user.uid,
        email: user.email,
        username: username,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      const userData = {
        uid: user.uid,
        email: user.email,
        username: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Google Sign In
  async signInWithGoogle() {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      
      const userData = {
        uid: user.uid,
        email: user.email,
        username: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        provider: 'google',
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign out
  async signOutUser() {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
};