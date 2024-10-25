import { sendEmail } from '../utils/RetriveEmail.js';
import { stripe } from '../constants/keys.js';
import PaymentSession from '../models/paymentSessions.js';


export default async function generatePayment(req, res) {
    const { title, description, amount, image, clientName, clientNum, clientEmail } = req.body;

    if (!title || !description || !amount || !image || !clientName || !clientNum || !clientEmail) {
        res.status(400).json({
            success: false,
            message: 'All fields are required'
        })
    }

    try {
        const customer = await stripe.customers.create({
            name: clientName,
            email: clientEmail,
            phone: clientNum,
        });


        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card', 'cashapp'],
            customer: customer.id,
            metadata: { product_title: title, product_description: description, product_image: image },
        });

        const sessionId = paymentIntent.id;

        const newSession = new PaymentSession({
            sessionId: sessionId,
            status: 'pending',
            amount: amount,
            // productDetails: { title, description, image },
            clientDetails: { clientName, clientNum, clientEmail },
        });

        const savedSession = await newSession.save()

        // sendEmail({ customerEmail: clientEmail, customerName: clientName, message: description })
        sendEmail({ customerEmail: clientEmail, customerName: clientName, message: description })
            .then(() => {
                console.log("Email sent successfully");
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
            });

        let response = {}

        response.emailSent = true
        response.data = savedSession

        return res.status(200).json({ success: true, status: 200, data: response });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};