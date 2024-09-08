import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'; // Import the custom CSS

const Signup = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://passwordresetflow-backend-pttf.onrender.com/users/signup', values);
      console.log(response.data);
      alert('Signup Successful');
    } catch (error) {
      console.error('Signup failed', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">name</label>
                <Field type="text" id="name" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Signup
                          </button>
                               <div className="card-links">
            <h5>Have an account already?  <Link to="/login" className="card-link">Login</Link></h5>
            
          </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
