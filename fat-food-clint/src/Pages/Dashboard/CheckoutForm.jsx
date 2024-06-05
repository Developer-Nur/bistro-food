import { CardCvcElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCards from "../../Hooks/useCards";
import useBaseUrl from "../../Hooks/useBaseUrl";
import useUserinfo from "../../Hooks/useUserinfo";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();
    const [paymentSuccess, setPaymentSuccess] = useState();
    const [clientSecret, setClientSecret] = useState();
    const axiosSecure = useBaseUrl()
    const [cart] = useCards()
    const { user } = useUserinfo()
    const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);
    console.log("the ultimate total amount is", cart);


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                // console.log("Payment details", res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
            .catch(error => console.log("payment error is", error.message))
    }, [axiosSecure, totalPrice])



    // handle payment submit
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
            console.log("Payment error");
        }
        else {
            setError("")
            console.log("the payment is", paymentMethod);

        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName || 'anonymous',
                    email: user.email || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log("Payment confirmation error",);
        }
        else {
            console.log("Payment Intent message", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setPaymentSuccess(paymentIntent.id)

                // now save the payment detail to DB with user info

                const paymentDetail = {
                    name: user.displayName,
                    email: user.email,
                    transsectionId: paymentIntent.id,
                    paidAmount: totalPrice,
                    date: new Date(), // must convert the date by UTC
                    cartId: cart.map(item => item._id),
                    status: "pending",
                    foodMenuId: cart.map(item => item.menuId),
                }
                console.log('DATA TO BE SAVED TO db', paymentDetail);
                try {
                    const res = await axiosSecure.post('/payments', paymentDetail);
                    console.log("Payment data saved to db:", res);
                } catch (error) {
                    console.log("Error saving payment data", error);
                }



            }
        }
    }

    return (
        <div>
            {
                paymentSuccess && <h2>Your payment id is: {paymentSuccess} </h2>
            }
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500 py-4">{error}</p>
            </form>
        </div>
    );
};



export default CheckoutForm;