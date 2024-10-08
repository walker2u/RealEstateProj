import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const listingId = params.listingId;
                const res = await fetch(`http://localhost:3000/api/listing/getlisting/${listingId}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success === false) {
                    setLoading(false);
                    setError(true);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }

        }
        fetchListing();
    }, []);

    return <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Loading...</p>}

        {listing && !error && !loading && (
            <>
                <Swiper navigation>
                    {
                        listing.imageUrls.map((url, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>h</div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </>
        )}
    </main>
}

export default Listing