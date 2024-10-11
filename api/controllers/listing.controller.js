import Listing from '../models/listing.model.js'
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const newListing = await Listing.create(req.body);
        res.status(200).json(newListing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    console.log(listing);

    if (!listing) return next(404, "Listing not Found!");
    if (req.user.id !== listing.userRef) return next(401, "You are not authenticated!");
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(201).json("Listing Deleted Sucessfully!");
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(404, "Listing Not found!");
    if (listing.userRef !== req.user.id) return next(401, "You can only update your Listing, No Hacking!");
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return next(errorHandler(404, 'No Listing Found!'));
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

//This api is for search
export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [true, false] }
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [true, false] }
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [true, false] }
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] }
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const result = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type
        }).sort({ [sort]: order }).limit(limit).skip(startIndex);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}