import { stripe } from "../constants/keys.js";
import paymentSessions from "../models/paymentSessions.js";

export default async function createPayment(req, res) {

    const sessionId = req.params.sessionId;
    try {

        const paymentIntentDetails = await stripe.paymentIntents.retrieve(sessionId);
        // if (paymentIntentDetails.amount_received) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Payment not recieved yet!"
        //     })
        // }

        const isPaymentDetailsExist = await paymentSessions.findOne({ sessionId })

        if (!isPaymentDetailsExist) return res.status(404).json({ success: false, message: 'details not found' })


        const updatedSession = await paymentSessions.findOneAndUpdate(
            { sessionId: isPaymentDetailsExist.sessionId },
            {
                status: 'completed',
                paymentDetails: {
                    paymentId: paymentIntentDetails.id,
                    amount: paymentIntentDetails.amount,
                    currency: paymentIntentDetails.currency,
                    paymentStatus: paymentIntentDetails.status,
                },
            },
            { new: true }
        );

        res.status(200).json({ success: true, status: 200, data: updatedSession })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}