/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import Input from './Input';
import { login } from '../actions/userActions';
import RegistrationAlertSuccess from './RegistrationAlertSuccess';
import { Link } from 'react-router-dom';
import Signup from './SignupModal';
import RegistrationAlertError from './RegistrationAlertError';
import { USER_LOGIN_RESET } from '../constants/userConstants';

export default function Modal({ history }) {
  const [open, setOpen] = useState(true);
  const [signupModal, setSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  let { error, loading, success } = userLogin;
  console.log({ error, success });

  console.log({ open });

  useEffect(() => {
    if (success) {
      window.setTimeout(() => {
        setOpen(false);
      }, 1000);
    }

    if (error) {
      window.setTimeout(() => {
        dispatch({ type: USER_LOGIN_RESET });
      }, 2000);
    }
  }, [success, error, dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ email, password });
    dispatch(login({ email, password }));
    console.log('Confirmed!');
  };

  const onClickHandler = () => {
    setSignupModal(true);
    setOpen(false);
  };

  const onMouseUpHandler = () => {
    setSignupModal(false);
  };

  return (
    <>
      {signupModal && <Signup />}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6'>
                <div>
                  <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Sign in to your account
                      </h2>
                    </div>

                    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                      <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                        <form
                          onSubmit={onSubmitHandler}
                          className='space-y-6'
                          action='#'
                          method='POST'
                        >
                          <Input
                            labelName={'Email Address'}
                            name={'email'}
                            type={'email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <Input
                            labelName={'Password'}
                            name={'password'}
                            type={'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                              <input
                                id='remember-me'
                                name='remember-me'
                                type='checkbox'
                                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                              />
                              <label
                                htmlFor='remember-me'
                                className='ml-2 block text-sm text-gray-900'
                              >
                                Remember me
                              </label>
                            </div>

                            <div className='text-sm'>
                              <Link
                                to='#'
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                              >
                                Forgot your password?
                              </Link>
                            </div>
                          </div>

                          <div>
                            <button
                              type='submit'
                              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                              {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                          </div>
                        </form>
                        <div className='mt-3'>
                          <p className='block text-sm text-gray-900 font-medium'>
                            Not an admin yet? Click{' '}
                            <span
                              className='cursor-pointer text-indigo-600'
                              onClick={onClickHandler}
                              onMouseUp={onMouseUpHandler}
                            >
                              here
                            </span>{' '}
                            to signup
                          </p>
                        </div>
                        {success && (
                          <RegistrationAlertSuccess
                            message={'Sign in successful'}
                          />
                        )}
                        {error && <RegistrationAlertError message={error} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
