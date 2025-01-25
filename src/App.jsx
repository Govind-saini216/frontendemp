import React from 'react';
import {BrowserRouter , Routes , Route ,Navigate} from 'react-router-dom';
import EmployeeMenagmentApp from './components/EmployeeMenagmentApp.jsx';
import EmployeeDetails from './components/EmployeeDetails.jsx';
 
export default function App() {
  return (
    <div className='bg-black text-white'>
      <BrowserRouter>
             <Routes>
              <Route path='/' element={<Navigate to='employee'/> } />
              <Route path='/employee' element={<EmployeeMenagmentApp/>} />
              <Route path='/employee/:id' element={<EmployeeDetails/>} />
             </Routes>
      </BrowserRouter>
    </div>
  )
}
