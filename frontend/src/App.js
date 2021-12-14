import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className='bg-white'>
        <div className='relative overflow-hidden'>
          {/* <Header /> */}
          <main>
            <Routes>
              {/* <Route path='/login' component={LoginScreen} />
              <Route path='/signup' component={SignupScreen} /> */}
              {/* <Route path='/dashboard' component={DashboardScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/pricing' component={PricingScreen} />
              <Route path='/contact' component={ContactScreen} />
              <Route path='/create-transaction' component={CreateTransaction} /> */}
              <Route path='/' element={<HomeScreen />} exact />
            </Routes>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
