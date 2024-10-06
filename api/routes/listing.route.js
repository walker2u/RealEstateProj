import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router();

router.post('/createListing', verifyUser, createListing);
router.delete('/delete/:id', verifyUser, deleteListing);

export default router;