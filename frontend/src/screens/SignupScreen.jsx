import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signup } from '../actions/userActions';
import Modal from '../components/Modal';

const SignupScreen = ({ location, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/dashboard';

  const userSignup = useSelector((state) => state.userSignup);

  const { loading, error, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('thasquirrie');
    console.log();
    dispatch(signup({ username, email, password, confirmPassword }));
  };
  return (
    <>
      {error && <Modal error={error} value={'Sign up again'} url={'/signup'} />}
      <div className='min-h-screen bg-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <NavLink to='/'>
            <span className='sr-only'>Coin Invest</span>

            <h2 className='text-green-500 text-xl font-extrabold text-center'>
              <span className='text-white font-extrabold text-3xl'>Coin</span>{' '}
              Invest
            </h2>
          </NavLink>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            Sign up for an account
          </h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit={submitHandler} className='space-y-6'>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700'
                >
                  Username
                </label>
                <div className='mt-1'>
                  <input
                    id='username'
                    name='username'
                    type='username'
                    autoComplete='username'
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div></div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='confirm password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <div className='mt-1'>
                  <input
                    id='confirm-password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <Link
                    to='/login'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Already registered? Sign in.
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {loading ? 'Loading...' : 'Sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignupScreen;
