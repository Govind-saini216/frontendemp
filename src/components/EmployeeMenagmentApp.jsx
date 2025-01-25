import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getallEmployee, CreateEmployee, UpdateEmployee, deletEmployeebyid } from './api.js';
import { useParams } from 'react-router-dom';

export default function EmployeeMenagmentApp() {

  const [employee, setemployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    profileimage: null
  })

  const resetEmployee = () => {
    setemployee(
      {
        name: "",
        email: "",
        phone: "",
        department: "",
        salary: "",
        profileimage: null
      }
    )
  }

  const [employeeData, SetemployeeData] = useState({
    "employees": [],
    "pagination": {
      "totalEmployee": 0,
      "currentPage": 1,
      "totalPages": 1,
      "pageSize": 5
    }
  })

  // update employee usestate
  const [updateEmployee, setupdateEmployee] = useState(null);
  const [statehandleupdate, setStateHandleUpdate] = useState(false);

  // update employee usestate
  useEffect(() => {
    if (updateEmployee) {
      setStateHandleUpdate(true)
      setemployee(updateEmployee)
    }
  }, [updateEmployee])

  const fetchEmployess = async (search = "", page = 1, limit = 5) => {
    try {
      const { data } = await getallEmployee(search, page, limit)
      SetemployeeData(data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

 


  useEffect(() => {
    fetchEmployess();
  }, [])


  const handlerchange = (e) => {
    const { name, value } = e.target;
    setemployee({ ...employee, [name]: value })

  }

  const handlefilechange = (e) => {
    setemployee({ ...employee, profileImage: e.target.files[0] })
  }

  const closemodal = () => {
    document.getElementById('my_modal_3').close()
  }

  const Showmodal = () => {
    document.getElementById('my_modal_3').showModal()
  }

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      {
        statehandleupdate ?
          await UpdateEmployee(employee, employee._id)
          : await CreateEmployee(employee);
        resetEmployee()
        closemodal()
        fetchEmployess()
      }

    } catch (error) {
      console.log('error', error)
    }
  }

  const handleupdateemployee = (employee) => {
    setupdateEmployee(employee);
    Showmodal();
    fetchEmployess()

  }
  const handledeleteemployee = async (employee) => {
    try {
      const result = await deletEmployeebyid(employee._id); // पूरी रिस्पॉन्स को प्राप्त करें
      toast.error(result.data.message);
      fetchEmployess()

    } catch (error) {
      console.log("एरर:", error);
    }
  }

  const search = (e)=>{
       const terms = e.target.value;
    fetchEmployess(terms);
  }

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className=' w-[90%] h-auto border flex-col flex items-center justify-center rounded-md shadow-2xl'>
          <h1 className='text-3xl font-semibold pt-5'>Employee Menagment App</h1>
          <div className='flex items-center justify-between p-3 w-full h-full'>
            <button className='border py-2 px-10 rounded-md bg-violet-700 text-white font-bold active:scale-105 ease-in-out duration-300' onClick={() => Showmodal()} >Add</button>
            <input className='border-2 rounded-md border-black pl-3' type='text' onChange={search} placeholder='Search Employee' />
          </div>
          <EmployeeTable
            handledeleteemployee={handledeleteemployee}
            handleupdateemployee={handleupdateemployee}
            fetchEmployess={fetchEmployess}
            employee={employeeData.employees}
            pagination={employeeData.pagination}
          />
        </div>
      </div>

      <div>
        {/* <button className="btn" >open modal</button> */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box p-5 w-[500px] h-auto py-10">
            <h1 className='text-center pb-10 text-xl font-semibold' > {statehandleupdate ? 'Update Employee Data' : 'Add Employee Data'}</h1>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div >
              <form className='space-y-3' onSubmit={(e) => submithandler(e)} >
                <div >
                  <label>name : </label>
                  <input className='border border-black rounded-sm pl-3' type='text' placeholder='name' value={employee.name} name='name' onChange={handlerchange} required />
                </div>
                <div>
                  <label>Email : </label>
                  <input className='border border-black rounded-sm pl-3' type='email' placeholder='Email' value={employee.email} name='email' onChange={handlerchange} required />
                </div>
                <div>
                  <label>Phone : </label>
                  <input className='border border-black rounded-sm pl-3' type='text' placeholder='Number' value={employee.phone} name='phone' onChange={handlerchange} required />
                </div>
                <div>
                  <label>Department : </label>
                  <input className='border border-black rounded-sm pl-3' type='text' placeholder='Department' value={employee.department} name='department' onChange={handlerchange} required />
                </div>
                <div>
                  <label>Salary : </label>
                  <input className='border border-black rounded-sm pl-3' type='text' placeholder='Salary' value={employee.salary} name='salary' onChange={handlerchange} required />
                </div>
                <div>
                  <label>Profile Image : </label>
                  <input type='file' name='profileimage' onChange={handlefilechange} />
                </div>
                <div>
                  {/* <label>CheckBox : </label> */}
                  <input type='checkbox' value="1" name='checkbox' onChange={handlerchange} required />
                  <label className='pl-3' >All Terms & Condition Accepted</label>
                </div>

                <div>
                  <input className='p-1 mt-4 text-white active:bg-violet-500 bg-violet-700 px-10' type='submit' value={statehandleupdate ? 'Update' : "Save"} name='profileImage' onChange={handlerchange} required />
                </div>
              </form>

            </div>
          </div>
        </dialog>

      </div>
    </>
  )
}
