import '../styles/Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer';
import { useNavigate } from 'react-router';
const Subtotal = () => {
    const [{ basket }, reducer] = useStateValue();
    const navigate = useNavigate();
    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className='gift'>
                            <input type='checkbox' />
                            This order containts a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType='text'
                thousandSeparator
                prefix='$' />
            <button onClick={() => navigate('/payment')}>Proceed  to Checkout</button>
        </div>
    )
}

export default Subtotal