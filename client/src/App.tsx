import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
/* import { Login } from './pages/Login/Login'; */
import PasswordGenerator from './pages/PasswordGenerator/PasswordGenerator';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<PasswordGenerator />}/>
      </Route>
    </Routes>
  );
}

export default App;
