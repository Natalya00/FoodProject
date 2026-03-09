import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Text from '@/components/Text';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login({ identifier: email, password });
      navigate('/');
    } catch (err) {
      const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
      const message = axiosError?.response?.data?.error?.message || 'Invalid email or password';
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <Text view="title" className={styles.title}>Login</Text>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Email</label>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            type="email"
          />
        </div>
        
        <div className={styles.field}>
          <label>Password</label>
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type="password"
          />
        </div>
        
        {error && <Text view="p-16" color="accent" className={styles.error}>{error}</Text>}
        
        <Button type="submit" disabled={isLoading} className={styles.submit}>
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
      </form>
      
      <Text view="p-16" className={styles.link}>
        Don't have an account? <Link to="/register">Register</Link>
      </Text>
    </div>
  );
};

export default LoginPage;
