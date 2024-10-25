import paymentSessions from "../models/paymentSessions.js";
import { stripe } from "../constants/keys.js";

export default async function getPaymentDetails(req, res) {

    const sessionId = req.params.sessionId;

    try {
        const isPaymentDetailsExist = await paymentSessions.findOne({ sessionId })

        if (!isPaymentDetailsExist) return res.status(404).json({ success: false, message: 'details not found' })

        const paymentIntentDetails = await stripe.paymentIntents.retrieve(sessionId);

        delete isPaymentDetailsExist?.amount
        delete isPaymentDetailsExist?.currency

        const paymentDetails = {
            amount: paymentIntentDetails.amount,
            currency: paymentIntentDetails.currency,
            customerId: paymentIntentDetails.customer,
            isPaid: !!paymentIntentDetails.amount_received,
            // status: paymentIntentDetails.status,
            productDetails: paymentIntentDetails.metadata,
            clientSecret: paymentIntentDetails.client_secret,
            paymentType: paymentIntentDetails.payment_method_types,
            ...isPaymentDetailsExist._doc
        };


        res.status(200).json({ success: true, status: 200, data: paymentDetails })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}