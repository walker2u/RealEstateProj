import express from 'express';
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router();

router.post('/createListing', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);
router.post('/update/:id', verifyUser, updateListing);
router.get('/getlisting/:id', verifyUser, getListing);

export default router;