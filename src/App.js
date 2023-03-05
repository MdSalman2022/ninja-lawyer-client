import { RouterProvider } from 'react-router-dom';  
import { router } from './Routes/Routes';
import './App.css';
import { AuthContext } from './contexts/AuthProvider/AuthProvider';
import { useContext } from 'react';

function App() {

  const {darkmode} = useContext(AuthContext)

  return (
    <div className={darkmode && 'dark'}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
