import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/NavBar';

const Orders = () => {
  const authState = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(orders, isLoading);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', `Bearer ${authState.accessToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://crm-backend-plau.onrender.com/orders', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.status === 'success') {
          setOrders(data.data);
          setIsLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Your Orders</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.product.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.quantity}
                  </td>
                </tr>
              );
            })}

            {/* Add more rows for additional products */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
