import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Contact({ listing }) {
    const [message, setMessage] = useState("");
    const [landlord, setLandlord] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/${listing.userRef}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [listing.userRef]);

    const onChange = (e) => {
        setMessage(e.target.value);
    }
    return (
        <>
            {
                landlord && (
                    <div className='flex flex-col gap-2'>
                        <p>Contact <span className='font-semibold'>{landlord.username}</span> for
                            <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                        <textarea name="message" id="message" rows={2} value={message} onChange={onChange} placeholder='Enter the Message here...'
                            className='w-full border p-3 rounded-lg'></textarea>
                        <Link className='bg-slate-700 text-white p-3 w-full text-center rounded-lg' to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                            Send Message
                        </Link>
                    </div>
                )
            }
        </>)
}

export default Contact