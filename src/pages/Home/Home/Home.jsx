

import React from "react";
import useIssues from "../../hooks/useIssues";
import IssueCard from "../../AllIssues/IssueCard";

const Home = () => {
  const { data: issues, isLoading, isError, error } = useIssues();

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        {error.message}
      </p>
    );

  
  
  //Recent Resolved 6 Issues
  const recentResolvedIssues = [...issues]
    .filter(issue => issue.status === "resolved")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);
  
 


  return (
    <div>
      <div className="py-5">
        <h1 className="text-3xl font-bold text-center">
          Recent Resolved Issues
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 md:p-0 lg:p-0 mb-5">
        {recentResolvedIssues.map(issue => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default Home;

