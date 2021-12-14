import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Disclosure, Popover, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, NavLink } from 'react-router-dom';
import { getMyDetails, logout } from '../actions/userActions';

const navigation = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact Us', href: '/contact' },
  //  { name: 'Marketplace', href: '#' },
  //  { name: 'Company', href: '#' },
];

const Headers = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const { userInfo } = userLogin;

  //  console.log(user.photo);

  //  useEffect(() => {
  //    if (!user) {

  //    }
  //  })

  const logoutHandler = () => {
    console.log('Logout bitch!');
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      console.log('Not user for real!');
    }
  }, [user, dispatch]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  return (
    <div>
      <Disclosure as='header' className='relative'>
        {({ open }) => (
          <>
            <div className='bg-gray-900 pt-6 pb-4'>
              <nav
                className='relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6'
                aria-label='Global'
              >
                <div className='flex items-center flex-1'>
                  <div className='flex items-center justify-between w-full md:w-auto'>
                    <NavLink
                      to='/'
                      onClick={() => {
                        console.log('Listening to Buju Cool Kids!');
                      }}
                    >
                      <span className='sr-only'>Coin Invest</span>
                      {/* <img
            className='h-8 w-auto sm:h-10'
            // src='https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg'
            // src='/img/pngegg.png'

            alt='Big Machine'
           /> */}
                      <h2 className='text-green-500 text-xl font-extrabold'>
                        <span className='text-white font-extrabold text-3xl'>
                          Coin
                        </span>{' '}
                        Invest
                      </h2>
                    </NavLink>
                    <div className='-mr-2 flex items-center md:hidden'>
                      <Disclosure.Button className='bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white'>
                        <span className='sr-only'>Open main menu</span>
                        <MenuIcon className='h-6 w-6' aria-hidden='true' />
                      </Disclosure.Button>
                    </div>
                  </div>
                  <div className='hidden space-x-8 md:flex md:ml-10'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className='text-base font-medium text-white hover:text-gray-300'
                        // onClick={}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {!userInfo ? (
                  <div className='hidden md:flex md:items-center md:space-x-6'>
                    <NavLink
                      to='/login'
                      className='text-base font-medium text-white hover:text-gray-300'
                    >
                      Log in
                    </NavLink>
                    <NavLink
                      to='/signup'
                      className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700'
                    >
                      Get Started
                    </NavLink>
                  </div>
                ) : (
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex items-center'>
                      <button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as='div' className='ml-3 relative'>
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                <span className='sr-only'>Open user menu</span>
                                <img
                                  className='h-8 w-8 rounded-full'
                                  //  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                  src={user.photo}
                                  alt=''
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter='transition ease-out duration-100'
                              enterFrom='transform opacity-0 scale-95'
                              enterTo='transform opacity-100 scale-100'
                              leave='transition ease-in duration-75'
                              leaveFrom='transform opacity-100 scale-100'
                              leaveTo='transform opacity-0 scale-95'
                            >
                              <Menu.Items
                                static
                                className='z-30 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                              >
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='/dashboard'
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Dashboard
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='#'
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Settings
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      onClick={logoutHandler}
                                      to='/'
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Sign out
                                    </Link>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                )}
                {/* <div className='hidden md:flex md:items-center md:space-x-6'>
         <NavLink
          to='/login'
          className='text-base font-medium text-white hover:text-gray-300'
         >
          Log in
         </NavLink>
         <NavLink
          to='/signup'
          className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700'
         >
          Get Started
         </NavLink>
        </div> */}
              </nav>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter='duration-150 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Disclosure.Panel
                focus='false'
                static
                className='z-30 absolute top-0 inset-x-0 p-0 transition transform origin-top md:hidden'
              >
                <div className='rounded-lg shadow-md bg-gray-500 ring-1 ring-black ring-opacity-5 overflow-hidden'>
                  <div className='px-5 pt-4 flex items-center justify-between'>
                    <div>
                      {/* <img
            className='h-8 w-auto'
            // src='https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg'
            src='/img/pngegg.png'
            alt='Big Machine'
           /> */}
                      <h2 className='text-green-500 text-xl font-extrabold'>
                        <span className='text-white font-extrabold text-3xl'>
                          Coin
                        </span>{' '}
                        Invest
                      </h2>
                    </div>
                    <div className='-mr-2'>
                      <Disclosure.Button
                        className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600'
                        onClick={() => {
                          console.log('Now Playing Zinoleesky - Won wa mi');
                        }}
                      >
                        <span className='sr-only'>Close menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Disclosure.Button>
                    </div>
                  </div>
                  <div className='pt-5 pb-6'>
                    <div className='px-2 space-y-1'>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50'
                          onClick={() => {
                            console.log('Another one bites the dust');
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                    {!userInfo ? (
                      <>
                        {console.log(user)}
                        <div className='mt-6 px-5'>
                          <NavLink
                            to='/signup'
                            className='block text-center w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700'
                          >
                            Get Started
                          </NavLink>
                        </div>
                        <div className='mt-6 px-5'>
                          <p className='text-center text-base font-medium text-black'>
                            Existing fan with a membership?{' '}
                            <NavLink
                              to='/login'
                              className='text-gray-900 hover:underline'
                            >
                              Login
                            </NavLink>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='pt-4 pb-3 border-t border-gray-700'>
                          <div className='flex items-center px-5'>
                            <div className='flex-shrink-0'>
                              <img
                                className='h-10 w-10 rounded-full'
                                // src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                src={user.photo}
                                alt=''
                              />
                            </div>
                            <div className='ml-3'>
                              <div className='text-base font-medium text-white'>
                                {user.username}
                              </div>
                              <div className='text-sm font-medium text-gray-400'>
                                {user.email}
                              </div>
                            </div>
                            <button className='ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                              <span className='sr-only'>
                                View notifications
                              </span>
                              <BellIcon
                                className='h-6 w-6'
                                aria-hidden='true'
                              />
                            </button>
                          </div>
                          <div className='mt-3 px-2 space-y-1'>
                            <Link
                              to='/dashboard'
                              className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                            >
                              Dashboard
                            </Link>
                            <Link
                              to='#'
                              className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                            >
                              Settings
                            </Link>
                            <Link
                              onClick={logoutHandler}
                              to='/'
                              className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                            >
                              Sign out
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Headers;
