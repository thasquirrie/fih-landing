// /* This example requires Tailwind CSS v2.0+ */
// import { Fragment, useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { CheckIcon } from '@heroicons/react/outline';

// export default function Example() {
//   const [open, setOpen] = useState(true);

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as='div'
//         className='fixed z-10 inset-0 overflow-y-auto'
//         onClose={setOpen}
//       >
//         <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
//           <Transition.Child
//             as={Fragment}
//             enter='ease-out duration-300'
//             enterFrom='opacity-0'
//             enterTo='opacity-100'
//             leave='ease-in duration-200'
//             leaveFrom='opacity-100'
//             leaveTo='opacity-0'
//           >
//             <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
//           </Transition.Child>

//           {/* This element is to trick the browser into centering the modal contents. */}
//           <span
//             className='hidden sm:inline-block sm:align-middle sm:h-screen'
//             aria-hidden='true'
//           >
//             &#8203;
//           </span>
//           <Transition.Child
//             as={Fragment}
//             enter='ease-out duration-300'
//             enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
//             enterTo='opacity-100 translate-y-0 sm:scale-100'
//             leave='ease-in duration-200'
//             leaveFrom='opacity-100 translate-y-0 sm:scale-100'
//             leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
//           >
//             <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
//               <div>
//                 <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
//                   <CheckIcon
//                     className='h-6 w-6 text-green-600'
//                     aria-hidden='true'
//                   />
//                 </div>
//                 <div className='mt-3 text-center sm:mt-5'>
//                   <Dialog.Title
//                     as='h3'
//                     className='text-lg leading-6 font-medium text-gray-900'
//                   >
//                     Instructions on the next step to take
//                   </Dialog.Title>
//                   <div className='mt-2'>
//                     <p className='text-sm text-gray-500'>
//                       Open your favourite wallet and send the exact amount and
//                       type of token you filled in the previous form. Here's the
//                       address:
//                       <br />
//                       <span>
//                         L5ZUWVNQTIWVPI5Y4NPX3SENIWQXDD7AZQ2RO45D2I4APS35DLYWYJKV4I
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className='mt-5 sm:mt-6'>
//                 <button
//                   type='button'
//                   className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
//                   onClick={() => setOpen(false)}
//                 >
//                   Yes I understand
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, CogIcon } from '@heroicons/react/outline';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function InfoModal({ history, coinType, amount }) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const cancelButtonRef = useRef(null);

  console.log({ coinType, amount });

  const address = {
    tron: 'L5ZUWVNQTIWVPI5Y4NPX3SENIWQXDD7AZQ2RO45D2I4APS35DLYWYJKV4I',
    doge: 'MQ5C4CLID3HLUHJTY7QFFUGY25ZR4HRWMTAAKROBZPEEUDJ4TDZGV646Y4',
    algo: 'MG34RCLID3HLUHJTY7QFFUGY25ZR4HRWMTAAKROBZPEEUDJ4TDZGV32546',
  };

  const { tron, doge, algo } = address;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
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
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6'>
              <div>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
                  <CogIcon
                    className='h-6 w-6 text-green-600'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Instructions on sending token
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Open your favourite wallet and send the exact amount:{' '}
                      <span className='font-bold'>
                        {amount} {coinType}
                      </span>{' '}
                      and type of token you filled in the previous form. Click
                      on the{' '}
                      <span className='italic font-medium'>Copy Address</span>{' '}
                      button to copy the address to send the token to.
                    </p>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                  onClick={() => {
                    setOpen(false);
                    history.push('/dashboard');
                  }}
                >
                  I understand
                </button>
                <CopyToClipboard
                  text={
                    coinType === 'Tron'
                      ? tron
                      : coinType === 'doge'
                      ? doge
                      : algo
                  }
                  onCopy={() => setCopied(true)}
                >
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                    // onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {copied ? 'Copied' : 'Copy Address'}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
