import { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';

const ViewAllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
    console.log({ reviews });
  }, []);

  const fetchReviews = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('https://crm-backend-plau.onrender.com/reviews')
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((result) => {
        if (result.status === 'success') {
          console.log({ successful: result });
          setReviews(result.data);
        } else {
          console.log({ Error: result });
        }
      })
      .catch((error) => {
        console.log('THIS IS AN ERROR', error);
        return console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-4">All Reviews</h1>
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold mr-2">
                    {review.user.firstName + ' ' + review.user.lastName}
                  </h3>
                  <span className="text-gray-500">
                    rated {review.rating} stars
                  </span>
                </div>
                <span className="text-gray-500">{review.date}</span>{' '}
              </div>
              <p className="mb-4">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllReviewsPage;
