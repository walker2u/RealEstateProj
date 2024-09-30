import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js';

function Profile() {
    const { currentUser } = useSelector(state => state.user);
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState(null);
    console.log(formData);


    useEffect(() => {
        if (file) {
            handleFileupload(file);
        }
    }, [file]);

    const handleFileupload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPerc(Math.round(progress));
        },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then
                    ((downloadUrl) => {
                        setFormData({ ...formData, avatar: downloadUrl });
                    })
            }
        )
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input onChange={(e) => setFile(e.target.files[0])} hidden type="file" ref={fileRef} accept='image/*' />
                <img onClick={() => fileRef.current.click()} src={formData?.avatar || currentUser.avatar} alt="Profile Image" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                <p className='self-center text-sm'>
                    {
                        fileUploadError ? <span className='text-red-700'>Error Uploading File(image must be less than 2 mb)!!</span>
                            : (
                                uploadPerc > 0 && uploadPerc < 100 ? <span className='text-slate-700'>{`Uploading ${uploadPerc}%`}</span> :
                                    (uploadPerc === 100 ? <span className='text-green-700'>Image Uploaded!</span> : "")
                            )
                    }
                </p>
                <input id='username' type="text" placeholder='username' className='border p-3 rounded-lg' />
                <input id='email' type="email" placeholder='email' className='border p-3 rounded-lg' />
                <input id='password' type="text" placeholder='password' className='border p-3 rounded-lg' />
                <button className='bg-slate-700 text-white rounded-lg p-3 uppercase  hover:opacity-95 disabled:opacity-80'>Update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile