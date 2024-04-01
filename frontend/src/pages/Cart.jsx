import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Navbar from '../components/NavBar';
import { removeFromCart } from '../features/carts/cartsSlice';

const CartPage = () => {
  const cartsState = useSelector((state) => state.carts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Sample cart data

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {cartsState.length > 0 ? (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">
            Shopping Cart
          </h1>
          <div className="bg-white shadow-sm rounded-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {' '}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartsState.carts.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={item.image} alt={item.title} className="w-10" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer ">
                      <MdDelete
                        data-tooltip-id="remove-cart"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h3>Your Cart is Empty</h3>
        </div>
      )}
      <ReactTooltip
        id="remove-cart"
        place="bottom"
        content="Remove from Cart"
      />
    </div>
  );
};

export default CartPage;
