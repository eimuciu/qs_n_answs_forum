import { useState } from 'react';
import css from './Login.module.scss';
import { BigHeader } from '../../atoms/Header/Header';
import Input from '../../atoms/Input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormButton } from '../../atoms/Button/Button';
import { loginUser, registerUser } from '../../../api/api';
import { useAuthCtx } from '../../../store/AuthProvider';
import { useMsgCtx } from '../../../store/MessagingProvider';

// const objShape = {
//   email: '',
//   password: '',
// };

const loginValues = {
  email: '',
  password: '',
};

const registerValues = {
  email: '',
  password: '',
  confirmpassword: '',
};

const loginValidation = Yup.object({
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const registerValidation = Yup.object({
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmpassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function Login({ closeModal }) {
  const [pageState, setPageState] = useState('login');
  const [loading, setIsLoading] = useState(false);
  const { login } = useAuthCtx();
  const { makeMessage } = useMsgCtx();

  const formik = useFormik({
    initialValues: pageState === 'login' ? loginValues : registerValues,
    validationSchema:
      pageState === 'login' ? loginValidation : registerValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      setIsLoading(true);
      if (pageState === 'login') {
        const loginResponse = await loginUser(values);
        if (loginResponse && loginResponse.success) {
          login(loginResponse.token, loginResponse.data);
          makeMessage(loginResponse.msg, 'success');
          setIsLoading(false);
          actions.resetForm();
          closeModal();
          return;
        }
        setIsLoading(false);
        makeMessage(loginResponse.msg, 'error');
      }
      if (pageState === 'register') {
        const { email, password } = values;
        const registerResponse = await registerUser({ email, password });
        if (registerResponse && registerResponse.success) {
          makeMessage(registerResponse.msg, 'success');
          setIsLoading(false);
          actions.resetForm();
          return;
        }
        setIsLoading(false);
        makeMessage(registerResponse.msg, 'error');
      }
    },
  });

  const switchPageState = () => {
    if (pageState === 'login') {
      setPageState('register');
    }
    if (pageState === 'register') {
      setPageState('login');
    }
  };

  return (
    <div className={css.main}>
      <span>
        <BigHeader text={pageState === 'login' ? 'Login' : 'Register'} />
      </span>
      <form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
          type="text"
          placeholder="Email"
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          type="password"
          placeholder="Password"
          error={formik.touched.password && formik.errors.password}
        />
        {pageState === 'register' && (
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatepassword}
            name="confirmpassword"
            type="password"
            placeholder="Confirm password"
            error={
              formik.touched.confirmpassword && formik.errors.confirmpassword
            }
          />
        )}
        {pageState === 'login' && (
          <FormButton type="submit">
            {loading ? 'Waiting...' : 'Login'}
          </FormButton>
        )}
        {pageState === 'register' && (
          <FormButton type="submit">
            {loading ? 'Waiting...' : 'Register'}
          </FormButton>
        )}
      </form>
      {pageState === 'login' && (
        <p>
          Do not have an account? Register{' '}
          <span onClick={switchPageState} role="button">
            here
          </span>
        </p>
      )}
      {pageState === 'register' && (
        <p>
          Login{' '}
          <span onClick={switchPageState} role="button">
            here
          </span>
        </p>
      )}
    </div>
  );
}

export default Login;
