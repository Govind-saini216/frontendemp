import React from 'react';
import { Link} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function EmployeeTable({ employee, pagination, fetchEmployess, handleupdateemployee, handledeleteemployee }) {
  // console.log('props k saath employee ki value li hy', employee)
  const headers = ["Name", "Email", "Phone", "Department", "Action"];
  const { currentPage, totalPages } = pagination


    // total leanth page ki puri length ko darsahta hy
  // Array.from
// यह एक नई Array(सरणी) बनाने के लिए उपयोग होता है।
// इसके पहले पैरामीटर में एक ऑब्जेक्ट दिया जाता है जो यह तय करता है कि Array की लंबाई कितनी होनी चाहिए।
// यहां { length: totalPages } लिखा है, जिसका मतलब है कि यह Array totalPages की लंबाई(size) का होगा।
  // (_, index) => index + 1

// यह एक फ़ंक्शन है जो Array के हर एलिमेंट पर लागू होता है।
  // _(पहला पैरामीटर): यह हर एलिमेंट का वेल्यू दर्शाता है, लेकिन यहां उपयोग नहीं किया जा रहा, इसलिए इसे _ से लिखा है।
  // index: यह हर एलिमेंट का क्रमांक(index) दर्शाता है।
  // index + 1: चूंकि Array के इंडेक्स 0 से शुरू होते हैं, इसलिए + 1 करके पेज नंबर को 1 से शुरू किया जा रहा है।
  // const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  // [1, 2, 3, 4, 5] yeh banega last my

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlenextpage = ()=>{
    if (currentPage < totalPages){
      handlepagination(currentPage+1)
    }
  }
  const handlepreviouspage = ()=>{
    if (currentPage > 1){
      handlepagination(currentPage-1)
    }
  }

  const handlepagination = (currepage)=>{
    fetchEmployess('', currepage,5)
  }


  return (
    <>
      <table className='table-fixed w-full h-full text-center'>
        <thead >
          <tr >
            {
              headers.map((headers, i) => (
                <td className='border font-semibold' key={i}>{headers}</td>
              ))
            }
          </tr>
        </thead>

        <tbody className='w-full h-full'>
          {employee.map((emp, i) => (
            <tr key={i} className='border border-b-0 '>
              <td><Link to={`/employee/${emp._id}`} onClick={()=>{getallemployeedata(emp)}} >{emp.name}</Link></td>
              <td className='overflow-x-auto'>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department}</td>
              <td className='flex items-center justify-around pt-1'>
                <span className='cursor-pointer active:text-green-500 active:scale-110 text-green-600'>
                  <FaEdit onClick={() =>{handleupdateemployee(emp)}} />
                </span>
                <span className='cursor-pointer active:text-red-600 active:scale-110 text-red-700'>
                  <MdDelete onClick={() => {handledeleteemployee(emp) }} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         <div className='flex items-center justify-around text-white my-5 w-[1200px] py-3 rounded-sm bg-slate-400'>
        <span>Page {currentPage} of {totalPages} </span>
        
        <div className='flex items-center justify-center gap-x-5'>

          {/* <button className='px-4 cursor-pointer bg-blue-600' 
            onClick={() => handlepreviouspage()}
           disabled={currentPage === 1 }
          >
            Previous
          </button> */}  

          <div className="join grid grid-cols-2">
            <button className="join-item btn btn-outline w-36 h-9  border rounded-md ml-3 bg-blue-600 active:bg-blue-500 " onClick={() => handlepreviouspage()}
              disabled={currentPage === 1}>Previous</button>
            <button className="join-item btn btn-outline w-36 h-9  border rounded-md ml-3 bg-blue-600 active:bg-blue-500 " onClick={() => handlenextpage()}
              disabled={totalPages === currentPage}>Next</button>
          </div>

          {/* <div className='flex items-center justify-evenly gap-x-1'>
          {
            pageNumbers.map((pageNumbers,i)=>(

              {/* <button onClick={() => handlepagination(pageNumbers)} key={i} className='bg-teal-600 p-1 px-3 rounded-full' >
                   {pageNumbers}
              </button> */}
            {/* ))
          }
          </div> */}


          {/* <button className=' px-4 cursor-pointer bg-blue-600' 
            onClick={() => handlenextpage()}
            disabled={totalPages === currentPage }
          >
            Next
          </button> */}

        </div>
         </div>

    </>
  )
}
