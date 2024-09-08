import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link for navigation
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'; // Assuming you already have Auth.css for styling

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://passwordresetflow-backend-pttf.onrender.com/auth/signin', values);

      if (response.data.success) {
        // Store the JWT token in sessionStorage
        sessionStorage.setItem('authToken', response.data.token);
        console.log('Login successful, token stored:', response.data.token);

        // Redirect to a dashboard or home page
        navigate('/dashboard');
      } else {
        console.error('Login failed:', response.data.message);
        alert(response.data.message); // Display the error message
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h3 className="card-title">Login</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Login
                </button>
              </Form>
            )}
          </Formik>

          <div className="card-links">
            <Link to="/forgot-password" className="card-link">
              Forgot Password?
            </Link>
          </div>
          <div className="card-links">
            <h5>
              Don't have an account?{' '}
              <Link to="/signup" className="card-link">
                Sign up
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
