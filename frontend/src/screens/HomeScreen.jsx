import { useLocation } from 'react-router';
import Features from '../components/Features';
import Hero from '../components/Hero';
import JoinCTA from '../components/Join-cta';

export default function HomeScreen({ match }) {
  console.log({ match });

  const location = useLocation();
  console.log({ location });
  return (
    <>
      <div id='/' className='relative bg-white overflow-hidden mb-3'>
        <Hero />
      </div>
      <div className='overflow-hidden max-w-7xl mx-auto'>
        <Features />
      </div>
      <div>
        <JoinCTA />
      </div>
    </>
  );
}
