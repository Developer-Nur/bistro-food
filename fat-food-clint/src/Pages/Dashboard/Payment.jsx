import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../Compo/SectionTitle'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
const Payment = () => {
    return (
        <div className='px-10'>
            <SectionTitle title='Pay For your food' text='Teka is only real'></SectionTitle>

            <h2>Taka de</h2>

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;