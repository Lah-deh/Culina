import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '../db';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const authState = useSelector((state) => state.auth || {});
  const { loading = false, error, isAuthenticated = false } = authState;

  if (isAuthenticated) {
    navigate('/checkout');
    return null;
  }

  const initialValues = {
    email: '',
    name: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    name: Yup.string().when('$isLogin', {
      is: false,
      then: (schema) => schema.required('Fullname is required'),
      otherwise: (schema) => schema
    }),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const toastId = 'auth-toast';
    
    try {
      if (isLogin) {
        
        const response = await db.listDocuments('users', {
          filter: `email="${values.email}"`
        });
        
        const userDocuments = response.map(doc => doc.data);
        const user = userDocuments.find(u => 
          u.email === values.email && 
          (u.Password === values.password || u.password === values.password)
        );
        
        if (!user) {
          toast.error(`No account found for ${values.email}`, { toastId });
          return;
        }
        
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', 'temp-token');

        const cameFromCart = localStorage.getItem('redirectFromCart');
        localStorage.removeItem('redirectFromCart');
        toast.success('Login successful ', { 
          toastId,
          autoClose: 2000 
        });
        setTimeout(() => {
          toast.dismiss('auth'); 
          navigate(cameFromCart ? '/checkout' : '/category');
        }, 800);
        
      } else {
        
        const newUser = await db.createDocument('users', {
          email: values.email,
          Fullname: values.name,
          Password: values.password
        });
        
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', 'temp-token');
        toast.success('Account created', { 
          toastId,
          autoClose: 2000 
        });
        setTimeout(() => {
          toast.dismiss(toastId); 
          navigate('/checkout');
        }, 800);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="auth-container">
      <IoMdArrowBack className="back-arrow" onClick={handleBack} />
      
      <div className="auth-card">
        <div className="tabs">
          <button 
            type="button"
            className={`tab ${isLogin ? 'active' : 'inactive'}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button 
            type="button"
            className={`tab ${!isLogin ? 'active' : 'inactive'}`}
            onClick={() => setIsLogin(false)}
          >
            SIGN UP
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="form-group">
                <label>Email</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="form-input"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label>Fullname</label>
                  <Field 
                    type="text" 
                    name="name" 
                    className="form-input"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
              )}

              <div className="form-group">
                <label>Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="form-input"
                />
                <ErrorMessage name="password" component="div" className="error" />
                
                <div className="password-requirements">
                  <small>• At least 6 characters long</small>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !isValid}
                className="submit-btn"
              >
                {isSubmitting ? 'Loading...' : (isLogin ? 'LOGIN' : 'CREATE ACCOUNT')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Auth;
