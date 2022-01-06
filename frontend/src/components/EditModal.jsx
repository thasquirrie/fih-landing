/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import Input from './Input';
import { signup } from '../actions/userActions';
import RegistrationAlertSuccess from './RegistrationAlertSuccess';
import RegistrationAlertError from './RegistrationAlertError';

export default function Modal({ modal, userInfo }) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);

  const { error, loading, success } = userSignup;

  useEffect(() => {
    if (success) {
      window.setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [success]);

  const onClickHandler = (e) => {
    e.preventDefault();
    console.log({ email, username });
    dispatch(signup({ email, username, name }));
  };

  // console.log(modal);

  return (
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
                <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:px-6 lg:px-8'>
                  <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                      Edit your details
                    </h2>
                  </div>

                  <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                      <form
                        onSubmit={onClickHandler}
                        className='space-y-6'
                        action='#'
                        method='POST'
                      >
                        <Input
                          labelName={'Name'}
                          name={'name'}
                          type={'text'}
                          value={userInfo.admin.name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <Input
                          labelName={'Username'}
                          name={'username'}
                          type={'text'}
                          value={userInfo.admin.username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <Input
                          labelName={'Email Address'}
                          name={'email'}
                          type={'email'}
                          value={userInfo.admin.email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />

                        <div>
                          <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          >
                            {loading ? 'Processing...' : 'Edit Details'}
                          </button>
                        </div>
                        {success && (
                          <RegistrationAlertSuccess
                            message={'Details changed successfully'}
                          />
                        )}
                        {error && <RegistrationAlertError />}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
