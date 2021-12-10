import '../styles/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
const Header = () => {
    const [{ basket, user }, reducer] = useStateValue();
    const handleAuth = () => {
        auth.signOut();
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img className='header_logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazon' />
            </Link>

            <div className='header_search'>
                <input className='header_input' type='text' />
                <SearchIcon className='search_icon' />
            </div>
            <div className='header_nav'>
                <Link to={!user && '/login'}>
                    <div className='header_option' onClick={handleAuth}>
                        <span className='optionOne'>Hello {user ? user.email : 'guest'}</span>
                        <span className='optionTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <Link to='/orders'>
                    <div className='header_option'>
                        <span className='optionOne'>Returns</span>
                        <span className='optionTwo'>& Orders</span>
                    </div>
                </Link>
                <div className='header_option'>
                    <span className='optionOne'>Your</span>
                    <span className='optionTwo'>Prime</span>
                </div>
                <Link to='/checkout'>
                    <div className='header_basket'>
                        <ShoppingBasketIcon />
                        <span className='optionTwo header_basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default Header