/* This example requires Tailwind CSS v2.0+ */

import { useState } from 'react';
import { useLocation } from 'react-router';
import { Popover } from '@headlessui/react';
import { Link, NavLink } from 'react-router-dom';
import AdminDropdown from './AdminDropdown';
import { useSelector } from 'react-redux';
import Signup from './SignupModal';
import Login from './LoginModal';

const navigation = {
  categories: [
    {
      name: 'Women',
      clothing: [
        [
          { name: 'Tops', href: '#' },
          { name: 'Dresses', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Denim', href: '#' },
          { name: 'Sweaters', href: '#' },
          { name: 'T-Shirts', href: '#' },
        ],
        [
          { name: 'Jackets', href: '#' },
          { name: 'Activewear', href: '#' },
          { name: 'Shorts', href: '#' },
          { name: 'Swimwear', href: '#' },
          { name: 'Browse All', href: '#' },
        ],
      ],
      accessories: [
        { name: 'Shoes', href: '#' },
        { name: 'Jewelry', href: '#' },
        { name: 'Handbags', href: '#' },
        { name: 'Socks', href: '#' },
        { name: 'Hats', href: '#' },
        { name: 'Browse All', href: '#' },
      ],
      categories: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' },
      ],
    },
    {
      name: 'Men',
      clothing: [
        [
          { name: 'Dress Shirts', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Jackets', href: '#' },
          { name: 'T-Shirts', href: '#' },
          { name: 'Jeans', href: '#' },
          { name: 'Hoodies', href: '#' },
        ],
        [
          { name: 'Vests', href: '#' },
          { name: 'Kilts', href: '#' },
          { name: 'Outdoors', href: '#' },
          { name: 'Capes', href: '#' },
          { name: 'Browse All', href: '#' },
        ],
      ],
      accessories: [
        { name: 'Watches', href: '#' },
        { name: 'Boots', href: '#' },
        { name: 'Fanny Packs', href: '#' },
        { name: 'Sunglasses', href: '#' },
        { name: 'Browse All', href: '#' },
      ],
      categories: [
        { name: 'Just Added', href: '#' },
        { name: 'Clearance', href: '#' },
        { name: 'Graphic Tees', href: '#' },
      ],
    },
  ],
  other: [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'About us', href: '/about' },
    { name: 'Contact us', href: '/contact' },
  ],
};

function classnames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  // const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onClickHandler = () => {
    setLoginModal(true);
  };

  const onMouseUpHandler = () => {
    setLoginModal(false);
  };

  return (
    <>
      {/* {signupModal && <Signup />} */}
      {loginModal && <Login />}
      <div className='bg-white'>
        <header className='relative bg-white'>
          <nav
            aria-label='Top'
            className='lg:my-5 max-w-7xl mx-auto sm:px-6 lg:px-8'
          >
            <div className=' border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0'>
              <div className='h-16 flex items-center justify-between'>
                {/* Logo */}
                <div className='flex-1 flex'>
                  <Link to='/'>
                    <span className='sr-only'>Workflow</span>
                    <img
                      className='w-auto h-14 lg:h-20'
                      // src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                      src='/img/logo.png'
                      alt='FIH logo'
                    />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className='absolute bottom-0 inset-x-0 sm:static sm:flex-1 sm:self-stretch'>
                  <div className='border-t h-14 px-4 flex space-x-8 overflow-x-auto pb-px sm:h-full sm:border-t-0 sm:justify-center sm:overflow-visible sm:pb-0'>
                    {navigation.categories.map((category, categoryIdx) =>
                      //
                      console.log({ category, categoryIdx })
                    )}

                    {navigation.other.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={classnames(
                          location.pathname === item.href
                            ? 'text-indigo-600 border-b border-indigo-600'
                            : 'lg:border-b',
                          ' active:text-indigo-600 active:border-indigo-600 flex items-center text-base lg:font-medium text-gray-700 hover:text-gray-800'
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </Popover.Group>

                {userInfo && userInfo.admin.role === 'admin' ? (
                  <div className='flex-1 flex items-center justify-end'>
                    <AdminDropdown userInfo={userInfo} />
                  </div>
                ) : (
                  <div className='flex-1 flex items-center justify-end'>
                    <Link
                      to='#'
                      className='text-base font-medium text-gray-700 hover:text-gray-800 hover:bg-indigo-600 hover:text-white hover:py-3 hover: px-3 hover:rounded-lg lg:block'
                      onClick={onClickHandler}
                      onMouseUp={onMouseUpHandler}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
