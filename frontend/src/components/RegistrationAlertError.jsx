/* This example requires Tailwind CSS v2.0+ */
import { XCircleIcon, XIcon } from '@heroicons/react/solid';

export default function RegistrationAlertError({ message }) {
  return (
    <div className='rounded-md bg-red-500 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <XCircleIcon className='h-5 w-5 text-white' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium text-white'>{message}</p>
        </div>
        <div className='ml-auto pl-3'>
          <div className='-mx-1.5 -my-1.5'>
            <button
              type='button'
              className='inline-flex bg-green-50 rounded-md p-1.5 text-red-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset--50 focus:ring-green-600'
            >
              <span className='sr-only'>Dismiss</span>
              <XIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
