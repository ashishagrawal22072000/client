import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactRouter } from '../utils/APIRoutes';
import axios from 'axios';
import { Contact } from '../components/contact';

export const Chat = () =>{
    const user = JSON.parse(localStorage.getItem('user-data'))
    const [currentUser, setCurrentUser] = useState(undefined);
    const [contact, setContact] = useState([]);
    const navigate = useNavigate()
    useEffect(() =>{
        if(!localStorage.getItem('user-data')) navigate('/login');
        setCurrentUser(user)
    },[])

    useEffect(() =>{
        getContacts()
    },[currentUser])
    
    const getContacts = () =>{
        axios.get(`${contactRouter}/${user.id}`).then((response) =>{
            setContact(response.data.data); 
        })
    }

    return (
        <>
        <div className="container mx-auto  flex justify-center items-center h-screen">
            <div className="w-9/12 h-9/12  grid grid-cols-2">
                <Contact contacts={contact} currentUser={currentUser} />
            </div>
        </div>
        </>
    )
}