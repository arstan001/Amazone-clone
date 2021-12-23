import '../styles/Orders.css'
import { useStateValue } from '../StateProvider';
import { useEffect, useState } from 'react';
import { getDocs, query, collection } from "firebase/firestore";
import { db } from '../firebase';
import Order from './Order';

const Orders = () => {
    const [{ basket, user }, reducer] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const q = query(collection(db, `users/${user?.uid}/orders`));
            const querySnapshot = await getDocs(q);
            let temp = [];
            querySnapshot.forEach((doc) => temp.push({
                id: doc.id,
                data: doc.data()
            }));
            setOrders(temp)
        }
        if (user) {
            getOrders();
        }
        else {
            setOrders([]);
        }
    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders_order'>
                {orders?.map(order => (
                    <Order key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders