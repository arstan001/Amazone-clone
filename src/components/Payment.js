import '../styles/Payment.css'
import { useStateValue } from '../StateProvider'
import BasketItem from './BasketItem'
import { Link, useNavigate } from 'react-router-dom';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from 'axios';
import { db } from '../firebase';
import { addDoc, collection, doc } from '@firebase/firestore';
const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios.post(`${process.env.REACT_APP_FIREBASE_API}payments/create?total=${getBasketTotal(basket) * 100}`);
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const paylaod = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(async ({ paymentIntent }) => {
            await addDoc(collection(db, `users/${user?.uid}/orders`), {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY'
            });
            navigate('/orders', { replace: true });
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : null);
    }
    return (
        <div className='payment'>
            <div className='payment_container'>

                <h1>Checkout (<Link to='checkout'>{basket?.length} items</Link>)</h1>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map((item, index) =>
                            <BasketItem
                                key={`${item.id}+${index}`}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image} />)}
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment_priceCont'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType='text'
                                    thousandSeparator
                                    prefix='$' />
                                <button disabled={processing || disabled || succeeded}><span>{processing ? 'Processing ...' : 'Buy Now'}</span></button>
                            </div>
                            {error && <div><p>{error}</p></div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment