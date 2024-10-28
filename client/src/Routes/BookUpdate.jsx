import { useEffect, useState } from 'react';
import { SubHeading } from '../components';
import { images } from '../constants';
import './Book.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
export const BookUpdate=()=>{
    const [user, setUser] = useState({
        uname: "",
        date: "",
        time: "", 
      });

      const navigate=useNavigate();

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
      
        return `${year}-${month}-${day}`;
      };
    
      const params=useParams();

      const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/view/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(`user single  data: ${data.uname}`);
            setUser({
                uname: data.uname,
                date:formatDate(data.date),
                time:data.time,
            });
        } catch (error) {
            console.log(error);
        }
    }


      useEffect(()=>{
        getSingleUserData();
      },[]);

     
    
      const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        setUser({
          ...user,
          [name]: value,
        });
      };
    
      
    
      const isValidName = (name) => {
        const nameRegex = /^[a-zA-Z\s-]+$/;
        return nameRegex.test(name);
      };
    
    
      const handleDateChange = (event) => {
        const { value } = event.target;
        const currentDate = new Date();
        const selectedDate = new Date(value);
    
        if (selectedDate > currentDate) {
          setUser({
            ...user,
            date: value, // Update the date state
          });
        } else {
          toast.error('Please select a future date.');
        }
      };
    
      const handleTimeChange = (e) => {
        setUser({
          ...user,
          time: e.target.value, // Update the time state
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isValidName(user.uname) ){
          toast.error('Please enter a valid name');
          return;
        }
        if(user.time==''){
          toast.error('Please select time');
          return;
        }
        console.log("user update",user);
    
        try {
          const response = await fetch(`http://localhost:3000/api/auth/view/update/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
    
                }
            );
            if(response.ok){
                toast.success("Updated Successfully");
                navigate("/view");
            }
            else{
                toast.error("Not Updated");
            }
        } catch (error) {
          console.log(error);
        }
      
      };
    
    return(
        <div className="app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Update Booking</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <table>
            <tbody>
              <tr>
                <td><p className="p__cormorant tdcol" style={{ color: '#DCCA87' }}>Name :</p></td>
                <td><input type="text" className='input-box tdcol' name='uname' required autoComplete="off" value={user.uname} onChange={handleInput} /></td>
              </tr>
              
              <tr>
                <td><p className="p__cormorant tdcol" style={{ color: '#DCCA87' }}>Date :</p></td>
                <td><input
                  type="date"
                  id="dateInput"
                  className='input-box tdcol'
                  name='date' placeholder='date' required autoComplete="off" value={user.date} onChange={handleDateChange}
                /></td>
              </tr>
              <tr>
                <td><p className="p__cormorant tdcol" style={{ color: '#DCCA87' }}>Time :</p></td>
                <td>
                  <select
                    className='input-box tdcol'
                    value={user.time} // Bind the value to the state
                    onChange={handleTimeChange} // Handle time selection
                  >
                    <option value="">---Default---</option>
                    <option value="18:00 - 19:00">18:00 - 19:00</option>
                    <option value="19:00 - 20:00">19:00 - 20:00</option>
                    <option value="20:00 - 21:00">20:00 - 21:00</option>
                    <option value="21:00 - 22:00">21:00 - 22:00</option>
                    <option value="22:00 - 23:00">22:00 - 23:00</option>
                  </select>
                </td>
              </tr>
              </tbody>
            </table>
            <button type="submit" className="custom__button btn" style={{ marginTop: '2rem' }}>Update</button>
          </form>
        </div>
      </div>
      <div className="app__wrapper_img">
        <img src={images.findus} alt="finus_img" />
      </div>
    </div>
        
    );
}


