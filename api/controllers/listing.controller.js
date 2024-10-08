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