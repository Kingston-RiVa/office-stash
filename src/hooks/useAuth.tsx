import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (emailOrUsername: string, password: string) => {
    // Check if input is email or username
    const isEmail = emailOrUsername.includes('@');
    
    if (isEmail) {
      // Direct sign in with email
      const { error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      });
      return { error };
    } else {
      // Find email by username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', emailOrUsername)
        .maybeSingle();

      if (profileError || !profile) {
        return { error: { message: 'Invalid username or password' } };
      }

      // Sign in with email
      const { error } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: email,
        },
      },
    });

    // If username provided, update profile
    if (!error && data.user && username) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', data.user.id);
      
      if (profileError) {
        console.error('Error updating username:', profileError);
      }
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/');
    }
    return { error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
