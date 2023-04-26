import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AuthContext } from './context/AuthContext';
import AccountsTable from './pages/AccountsTable';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import PasswordGenerator from './pages/PasswordGenerator/PasswordGenerator';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Register } from './pages/Register';
import { Welcome } from './pages/Welcome';
import './App.scss';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/password-generator' element={<PasswordGenerator />}/>
          <Route path='/password-list' element={<AccountsTable />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
