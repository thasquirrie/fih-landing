import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/outline';
import TransactionModal from './TransactionModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const pricing = {
  tiers: [
    {
      title: 'Tron',
      minimum: 500,
      units: 'TRX',
      frequency: '/week',
      // description: 'The essentials to provide your best work for clients.',
      features: [
        '50% rewards',
        'No Clawbacks',
        'Basic analytics',
        '48-hour support response time',
      ],
      cta: 'Opt-in',
      name: 'Tron',
      symbol: 'TRX',
      mostPopular: false,
    },
    {
      title: 'Doge',
      minimum: 3200,
      units: 'Doge',
      frequency: '/week',
      //  description: 'A plan that scales with your rapidly growing business.',
      features: [
        '50% rewards',
        'No Clawbacks',
        'Basic analytics',
        '48-hour support response time',
      ],
      cta: 'Opt-in',
      name: 'Doge',
      symbol: 'DOGE',
      mostPopular: true,
    },
    {
      title: 'Algorand',
      minimum: 50,
      units: 'Algo',
      frequency: '/week',
      //  description: 'Dedicated support and infrastructure for your company.',
      features: [
        '50% rewards',
        'No Clawbacks',
        'Basic analytics',
        '48-hour support response time',
      ],
      cta: 'Opt-in',
      name: 'Algo',
      symbol: 'ALGO',
      mostPopular: false,
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing({ history, location }) {
  const [transactionModal, setTransactionModal] = useState(false);
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinType, setCoinType] = useState('');
  const [coinName, setCoinName] = useState('');

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  console.log({ userInfo });
  console.log(location.search);
  console.log([location]);

  const onClickHandler = () => {
    console.log('Cho Cho');
    setTransactionModal(true);
  };

  const onMouseUpHandler = () => {
    console.log('mouse up bitch!');
    setTransactionModal(false);
  };

  console.log({ history });

  return (
    <>
      {transactionModal && (
        <TransactionModal
          modal={transactionModal}
          history={history}
          location={location}
          symbol={{ symbol: coinSymbol, type: coinType, name: coinName }}
        />
      )}
      <div
        id='pricing'
        className='max-w-7xl mx-auto py-24 px-4 bg-transparent sm:px-6 lg:px-8 sm:mt-32 md:mt-28 lg:mt-4'
      >
        <h2 className='text-xl font-extrabold text-gray-900 sm:text-3xl sm:leading-none sm:tracking-tight lg:text-4xl'>
          Pricing plans forinvestment types
        </h2>
        <p className='mt-6 max-w-2xl text-xl text-gray-800'>
          {/* Choose an affordable plan that's packed with the best features for your
    wants. */}
          Choose an affordable plan with the coin you have the most interest in.
        </p>

        {/* Tiers */}
        <div className='mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8'>
          {pricing.tiers.map((tier) => (
            <div
              key={tier.title}
              className='relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col'
            >
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {tier.title}
                </h3>
                {tier.mostPopular ? (
                  <p className='absolute top-0 py-1.5 px-4 bg-gradient-to-r from-blue-500 to-gray-800 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2'>
                    Most popular
                  </p>
                ) : null}
                <p className='mt-4 flex items-baseline text-gray-900'>
                  <span className='text-5xl font-extrabold tracking-tight'>
                    {tier.minimum} {tier.units}
                  </span>
                  <span className='ml-1 text-xl font-semibold'>
                    {tier.frequency}
                  </span>
                </p>
                <p className='mt-6 text-gray-500'>{tier.description}</p>

                {/* Feature list */}
                <ul role='list' className='mt-6 space-y-6'>
                  {tier.features.map((feature) => (
                    <li key={feature} className='flex'>
                      <CheckIcon
                        className='flex-shrink-0 w-6 h-6 text-gray-800'
                        aria-hidden='true'
                      />
                      <span className='ml-3 text-gray-500'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                // to='#'
                onClick={() => {
                  onClickHandler();
                  setCoinSymbol(tier.symbol);
                  setCoinType(tier.name);
                  setCoinName(tier.title);
                }}
                onMouseUp={onMouseUpHandler}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-gradient-to-r from-blue-500 to-gray-800 text-white hover:bg-gray-600'
                    : 'bg-indigo-50 text-cyan-600 hover:bg-indigo-100',
                  'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
                )}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// /* This example requires Tailwind CSS v2.0+ */
// import { CheckCircleIcon } from '@heroicons/react/solid';

// const includedFeatures = [
//  'Private forum access',
//  'Member resources',
//  'Entry to annual conference',
//  'Official member t-shirt',
// ];

// export default function Example() {
//  return (
//   <div className='bg-gray-100'>
//    <div className='pt-12 sm:pt-16 lg:pt-20'>
//     <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//      <div className='text-center'>
//       <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl'>
//        Simple no-tricks investment plan
//       </h2>
//       <p className='mt-4 text-xl text-gray-600'>
//        Welcome to where the users gains and satisfaction is our topmost priority
//       </p>
//      </div>
//     </div>
//    </div>
//    <div className='mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28'>
//     <div className='relative'>
//      <div className='absolute inset-0 h-1/2 bg-gray-100' />
//      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex'>
//        <div className='flex-1 bg-white px-6 py-8 lg:p-12'>
//         <h3 className='text-2xl font-extrabold text-gray-900 sm:text-3xl'>
//          Lifetime Investment
//         </h3>
//         <p className='mt-6 text-base text-gray-500'>
//          Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet
//          indis perferendis blanditiis repellendus etur quidem assumenda.
//         </p>
//         <div className='mt-8'>
//          <div className='flex items-center'>
//           <h4 className='flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600'>
//            What's included
//           </h4>
//           <div className='flex-1 border-t-2 border-gray-200' />
//          </div>
//          <ul
//           // role='list'
//           className='mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5'
//          >
//           {includedFeatures.map((feature) => (
//            <li key={feature} className='flex items-start lg:col-span-1'>
//             <div className='flex-shrink-0'>
//              <CheckCircleIcon
//               className='h-5 w-5 text-green-400'
//               aria-hidden='true'
//              />
//             </div>
//             <p className='ml-3 text-sm text-gray-700'>{feature}</p>
//            </li>
//           ))}
//          </ul>
//         </div>
//        </div>
//        <div className='py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12'>
//         <p className='text-lg leading-6 font-medium text-gray-900'>
//          Pay once, keep earning forever
//         </p>
//         <div className='mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900'>
//          <span>$349</span>
//          <span className='ml-3 text-xl font-medium text-gray-500'>USD</span>
//         </div>
//         <p className='mt-4 text-sm'>
//          <a href='#' className='font-medium text-gray-500 underline'>
//           Learn about our membership policy
//          </a>
//         </p>
//         <div className='mt-6'>
//          <div className='rounded-md shadow'>
//           <a
//            href='#'
//            className='flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900'
//           >
//            Get Access
//           </a>
//          </div>
//         </div>
//         {/* <div className='mt-4 text-sm'>
//          <a href='#' className='font-medium text-gray-900'>
//           Get a free sample{' '}
//           <span className='font-normal text-gray-500'>(20MB)</span>
//          </a>
//         </div> */}
//        </div>
//       </div>
//      </div>
//     </div>
//    </div>
//   </div>
//  );
// }
