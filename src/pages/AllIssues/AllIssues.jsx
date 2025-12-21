import React, { useState, useEffect } from "react";
import useIssues from "../hooks/useIssues";
import IssueCard from "./IssueCard";
import { debounce } from "lodash";
import LoadingSpinner from "../LoadingSpinner";

const AllIssues = () => {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    status: "",
    priority: "",
    category: "",
  });

  const [searchInputs, setSearchInputs] = useState({
    name: "",
    location: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: issues, isLoading, isError, error } = useIssues(filters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handler = debounce(() => {
      setFilters((prev) => ({
        ...prev,
        name: searchInputs.name,
        location: searchInputs.location,
      }));
      setCurrentPage(1);
    }, 300);

    handler();
    return () => handler.cancel();
  }, [searchInputs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Sort

const sortedIssues = issues
  ?.slice()
  .sort((a, b) => {
   
    if (a.boosted && b.boosted) {
      return new Date(b.boostedAt) - new Date(a.boostedAt); 
    }
    if (a.boosted && !b.boosted) return -1;
    if (!a.boosted && b.boosted) return 1;

    //  High priority 
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (a.priority !== "high" && b.priority === "high") return 1;

    //  Newest 
    return new Date(b.createdAt) - new Date(a.createdAt);
  });



  
  // Pagination
  const totalPages = Math.ceil(sortedIssues?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssues = sortedIssues?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isError) {
    return (
      <p className="text-center py-5 text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <>
      <div className="text-center py-5">
        <h1 className="text-2xl text-gray-700 font-bold mt-15">All Issues</h1>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 justify-center mb-5">
        <input
          type="text"
          name="name"
          value={searchInputs.name}
          onChange={handleInputChange}
          placeholder="Search by issue name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={searchInputs.location}
          onChange={handleInputChange}
          placeholder="Search by location"
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="working">Working</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Garbage">Garbage</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Traffic">Traffic</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Loading */}
      <div className="p-4 md:p-0 lg:p-0 mb-5">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentIssues?.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-5 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default AllIssues;
