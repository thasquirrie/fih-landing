import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className='bg-white'>
        <div className='relative overflow-hidden'>
          <Header />
          <main>
            <Routes>
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/' element={<HomeScreen />} exact />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
