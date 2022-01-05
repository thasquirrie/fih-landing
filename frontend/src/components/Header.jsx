/* This example requires Tailwind CSS v2.0+ */

import { useState } from 'react';
import { useLocation } from 'react-router';
import { Popover } from '@headlessui/react';
import { Link, NavLink } from 'react-router-dom';
import AdminDropdown from './AdminDropdown';
import { useSelector } from 'react-redux';
import Signup from './SignupModal';

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
  const [signupModal, setSignupModal] = useState(false);
  const location = useLocation();
  console.log({ location });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log({ userInfo });

  const onClickHandler = () => {
    setSignupModal(true);
  };

  const onMouseUpHandler = () => {
    setSignupModal(false);
  };

  return (
    <>
      {signupModal && <Signup />}
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
                      // <Popover key={categoryIdx} className='flex'>
                      //   {({ open }) => (
                      //     <>
                      //       <div className='relative flex'>
                      //         <Popover.Button
                      //           className={classNames(
                      //             open
                      //               ? 'border-indigo-600 text-indigo-600'
                      //               : 'border-transparent text-gray-700 hover:text-gray-800',
                      //             'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                      //           )}
                      //         >
                      //           {category.name}
                      //         </Popover.Button>
                      //       </div>

                      //       <Transition
                      //         as={Fragment}
                      //         enter='transition ease-out duration-200'
                      //         enterFrom='opacity-0'
                      //         enterTo='opacity-100'
                      //         leave='transition ease-in duration-150'
                      //         leaveFrom='opacity-100'
                      //         leaveTo='opacity-0'
                      //       >
                      //         <Popover.Panel className='absolute top-full inset-x-0 text-gray-500 sm:text-sm'>
                      //           {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                      //           <div
                      //             className='absolute inset-0 top-1/2 bg-white shadow'
                      //             aria-hidden='true'
                      //           />

                      //           <div className='relative bg-white'>
                      //             <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                      //               <div className='grid grid-cols-1 items-start gap-y-10 gap-x-6 pt-10 pb-12 md:grid-cols-2 lg:gap-x-8'>
                      //                 <div className='grid grid-cols-1 gap-y-10 gap-x-6 lg:gap-x-8'>
                      //                   <div>
                      //                     <p
                      //                       id='clothing-heading'
                      //                       className='font-medium text-gray-900'
                      //                     >
                      //                       Clothing
                      //                     </p>
                      //                     <div className='mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6'>
                      //                       <ul
                      //                         role='list'
                      //                         aria-labelledby='clothing-heading'
                      //                         className='space-y-6 sm:space-y-4'
                      //                       >
                      //                         {category.clothing[0].map(
                      //                           (item) => (
                      //                             <li
                      //                               key={item.name}
                      //                               className='flex'
                      //                             >
                      //                               <a
                      //                                 href={item.href}
                      //                                 className='hover:text-gray-800'
                      //                               >
                      //                                 {item.name}
                      //                               </a>
                      //                             </li>
                      //                           )
                      //                         )}
                      //                       </ul>
                      //                       <ul
                      //                         role='list'
                      //                         aria-label='More clothing'
                      //                         className='mt-6 space-y-6 sm:mt-0 sm:space-y-4'
                      //                       >
                      //                         {category.clothing[1].map(
                      //                           (item) => (
                      //                             <li
                      //                               key={item.name}
                      //                               className='flex'
                      //                             >
                      //                               <a
                      //                                 href={item.href}
                      //                                 className='hover:text-gray-800'
                      //                               >
                      //                                 {item.name}
                      //                               </a>
                      //                             </li>
                      //                           )
                      //                         )}
                      //                       </ul>
                      //                     </div>
                      //                   </div>
                      //                 </div>
                      //                 <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:gap-x-8'>
                      //                   <div>
                      //                     <p
                      //                       id='accessories-heading'
                      //                       className='font-medium text-gray-900'
                      //                     >
                      //                       Accessories
                      //                     </p>
                      //                     <ul
                      //                       role='list'
                      //                       aria-labelledby='accessories-heading'
                      //                       className='mt-4 border-t border-gray-200 pt-6 space-y-6 sm:space-y-4'
                      //                     >
                      //                       {category.accessories.map((item) => (
                      //                         <li
                      //                           key={item.name}
                      //                           className='flex'
                      //                         >
                      //                           <a
                      //                             href={item.href}
                      //                             className='hover:text-gray-800'
                      //                           >
                      //                             {item.name}
                      //                           </a>
                      //                         </li>
                      //                       ))}
                      //                     </ul>
                      //                   </div>
                      //                   <div>
                      //                     <p
                      //                       id='categories-heading'
                      //                       className='font-medium text-gray-900'
                      //                     >
                      //                       Categories
                      //                     </p>
                      //                     <ul
                      //                       role='list'
                      //                       aria-labelledby='categories-heading'
                      //                       className='mt-4 border-t border-gray-200 pt-6 space-y-6 sm:space-y-4'
                      //                     >
                      //                       {category.categories.map((item) => (
                      //                         <li
                      //                           key={item.name}
                      //                           className='flex'
                      //                         >
                      //                           <a
                      //                             href={item.href}
                      //                             className='hover:text-gray-800'
                      //                           >
                      //                             {item.name}
                      //                           </a>
                      //                         </li>
                      //                       ))}
                      //                     </ul>
                      //                   </div>
                      //                 </div>
                      //               </div>
                      //             </div>
                      //           </div>
                      //         </Popover.Panel>
                      //       </Transition>
                      //     </>
                      //   )}
                      // </Popover>
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

                {userInfo && userInfo.role === 'admin' ? (
                  <AdminDropdown />
                ) : (
                  <div className='flex-1 flex items-center justify-end'>
                    <Link
                      to='#'
                      className='hidden text-base font-medium text-gray-700 hover:text-gray-800 hover:bg-indigo-600 hover:text-white hover:py-3 hover: px-3 hover:rounded-lg lg:block'
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
