import React, { useState } from 'react';
import './signIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/auth-service';

const SignIn = () => {
  const [signinForm, setSigninForm] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      password: '',
    };

    // if (!signinForm.username) {
    //   newErrors.username = 'Username is required';
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(signinForm.username)) {
    //   newErrors.username = 'Please enter a valid username';
    //   isValid = false;
    // }

    if (!signinForm.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (signinForm.password.length < 3) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const setUserDataInLocal = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setApiError('');
      try {
        const response = await loginUser(signinForm.username, signinForm.password);
        navigate('/product');
        setUserDataInLocal(response);
      } catch (error) {
        console.error('Login error:', error);
        setApiError(error.message || 'Failed to sign in. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="logo-container">
          <img
            src="https://companieslogo.com/img/orig/SYY_BIG-3ab23a28.png?t=1720244494"
            alt="Company Logo"
            className="logo"
          />
        </div>
        <form onSubmit={onSubmit} className="signin-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={signinForm.username}
              onChange={handleChange}
              placeholder="Username"
              className="form-input"
              aria-label="Username input"
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={signinForm.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
              aria-label="Password input"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          {apiError && (
            <div className="api-error-message">{apiError}</div>
          )}
          <button
            type="submit"
            className="signin-button"
            disabled={
              !signinForm.username ||
              !signinForm.password ||
              errors.username ||
              errors.password ||
              isLoading
            }
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className="login-link">
            Create new account <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
