import Features from '../components/Features';
import Header from '../components/Header';
import Hero from '../components/Hero';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Contact', href: '/contact' },
  { name: 'About Us', href: '/about' },
];

export default function HomeScreen() {
  return (
    <>
      <div id='home' className='relative bg-white overflow-hidden'>
        <Header />
        <Hero />
      </div>
      <div className='overflow-hidden max-w-7xl mx-auto'>
        <Features />
      </div>
    </>
  );
}
