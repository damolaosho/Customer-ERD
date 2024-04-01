import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/NavBar';

const CategoriesPage = () => {
  // Sample category data
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(categories, isLoading);
    fetch('https://crm-backend-plau.onrender.com/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setCategories(data.data);
          setIsLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={Math.floor(Math.random() * 100) + 2}
              className="bg-white shadow-sm rounded-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-700 mb-2">
                  {Math.floor(Math.random() * 100) + 1} Products
                </p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
