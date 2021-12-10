import '../styles/Checkout.css'
import BasketItem from './BasketItem'
import Subtotal from './Subtotal'
import { useStateValue } from '../StateProvider';
const Checkout = () => {
    const [{ basket, user }, reducer] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img className='checkout_ad'
                    src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                    alt='' />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className='title'>
                        You shopping Basket
                    </h2>
                    {basket?.map((item, index) =>
                        <BasketItem
                            key={`${item.id}+${index}`}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image} />
                    )}
                </div>
            </div>
            <div className='right'>
                <Subtotal />
            </div>
        </div>
    )
}
export default Checkout