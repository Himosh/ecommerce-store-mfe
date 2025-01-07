import React, { useState } from 'react';
import './signIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/auth-service';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../store/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
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
      email: '',
      password: '',
    };

    if (!signinForm.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signinForm.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!signinForm.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (signinForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const setAccessTokenInLocal = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setApiError('');
      try {
        const response = await loginUser(signinForm);
        dispatch(setAccessToken(response.data.AccessToken));
        //console.log('Login successful:', response.data.AccessToken);
        setAccessTokenInLocal(response.data.AccessToken);
        // alert('Login successful!');
        navigate('/product');
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
              type="email"
              name="email"
              value={signinForm.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-input"
              aria-label="Email input"
            />
            {errors.email && (
              <div className="error-message">
                {errors.email}
              </div>
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
              <div className="error-message">
                {errors.password}
              </div>
            )}
          </div>
          {apiError && (
            <div className="api-error-message">
              {apiError}
            </div>
          )}
          <button
            type="submit"
            className="signin-button"
            disabled={
              !signinForm.email ||
              !signinForm.password ||
              errors.email ||
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
