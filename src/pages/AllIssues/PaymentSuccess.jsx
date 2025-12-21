import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSearchParams } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const sessionId = searchParams.get("session_id");

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axios
        .post(
          " https://public-infrastructure-server.vercel.app/payment-success",
          {
            session_id: sessionId,
          }
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId]);
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <MdCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your payment.</p>

        <Link
          to="/dashboard/my-issues-page"
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
        >
          Go to My Issue Page
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
