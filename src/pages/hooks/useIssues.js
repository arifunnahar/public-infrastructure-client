// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useIssues = () => {
//   return useQuery({
//     queryKey: ["issues"],
//     queryFn: async () => {
//       const res = await axios.get(" https://public-infrastructure-server.vercel.app/issues");
//       return res.data;
//     },
//   });
// };

// export default useIssues;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useIssues = (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();

  return useQuery({
    queryKey: ["issues", filters],
    queryFn: async () => {
      const res = await axios.get(
        ` https://public-infrastructure-server.vercel.app/issues?${queryString}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
};

export default useIssues;
