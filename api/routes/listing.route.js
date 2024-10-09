import express from 'express';
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router();

router.post('/createListing', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/getlisting/:id', verifyUser, getListing);
router.get('/getsearchlisting', getListings);

export default router;