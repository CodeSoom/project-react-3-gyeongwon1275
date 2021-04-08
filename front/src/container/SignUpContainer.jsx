import React, { useEffect } from 'react';

import { useFormik } from 'formik';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { signUp } from '../data/userReducer';

import SignUpForm from '../components/SignUpForm';

export default function SignUpContainer() {
  const dispatch = useDispatch();
  const { signUpSucceded } = useSelector((state) => state.user);

  const history = useHistory();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userId: '',
      password: '',
      passwordConfirm: '',
      userName: '',
      email: '',
      phone: '',
    },
    onSubmit: (formValues) => {
      dispatch(signUp(formValues));
    },
  });

  useEffect(() => {
    if (signUpSucceded) history.push('/login');
  }, [history, signUpSucceded]);

  return (
    <SignUpForm
      formValues={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
