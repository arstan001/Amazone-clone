import '../styles/Home.css'
import Product from './Product'
const Home = () => {
    return (
        <div className='home'>
            <div className='home_container'>
                <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt='' />
                <div className='home_row'>
                    <Product
                        id='1312312'
                        title='The lean startup'
                        price={129.99}
                        rating={5}
                        image='https://images-na.ssl-images-amazon.com/images/I/61KK+AtunNL.jpg' />
                    <Product
                        id='22222'
                        title='All-new Echo Dot (4th generation) International Version | Smart speaker with Alexa | Charcoal'
                        price={49.99}
                        rating={4}
                        image='https://i.expansys.net/i/b/b330609-1.jpg' />
                    <Product
                        id='6666'
                        title='Got2b Ultra Glued Invincible Styling Hair Gel, 6 Ounce (Pack of 3)'
                        price={12.99}
                        rating={2}
                        image='https://m.media-amazon.com/images/I/51ezyrZMKcL.jpg' />
                </div>
                <div className='home_row'>
                    <Product
                        id='3333'
                        title='Samsung SSD T7 Portable External Solid State Drive 1TB, Up to 1050MB/s, USB 3.2 Gen 2, Reliable Storage for Gaming, Students, Professionals, MU-PC1T0T/AM, Gray'
                        price={29.99}
                        rating={5}
                        image='https://m.media-amazon.com/images/I/91YfRIy7kYL._AC_SX425_.jpg' />
                    <Product
                        id='4444'
                        title='ORICO 1T Ultra-Mini Portable SSD - Read/Write Up to 540MB/s - USB3.1 GEN2 External Solid State Drive for PC Laptop Mac and More-Pink'
                        price={149.99}
                        rating={5}
                        image='https://m.media-amazon.com/images/I/51OmDmks5ML._AC_SX425_.jpg' />
                    <Product
                        id='5555'
                        title='TJOY 100ft Smart Led Strip Lights for Bedroom, Alexa Led Light Strip,5050 RGB Color Changing Music Sync Led Lights Strip with App Remote,Multi-Color Wireless Led Lights for Bedroom (APP+Remote+Voice)'
                        price={33.99}
                        rating={5}
                        image='https://m.media-amazon.com/images/I/81mLzAeSdoL._AC_SL1500_.jpg' />
                </div>
                <div className='home_row'>
                </div>
            </div>
        </div>
    )
}
export default Home