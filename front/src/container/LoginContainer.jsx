import React, { useEffect } from 'react';

import { useFormik } from 'formik';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { login } from '../data/userReducer';

import LoginForm from '../components/LoginForm';

export default function LoginConatiner() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);

  const history = useHistory();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: '',
      password: '',
    },
    onSubmit: (formValues) => {
      dispatch(login(formValues));
    },
  });

  useEffect(() => {
    if (accessToken) history.push('/');
  }, [history, accessToken]);

  return (
    <LoginForm
      formValues={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
