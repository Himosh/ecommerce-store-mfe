import React, { useState } from 'react';
import './signUp.css';
import { Link } from 'react-router-dom';
import { registerUser } from '../../service/auth-service'; 
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../store/authSlice';

const SignUp = () => {

   const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    role: false,
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    const setAccessTokenInLocal = (token) => {
      localStorage.setItem('accessToken', token);
    };
    
    if (Object.keys(newErrors).length === 0) {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        status: formData.role.toUpperCase() 
      };
      

      try {
        console.log(userData)
        const response = await registerUser(userData);
        dispatch(setAccessToken(response.data.cognito.AccessToken));
        //console.log('Login successful:', response.data.AccessToken);
        setAccessTokenInLocal(response.data.cognito.AccessToken);
        // alert('Login successful!');
        navigate('/product');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo-container">
          <img
            src="https://companieslogo.com/img/orig/SYY_BIG-3ab23a28.png?t=1720244494"
            alt="Company Logo"
            className="logo"
          />
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Full Name"
              className="form-input"
              aria-label="Full name input"
            />
            {touched.fullName && errors.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="form-input"
              aria-label="Email input"
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
              aria-label="Role select"
            >
              <option value="" disabled>Select Role</option>
              <option className="form-input" value="customer">Customer</option>
              <option className="form-input" value="vendor">Vendor</option>
            </select>
            {touched.role && errors.role && (
              <div className="error-message">{errors.role}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              className="form-input"
              aria-label="Password input"
            />
            {touched.password && errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className="form-input"
              aria-label="Confirm password input"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="signup-button"
 //           disabled={Object.keys(errors).length = 0}
          >
            Sign Up
          </button>

          <div className="login-link">
            Already have an account? <Link to="/">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
