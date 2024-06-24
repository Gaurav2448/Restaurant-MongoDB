import React, { useEffect, useState } from "react";
import { SubHeading } from '../components';
import { Link,Outlet } from "react-router-dom";
import { images } from '../constants';
import Home from "./Home";
import './View.css'

const View = () => {
    const [users, setUsers] = useState([]);

    const getBookings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/view`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            console.log("Users data:", data);
            setUsers(data);
        } catch (error) {
            console.log("Error fetching data:", error.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/view/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(`user deleted: ${data}`);
            if(response.ok){
                getBookings();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookings();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    return (
        <div className="app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Booking</h1>
        
        <div>
                        <div>
                            <table className="view__table" >
                                <thead>
                                    <tr>
                                        <th><p className="p__cormorant" style={{ color: '#DCCA87', fontWeight: '900' }}>Name</p></th>
                                        <th><p className="p__cormorant " style={{ color: '#DCCA87', fontWeight: '900', textAlign: 'center'  }}>Date</p></th>
                                        <th><p className="p__cormorant " style={{ color: '#DCCA87', fontWeight: '900', textAlign: 'center' }}>Time</p></th>
                                        <th><p className="p__cormorant " style={{ color: '#DCCA87', fontWeight: '900', textAlign: 'center' }}>Update</p></th>
                                        <th><p className="p__cormorant " style={{ color: '#DCCA87', fontWeight: '900', textAlign: 'center'  }}>Delete</p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {users.map((currUser, index) => (
                                        <tr key={index}>
                                            <td><p style={{ color: 'var(--color-golden)' }}>{currUser.uname}</p></td>
                                            <td><p style={{ color: '#fff' }}>{formatDate(currUser.date)}</p></td>
                                            <td><p style={{ color: '#fff', textAlign: 'center' }}>{currUser.time}</p></td>
                                            <td><Link to={`/view/${currUser._id}/edit`}><button className="view__button" >Edit</button></Link></td>
                                            <td><button className="view__button" onClick={() => deleteUser(currUser._id)}>Delete</button></td>
                                            <Outlet/>
                                        </tr>
                                    ))}
                                
                                </tbody>
                            </table>
                        </div>
                    </div>

        
      </div>
      <div className="app_wrapper_img">
        <img src={images.findus} alt="finus_img" />
      </div>
    </div>
    );
};

export default View;

