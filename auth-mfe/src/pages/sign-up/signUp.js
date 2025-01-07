import React, { useState, useEffect } from 'react';
import './signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../service/auth-service'; // import registerUser service method

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser?.role === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (isAdmin && !formData.role) newErrors.role = 'Role is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Confirm password is required';
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setUserDataInLocal = (user) => {
    localStorage.setItem('userDetails', JSON.stringify(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const adminUsername = JSON.parse(localStorage.getItem('user'))?.username;
      const userCreateDTO = {
        username: formData.username,
        password: formData.password,
        role: isAdmin ? formData.role : 'USER',
      };

      try {
        const user = await registerUser(userCreateDTO, adminUsername);
        setUserDataInLocal(user);
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
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              className="form-input"
              aria-label="Username input"
            />
            {touched.username && errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          {isAdmin && (
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
                <option value="ADMIN">Admin</option>
                <option value="DATA_STEWARD">Data Steward</option>
              </select>
              {touched.role && errors.role && (
                <div className="error-message">{errors.role}</div>
              )}
            </div>
          )}

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
