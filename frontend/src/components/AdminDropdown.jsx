/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  CogIcon,
  PencilAltIcon,
  UsersIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import {
  // UserGroupIcon,
  ArrowCircleLeftIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import EditModal from './EditModal';
import PasswordEditModal from './PasswordEditModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminDropdown({ userInfo }) {
  const [edit, setEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  // const userLogin = useSelector((state) => state.userLogin);

  // const { userInfo } = userLogin;
  const editHandler = () => {
    setEdit(true);
  };

  const onMouseUpEditHandler = () => {
    setEdit(false);
  };

  const passwordEditHandler = () => {
    setPasswordEdit(true);
  };

  const onMousePasswordEditHandler = () => {
    setPasswordEdit(false);
  };

  return (
    <>
      {edit && <EditModal userInfo={userInfo} />}
      {passwordEdit && <PasswordEditModal />}
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
            {userInfo.admin.username}
            <ChevronDownIcon
              className='-mr-1 ml-2 h-5 w-5'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50'>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='#'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                    onClick={editHandler}
                    onMouseUp={onMouseUpEditHandler}
                  >
                    <PencilAltIcon
                      className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    Edit Details
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='#'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                    onClick={passwordEditHandler}
                    onMouseUp={onMousePasswordEditHandler}
                  >
                    <CogIcon
                      className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    Edit password
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/students'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                    // onClick={}
                  >
                    <UsersIcon
                      className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    Students
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/students'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                  >
                    <UserGroupIcon
                      className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    Volunteers
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='#'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                  >
                    <ArrowCircleLeftIcon
                      className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    Log out
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
