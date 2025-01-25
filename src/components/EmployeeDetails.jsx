import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getemployeerbyid } from './api';

export default function EmployeeDetails() {
  const [getdata, Setgetdata] = useState({})
  const { id } = useParams();
  const navigate = useNavigate();

  const Fetchemployeebyid = async () => {
    try {
      const data = await getemployeerbyid(id)
      Setgetdata(data.data.employee)

    } catch (error) {
      toast.error('Failed to fetch employee , try again later ', 'error')
    }

  }

  useEffect(() => {
    Fetchemployeebyid()
  }, [id])

  return (
    <>
          <div className='border-2 flex items-center justify-center  border-black w-screen h-[100vh]'>
          <div className='flex items-start gap-x-5 justify-center border-2 border-black p-5'>
             <img className='w-[200px] h-[200px]' src={getdata.profileImage} />
             <div>
            <h1>Name : {getdata.name}</h1>
            <h2>Phone : {getdata.phone}</h2>
            <h2>Email : {getdata.email}</h2>
            <h2>Salary : {getdata.salary}</h2>
            <h2>Department : {getdata.department}</h2>
            <h2>Updated Date : {getdata.updatedAt}</h2>
            <button onClick={() => { navigate('/employee') }}  className='px-7 active:bg-blue-400 py-1 bg-blue-500 rounded-md'   >Back</button>
             </div>
          </div>
            </div>
  
    </>
  )
}
