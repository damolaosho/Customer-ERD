import { useSelector } from 'react-redux';
import Navbar from '../components/NavBar';

const Profile = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {authState.userData.firstName} {authState.userData.lastName}
                </h1>
                <p className="text-lg text-gray-500">
                  {authState.userData.email}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <p className="text-lg text-gray-900" id="address">
                {authState.userData.address}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <p className="text-lg text-gray-900" id="phone">
                {authState.userData.phone}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <p className="text-lg text-gray-900" id="location">
                Bristol, United Kingdom
              </p>
            </div>
            {/* <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                Edit Profile
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
