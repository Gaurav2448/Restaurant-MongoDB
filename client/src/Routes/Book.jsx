import React, { useState } from 'react';
import { SubHeading } from '../components';
import { images } from '../constants';
import './Book.css';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Book = () => {
  const [user, setUser] = useState({
    uname: "",
    phone: "",
    email: "",
    date: "",
    time: "", 
  });

  const navigate=useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone=(phone)=>{
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

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
    if( !isValidEmail(user.email) ){
      toast.error('Please enter a valid email address');
      return;
    }

    if(!isValidPhone(user.phone) ){
      toast.error('Please enter a valid phone number');
      return;
    }

    if(!isValidName(user.uname) ){
      toast.error('Please enter a valid name');
      return;
    }
    if(user.time==''){
      toast.error('Please select time');
      return;
    }
    console.log(user);

    try {
      const response = await fetch(`http://localhost:3000/api/auth/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),

            });

            if (response.ok) {
              const res_data=await response.json();
              console.log("response from server",res_data);
              toast.success("Booking Succesful");
              setUser({
                uname: "",
              phone: "",
              email: "",
              date: "",
              time: "",
              })
              navigate("/view");
          }      
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <div className="app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Booking</h1>
        <div className="app__wrapper-content">
          <p className="p__opensans">Lane Ends Bungalow, Whatcroft Hall Lane, Rudheath, CW9 75G</p>
          <p className="p__cormorant" style={{ color: '#DCCA87', margin: '2rem 0' }}>Opening Hours</p>
          <p className="p__opensans">Mon - Fri: 10:00 am - 02:00 am</p>
          <p className="p__opensans">Sat - Sun: 10:00 am - 03:00 am</p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <table>
            <tbody>
              <tr>
                <td><p className="p__cormorant tdcol" style={{ color: '#DCCA87' }}>Name :</p></td>
                <td><input type="text" className='input-box tdcol' name='uname' required autoComplete="off" value={user.uname} onChange={handleInput} /></td>
              </tr>
              <tr>
                <td><p className="p__cormorant tdcol" style={{ color: '#DCCA87' }}>Phone No. :</p></td>
                <td><input type="text" className='input-box tdcol' name='phone' required autoComplete="off" value={user.phone} onChange={handleInput} /></td>
              </tr>
              <tr>
                <td><p className="p__cormorant tdcol" style={{ color: '#DCCA87' }}>Email Id :</p></td>
                <td><input type="email" className='input-box tdcol' name='email'  required autoComplete="off" value={user.email} onChange={handleInput} /></td>
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
            <button type="submit" className="custom__button btn" style={{ marginTop: '2rem' }}>Appointment</button>
          </form>
        </div>
      </div>
      <div className="app__wrapper_img">
        <img src={images.findus} alt="finus_img" />
      </div>
    </div>
  );
};

export default Book;
