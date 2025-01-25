import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const BASE_URL = "http://localhost:8080/";

export const getallEmployee = async (search = "", page = 1, limit = 5) => {
    const url = `${BASE_URL}api/employess?search=${search}&page=${page}&limit=${limit}`;
    try {
        const result = await axios.get(url);
        return result
    } catch (error) {
        return error
    }   
}


export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}api/employess`;
    try {
        const formData = new FormData();
        for (const key in empObj) {
            formData.append(key, empObj[key]);
        }
        
        const result = await axios.post(url, formData);
        if (result.data.message) {
            toast.success(result.data.message); 
        }
        else {
            toast.warning("कर्मचारी बना लिया गया, लेकिन कोई संदेश वापस नहीं आया।");  
           }
        return result

               
    } catch (error) {
        return error
    }
}

export const UpdateEmployee = async (empObj,id) => {
    const url = `${BASE_URL}api/employess/${id}`;
    try {
        const formData = new FormData();
        for (const key in empObj) {
            formData.append(key, empObj[key]);
        }
        
        const result = await axios.put(url, formData);
            toast.success(result.data.message); 
      
        return result               
    } catch (error) {
        return error
    }
}

export const deletEmployeebyid = async (id) => {
    const url = `${BASE_URL}api/employess/${id}`;
    try {
        const result = await axios.delete(url);
        return result               
    } catch (error) {
        return error
    }
}

export const getemployeerbyid = async (id) => {
    const url = `${BASE_URL}api/employess/${id}`;
    try {
        const result = await axios.get(url);
        return result               
    } catch (error) {
        return error
    }
}




