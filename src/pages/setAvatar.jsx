import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";
import { Avatars } from './avatar';
import { toast } from 'react-toastify';
import { avatarRouter } from '../utils/APIRoutes';
export const SetAvatar = () =>{
    const user = JSON.parse(localStorage.getItem("user-data"))
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        if(user.isAvatarImageSet) navigate("/")
        getAvatar()
    }, [])
    const [selected, setSelected] = useState();
    console.log(selected, "dhkedh")
    const [avatar, setAvatar] = useState([]);
    const getAvatar = async () =>{
    
        const data = [];
        for(let i=0;i<3;i++){
            console.log(Math.round(Math.random()))
            data.push(Avatars[Math.round(Math.random() * 10)])
        }
        setAvatar(data)

        // const data = [];
        // for(let i=0;i<3;i++){
        //     const image = await axios.get(`https://api.multiavatar.com/WCYbBr75dTItm0/${Math.round(Math.random() * 1000)}`)
        //     const buffer = new Buffer(image.data)
        //     data.push(buffer.toString("base64"));
        // }
        // setAvatar(data) 
    }

    const setProfileImage = () =>{
        if(selected == undefined) toast.error("Please Select An Avatar")
        else{
            setLoading(true);
            axios.patch(`${avatarRouter}/${user.id}`, {
                avatarImage : avatar[selected]
            }).then((response) =>{
                setLoading(false);
                user.isAvatarImageSet = response.data.data.isAvatarImageSet;
                user.avatarImage = response.data.data.avatarImage;
                localStorage.setItem("user-data", JSON.stringify(user));
                toast.success(response.data.message);
                navigate("/")
            }).catch((error) =>{
                setLoading(false)
                toast.error(error.response.data.message);
            })
        }
    }
    return (
        <>
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="w-1/2">
               <h1 className="text-center text-2xl text-white font-bold my-5">Pick An Avatar As Your Profile Picture</h1>
               <div className="flex justify-around">
               {avatar.map((ele, i) =>{
                return (
                    <>
                    <div className={`p-2 ${selected == i ? 'selected_avatar' : ''}`}>
                    <img onClick={() => setSelected(i)} src={`data:image/svg+xml;base64,${ele}`} alt='avatar' height={80} width={80} />
                    </div>
                    </>
                )
               })}
               </div>
               <div className='flex justify-center items-center mt-5'>
               <button className='font-bold text-white bg-indigo-600 p-4 mt-5 rounded-md w-1/2' onClick={setProfileImage}>
                {loading ? <div className="loader mx-auto"></div> : 'Set as Profile Picture'}
                </button> 
               </div>
            </div>
        </div>
        </>
    )
}


