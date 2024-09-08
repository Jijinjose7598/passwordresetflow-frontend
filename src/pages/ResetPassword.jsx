// ResetPassword.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'; // Assuming same CSS used for styling

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitting password reset:', values.newPassword); // Log the new password
      const response = await axios.post(`https://passwordresetflow-backend-pttf.onrender.com/users/reset-password/${token}`, {
        newPassword: values.newPassword, // Use newPassword instead of password
      });
      console.log(response);
      alert(response.data.message);
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error) {
      console.error('Failed to reset password', error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <Field type="password" id="newPassword" name="newPassword" className="form-control" />
                <ErrorMessage name="newPassword" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
