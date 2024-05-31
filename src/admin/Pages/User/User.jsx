import React, { useEffect, useState } from 'react';
import SummaryApi from "../../common";
import { toast } from 'react-toastify';
import './User.css';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

function User() {
  const [data , setData] = useState();
  const [editable, setEditable] = useState(false);
  const [saveable, setSaveable] = useState(false);
  const [idEditable, setIdEditable] = useState();
  const [editData, setEditData] = useState({
      username: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
      status: "",
      department: ""
  });

  // edit
  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setSaveable(true);
    setEditData({
        ...editData,
        [name]: value
    })
  };

  const userlist = async () => {
    const dataResponse = await fetch(SummaryApi.userlist.url, {
      method: SummaryApi.userlist.method,
      credentials: 'include',
      headers: {
          "Content-Type": "application/json"
      }
    });

    const response = await dataResponse.json();
    if(response.name || response.success === false) {
      toast.error(response.message);
    }else{
      // toast.success(response.message);
      setData(response.data);
    }
  };
  useEffect(() => {
    userlist();
  }, []);
  
  // delete
  const deleteHandler = async( id ) =>{
      // alert comfirm delete
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if(confirmDelete){
        const deleteResponse = await fetch(SummaryApi.deleteUser.url + "/" + id, {
            method: SummaryApi.deleteUser.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await deleteResponse.json();
        if(response.name || response.success === false) {
            toast.error(response.message);
        }else{
            toast.success(response.message);
            userlist();
        } 
      }
  };

  // edit
  const editHandler = (item) => {
    setEditable(!editable);
    setIdEditable(item._id);
    setEditData(item);
  }
  // update
  const updateHandler = async(id) => {
    console.log(editData);
    const updateResponse = await fetch(SummaryApi.updateUser.url + "/" + id, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( editData )
    });
    const response = await updateResponse.json();
    if(response.name || response.success === false) {
        toast.error(response.message);
    }else{
        toast.success(response.message);
        setEditable(false);
        userlist();
    }
  }
  return (
    <>
      <div className="table_user">
        <h1>User management</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Status</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { data && data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className='id'>{item._id}</td>
                    <td>{editable && idEditable === item._id ? 
                      <input type="text" name="username" defaultValue={item.username} onChange={handleOnChange} /> : item.username}
                    </td>
                    <td>{editable && idEditable === item._id ? 
                      <input type="text" name="email" defaultValue={item.email} onChange={handleOnChange} /> : item.email}
                    </td>
                    <td>{editable && idEditable === item._id ? 
                      <input type="text" name='phone' defaultValue={item.phone} onChange={handleOnChange} /> : item.phone}
                    </td>
                    <td>{editable && idEditable === item._id ? 
                      <select name="gender" defaultValue={item.gender} onChange={handleOnChange} > 
                        <option value="male">Male</option> <option value="female">Female</option> 
                      </select> : item.gender}
                    </td>
                    <td>
                      {editable && idEditable === item._id && item.role !== "owner" ? 
                      <select name="role" id="role" defaultValue={item.role} onChange={handleOnChange}>
                        <option value="owner">
                          Owner
                        </option>
                        <option value="admin">
                          Admin
                        </option>
                        <option value="user">
                          User
                        </option>
                      </select> : item.role}
                    </td>
                    <td>
                      {editable && idEditable === item._id ? 
                      <select name="status" id="status" defaultValue={item.status} onChange={handleOnChange}>
                        <option value="active">
                          Active
                        </option>
                        <option value="inactive">
                          Inactive
                        </option>
                      </select> : item.status}
                    </td>
                    <td>{editable && idEditable === item._id ? 
                      <select name='department' id='department' defaultValue={item.department} onChange={handleOnChange}>
                        <option value="it">
                          IT
                        </option>
                        <option value="finance">
                          Finance
                        </option>
                        <option value="marketing">
                          Marketing
                        </option>
                        <option value="sale">
                          Sale
                        </option>
                      </select>: item.department.toUpperCase()}</td>
                    <td> 
                      {editable && idEditable === item._id ? '': <MdDeleteForever className="delete_icon" onClick={ () => deleteHandler(item._id)}/>} 
                      {editable && idEditable !== item._id? '': <FaRegEdit className="edit_icon" onClick={ () => editHandler(item)}/>} 
                      {editable && idEditable === item._id && saveable && <FaRegSave className="save_icon" onClick={ () => updateHandler(item._id)}/>}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>

  )
}

export default User