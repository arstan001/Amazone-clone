import '../styles/Home.css'
import { useStateValue } from '../StateProvider';
import Product from './Product'
const Home = () => {
    const [{ products, search }] = useStateValue();
    return (
        <div className='home'>
            <div className='home_container'>
                <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt='' />
                <div className='home_row'>
                    {search.length !== 0 ? search.map(item =>
                        <Product
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            rating={item.rating}
                            image={item.image} />
                    ) : products.map(item =>
                        <Product
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            rating={item.rating}
                            image={item.image} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default Home