import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

export default function Example({ error, success, value, url }) {
 const [open, setOpen] = useState(true);

 let classes =
  'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm';

 if (error) {
  classes += ' bg-red-600 hover:bg-red-700 focus:ring-red-500';
 } else {
  classes += ' bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
 }

 return (
  <Transition.Root show={open} as={Fragment}>
   <Dialog
    as='div'
    static
    className='fixed z-10 inset-0 overflow-y-auto'
    open={open}
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
      <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
       <div>
        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
         {error ? (
          <XIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
         ) : (
          <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
         )}
        </div>
        <div className='mt-3 text-center sm:mt-5'>
         {/* <Dialog.Title
          as='h3'
          className='text-lg leading-6 font-medium text-gray-900'
         >
          {details && details}
         </Dialog.Title> */}
         <div className='mt-2'>
          <p className='text-lg text-red-500'>{error}</p>
         </div>
        </div>
       </div>
       <div className='mt-5 sm:mt-6'>
        <Link to={url}>
         <button
          type='button'
          className={classes}
          onClick={() => setOpen(false)}
         >
          {value}
         </button>
        </Link>
       </div>
      </div>
     </Transition.Child>
    </div>
   </Dialog>
  </Transition.Root>
 );
}
