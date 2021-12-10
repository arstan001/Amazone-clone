import '../styles/Product.css'
import { useStateValue } from '../StateProvider'
const Product = ({ id, title, image, price, rating }) => {

    const [{ basket }, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: 'ADD',
            item: {
                id,
                title,
                image,
                price,
                rating
            }
        })
    }
    return (
        <div className='product'>
            <div className='product_info'>
                <p className='product_title'>{title}</p>
                <p className='product_price'>
                    <small>$</small>
                    <b>{`${price}`}</b>
                </p>
                <div className='product_rating'>
                    {Array(rating).fill().map((_, i) => <p key={i}>🌟</p>)}
                </div>
            </div>
            <img className='product_img' src={image} alt='' />
            <button className='product_button' onClick={addToBasket}>Add to cart</button>
        </div>
    )
}
export default Product