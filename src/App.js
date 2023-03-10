import { RouterProvider } from 'react-router-dom';  
import { router } from './Routes/Routes';
import './App.css';
import { useContext } from 'react';
import { StateContext } from './contexts/StateProvider/StateProvider';

function App() {

  const {darkmode} = useContext(StateContext)

  return (
    <div className={darkmode && 'dark'}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
