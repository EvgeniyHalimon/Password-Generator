import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import PasswordGenerator from './pages/PasswordGenerator/PasswordGenerator';
import { PasswordList } from './pages/PasswordList/PasswordList';
import { Register } from './pages/Register/Register';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/password-generator' element={<PasswordGenerator />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/password-list' element={<PasswordList />}/>
      </Route>
    </Routes>
  );
}

export default App;
