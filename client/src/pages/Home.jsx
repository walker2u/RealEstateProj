import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

function Home() {

    SwiperCore.use([Navigation]);
    const [offerListing, setOfferListing] = useState([]);
    const [saleListing, setSaleListing] = useState([]);
    const [rentListing, setRentListing] = useState([]);
    useEffect(() => {
        const fetchOfferListing = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/listing/getsearchlisting?offer=true&limit=4');
                const data = await res.json();
                setOfferListing(data);
                fetchRentListing();
            } catch (error) {
                console.log(error);
            }
        }
        const fetchRentListing = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/listing/getsearchlisting?type=rent&limit=4');
                const data = await res.json();
                setRentListing(data);
                fetchSaleListing();
            } catch (error) {
                console.log(error);
            }
        }
        const fetchSaleListing = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/listing/getsearchlisting?type=sale&limit=4');
                const data = await res.json();
                setSaleListing(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOfferListing();
    }, []);
    return (
        <div>
            {/* topText */}
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span>
                    <br />place with ease.</h1>
                <div className='text-gray-400 text-xs sm:text-sm'>
                    IndianState is the best place to find your next perfect place to live.<br />
                    We have a wide range of properties for you to choose from.
                </div>
                <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
                    Let's get started...
                </Link>
            </div>



            {/* swipper */}
            <Swiper navigation>
                {offerListing && offerListing.length > 0 && offerListing.map((listing) => (
                    <SwiperSlide>
                        <div key={listing._id} className='h-[500px]' style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}></div>
                    </SwiperSlide>
                ))};
            </Swiper>


            {/* listing results */}
            <div className='flex flex-col gap-8 my-10 mx-auto p-3 max-w-6xl'>
                {
                    offerListing && offerListing.length > 0 && (
                        <div className='text-slate-700 font-bold text-lg'>
                            <div className='my-3'>
                                <h2 className='font-semibold text-2xl text-slate-600'>Recent Offers</h2>
                                <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'>
                                    Show more offers
                                </Link>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    offerListing && offerListing.map((listing) => (
                                        <ListingItem key={listing._id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    rentListing && rentListing.length > 0 && (
                        <div className='text-slate-700 font-bold text-lg'>
                            <div className='my-3'>
                                <h2 className='font-semibold text-2xl text-slate-600'>Recent Places for Rent</h2>
                                <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>
                                    Show more places for Rent
                                </Link>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    rentListing && rentListing.map((listing) => (
                                        <ListingItem key={listing._id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    saleListing && saleListing.length > 0 && (
                        <div className='text-slate-700 font-bold text-lg'>
                            <div className='my-3'>
                                <h2 className='font-semibold text-2xl text-slate-600'>Recent Places for Sale</h2>
                                <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'>
                                    Show more offers
                                </Link>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    saleListing && saleListing.map((listing) => (
                                        <ListingItem key={listing._id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Home