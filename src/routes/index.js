import { Router } from "express";
import generatePayment from "../payment/generatePayment.js";
import getPaymentDetails from "../payment/getPaymentDetails.js";
import createPayment from "../payment/createPayment.js";

const router = Router();

router.post("/generate-payment", generatePayment);
router.get('/get-payment-details/:sessionId', getPaymentDetails);
router.post('/create-payment/:sessionId', createPayment);


// router.post('/payment-success', );

export default router;
