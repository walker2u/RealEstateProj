import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signInStart, signOutFailure, signOutStart, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice.js'

function Profile() {
    const { currentUser, loading, error } = useSelector(state => state.user);
    const [file, setFile] = useState(null);
    const fileRef = useRef(null);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [updateStatus, setUpdateStatus] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        if (file) {
            handleFileupload(file);
        }
    }, [file]);

    const handleFileupload = (file) => {
        setUpdateStatus(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateStart());
            const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success == false) {
                dispatch(updateFailure(data.message));
                return;
            }
            dispatch(updateSuccess(data));
            setUpdateStatus(true);

        } catch (error) {
            dispatch(updateFailure(error.message));
        }
    }

    const handleDeleteUser = async () => {
        try {
            deleteUserStart();
            const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }

    const handleSignOut = async () => {

        try {
            dispatch(signOutStart());
            const res = await fetch('http://localhost:3000/api/user/signout', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await res.json()

            if (data.success === false) {
                dispatch(signOutFailure(data.message));
                return;
            }
            dispatch(signOutSuccess(data));

        } catch (err) {
            dispatch(signOutFailure(error.message));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                <input onChange={handleChange} id='username' type="text" placeholder='username' className='border p-3 rounded-lg' defaultValue={currentUser.username} />
                <input onChange={handleChange} id='email' type="email" placeholder='email' className='border p-3 rounded-lg' defaultValue={currentUser.email} />
                <input onChange={handleChange} id='password' type="password" placeholder='password' className='border p-3 rounded-lg' />
                <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase  hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading' : 'Update'}</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign Out</span>
            </div>
            <p className='text-red-900 text-center'>{error && error}</p>
            <p className='text-green-700 text-center'>{updateStatus && 'User Updated SuccesFully!'}</p>
        </div>
    )
}

export default Profile