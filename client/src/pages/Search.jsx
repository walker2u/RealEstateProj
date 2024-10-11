import React from 'react'

function Search() {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold' htmlFor="">Search Term : </label>
                        <input
                            type="text"
                            id='searchTerm'
                            placeholder='search...'
                            className='w-full p-3 border rounded-lg'
                        />
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <label className='font-semibold'>Type : </label>
                        <div>
                            <input className='w-5' type="checkbox" id="all" />
                            <span>Rent & Sale</span>
                        </div>
                        <div>
                            <input className='w-5' type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div>
                            <input className='w-5' type="checkbox" id="sale" />
                            <span>Sale</span>
                        </div>
                        <div>
                            <input className='w-5' type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 items-center'>
                        <label className='font-semibold'>Amenities : </label>
                        <div>
                            <input className='w-5' type="checkbox" id="parking" />
                            <span>Parking</span>
                        </div>
                        <div>
                            <input className='w-5' type="checkbox" id="furnished" />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort : </label>
                        <select className='border rounded-lg p-3' id="sort_order">
                            <option value="">Price High to Low</option>
                            <option value="">Price Low to High</option>
                            <option value="">Latest</option>
                            <option value="">Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>SEARCH</button>
                </form>
            </div>
            <div>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results</h1>
            </div>
        </div>
    )
}

export default Search