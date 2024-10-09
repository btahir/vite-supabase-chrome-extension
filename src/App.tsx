import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

// Define a User type
type User = {
  email: string;
  // Add other user properties as needed
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await chrome.runtime.sendMessage({ action: 'getUser' });
    setUser(user as User | null);
  };

  const handleSignIn = async () => {
    try {
      await chrome.runtime.sendMessage({ action: 'signIn' });
      await checkUser();
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await chrome.runtime.sendMessage({ action: 'signOut' });
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  console.log('user', import.meta.env.VITE_SUPABASE_URL);

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center h-96 w-64 p-4">
        <h2 className="mb-4">Welcome, {user.email || 'Guest'}!</h2>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-96 w-64 p-4">
      <Button onClick={handleSignIn}>Sign In with Google</Button>
    </div>
  );
}