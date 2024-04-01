import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { ThreeDots } from 'react-loader-spinner';

const Checkout = () => {
  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = useState('');
  const cartsState = useSelector((state) => state.carts);
  const authState = useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState(cartsState.total); // Initial total amount
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const applyVoucher = () => {
    // Simulating voucher validation and discount
    if (voucherCode === 'SAVE10') {
      if (!voucherApplied) {
        setTotalAmount(Number(totalAmount * 0.9).toFixed(2)); // Applying 10% discount
        setVoucherApplied(true);
      } else {
        toast('Voucher Applied Already', { position: 'top-center' });
      }
    } else {
      toast('Invalid voucher code. Please try again.', {
        position: 'top-center',
      });
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    const payload = [];
    for (let cart of cartsState.carts) {
      const item = {
        price: cart.price,
        quantity: cart.quantity,
        product: cart.id,
        buyer: authState.userData._id,
      };
      payload.push(item);
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow',
    };

    fetch('https://crm-backend-plau.onrender.com/orders', requestOptions)
      .then((response) => {
        setLoading(false);
        const data = response.json();
        return data;
      })
      .then((result) => {
        console.log(result);
        if (result.status === 'success') {
          toast('Payment Successful');
          navigate('/rating');
        } else {
          toast(result.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('THIS IS AN ERROR', error);
        return console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="mb-4">
              <label
                htmlFor="voucher"
                className="block text-sm font-medium text-gray-700"
              >
                Voucher code
              </label>
              <input
                type="text"
                id="voucher"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter voucher code for 10% off"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>
            <button
              className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={applyVoucher}
            >
              Apply Voucher
            </button>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total Amount: ${totalAmount}
              </p>
            </div>
            <div className="mt-6">
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4F46E5"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <button
                  className="w-full inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleCheckout}
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
