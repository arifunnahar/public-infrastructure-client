import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FiSearch } from "react-icons/fi";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import InvoicePDF from "./InvoicePDF";
import LoadingSpinner from "../../LoadingSpinner";

const Payments = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");

  // Fetch all payments
  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center py-6 text-red-500">
        Failed to load payments
      </p>
    );
  // Sort payments
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Filter payments
  const filteredPayments = sortedPayments.filter((payment) =>
    (payment.email || payment.customer || payment.reportedBy || "")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  //  Total amount
  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">
        All Payments ({filteredPayments.length})
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Payments</h3>
          <p className="text-2xl font-bold">
            {filteredPayments.length}
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Amount</h3>
          <p className="text-2xl font-bold">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filter input */}
      <div className="mb-4 w-full md:w-1/3 relative">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by email"
          className="border p-2 pl-10 rounded w-full bg-green-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Payments table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>No</th>
              <th>Transaction ID</th>
              <th>Email</th>
              <th>Category</th>
              <th>Status</th>
              <th>Payment From</th>
              <th>Amount</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody className="bg-gray-50">
            {filteredPayments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.transactionId}</td>
                <td>
                  {payment.email ||
                    payment.customer ||
                    payment.reportedBy}
                </td>
                <td>{payment.category || "subscription"}</td>
                <td>{payment.status || payment.paymentStatus}</td>
                <td>{payment.paymentFrom || "boost"}</td>
                <td>${payment.amount}</td>
                <td>
                  <PDFDownloadLink
                    document={<InvoicePDF payment={payment} />}
                    fileName={`invoice_${payment.transactionId}.pdf`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    {({ loading }) =>
                      loading ? "Loading..." : "Download"
                    }
                  </PDFDownloadLink>
                </td>
              </tr>
            ))}

            {filteredPayments.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-6 text-gray-500"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
