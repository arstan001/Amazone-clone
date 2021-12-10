import '../styles/BasketItem.css'
import { useStateValue } from '../StateProvider'
const BasketItem = ({ title, price, id, rating, image, hide }) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE',
            item: {
                id
            }
        })
    }
    return (
        <div className='basket_product'>
            <img className='basket_img' src={image} alt='' />
            <div className='basket_info'>
                <p className='basket_title'>{title}</p>
                <p className='product_price'>
                    <small>$</small>
                    <b>{`${price}`}</b>
                </p>
                <div className='product_rating'>
                    {Array(rating).fill().map((_, i) => <p key={i}>🌟</p>)}
                </div>
                {!hide && <button className='product_button' onClick={removeFromBasket}>Remove from cart</button>}
            </div>
        </div>
    )
}
export default BasketItem