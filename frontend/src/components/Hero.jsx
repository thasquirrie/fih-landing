import { Link } from 'react-router-dom';

/* This example requires Tailwind CSS v2.0+ */
const offers = [
  {
    name: 'Download the app',
    description: 'Get an exclusive $5 off code',
    href: '#',
  },
  {
    name: "Return when you're ready",
    description: '60 days of free returns',
    href: '#',
  },
  {
    name: 'Sign up for our newsletter',
    description: '15% off your first order',
    href: '#',
  },
];

export default function Hero() {
  return (
    <div className='bg-white'>
      <div className='flex flex-col border-b border-gray-200 lg:border-0'>
        <div className='relative'>
          <div
            aria-hidden='true'
            className='hidden absolute lg:w-full h-full bg-white lg:block'
          />
          <div className='relative bg-white lg:bg-transparent'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2'>
              <div className='max-w-2xl mx-auto py-8 lg:py-64 lg:max-w-none'>
                <div className='lg:pr-16'>
                  <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl'>
                    <span className='text-indigo-600'>Skill up</span>,
                    <span className='text-white bg-indigo-600 py-1 px-3'>
                      Innovate
                    </span>
                  </h1>
                  <p className='mt-4 text-xl text-gray-600'>
                    Level up with your preferred digital skills and be in the
                    position to offer solutions to the certain digital problems
                    faced by the populace of the world.
                  </p>
                  <div className='mt-6'>
                    <Link
                      to='/#features'
                      className='inline-block bg-indigo-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-indigo-700'
                    >
                      Features
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full'>
            <img
              src='https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg'
              alt=''
              className='w-full h-full object-center object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
