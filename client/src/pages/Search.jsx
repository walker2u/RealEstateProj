import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

function Search() {

    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListing = async () => {
            setLoading(true);
            const searchString = urlParams.toString();
            const res = await fetch(`http://localhost:3000/api/listing/getsearchlisting?${searchString}`);
            const data = await res.json();
            setListing(data);
            setLoading(false);
            if (data.length > 8) setShowMore(true);
        };
        fetchListing();

    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
        ) {
            setSideBarData({ ...sideBarData, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSideBarData({ ...sideBarData, searchTerm: e.target.value });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setSideBarData({
                ...sideBarData,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSideBarData({ ...sideBarData, sort, order });
        }
    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const showMoreClick = async () => {
        const urlParams = new URLSearchParams(location.search);
        const numOfListings = listing.length;
        const startIndex = numOfListings;
        urlParams.set('startIndex', startIndex);
        const searchString = urlParams.toString();
        const res = await fetch(`http://localhost:3000/api/listing/getsearchlisting?${searchString}`);
        const data = await res.json();
        if (data.length < 9) setShowMore(false);
        setListing([...listing, ...data]);
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold' htmlFor="">Search Term : </label>
                        <input
                            type="text"
                            id='searchTerm'
                            placeholder='search...'
                            className='w-full p-3 border rounded-lg'
                            value={sideBarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <label className='font-semibold'>Type : </label>
                        <div>
                            <input onChange={handleChange} checked={sideBarData.type === 'all'} className='w-5' type="checkbox" id="all" />
                            <span>Rent & Sale</span>
                        </div>
                        <div>
                            <input onChange={handleChange} checked={sideBarData.type === 'rent'} className='w-5' type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div>
                            <input onChange={handleChange} checked={sideBarData.type === 'sale'} className='w-5' type="checkbox" id="sale" />
                            <span>Sale</span>
                        </div>
                        <div>
                            <input onChange={handleChange} checked={sideBarData.offer} className='w-5' type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <label className='font-semibold'>Amenities : </label>
                        <div>
                            <input onChange={handleChange} checked={sideBarData.parking} className='w-5' type="checkbox" id="parking" />
                            <span>Parking</span>
                        </div>
                        <div>
                            <input onChange={handleChange} checked={sideBarData.furnished} className='w-5' type="checkbox" id="furnished" />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort : </label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            className='border rounded-lg p-3' id="sort_order">
                            <option value="regularPrice_desc">Price High to Low</option>
                            <option value="regularPrice_asc">Price Low to High</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>SEARCH</button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && listing.length === 0 && (
                        <p className='text-xl text-slate-700'>No Listing Found!</p>
                    )}
                    {loading && (<p className='text-xl text-slate-700 text-center w-full'>Loading...</p>)}
                    {!loading && listing && listing.map((list) => (
                        <ListingItem key={list._id} listing={list} />
                    ))}
                </div>
                {
                    showMore &&
                    (<button onClick={showMoreClick} className='text-green-700 hover:underline p-7'>show more</button>)
                }
            </div>
        </div>
    )
}

export default Search