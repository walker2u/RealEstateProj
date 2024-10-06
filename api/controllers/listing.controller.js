import Listing from '../models/listing.model.js'

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