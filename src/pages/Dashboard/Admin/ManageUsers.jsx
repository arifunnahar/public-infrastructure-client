import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();


  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["manage-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-users");
      return res.data;
    },
  });


  const handleBlockToggle = (user) => {
    const actionText = user.isBlocked ? "Unblock" : "Block";
    
    Swal.fire({
      title: `${actionText} User?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${user.displayName || 'this user'}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? "#22c55e" : "#d33", 
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actionText}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          const res = await axiosSecure.patch(`/manage-users/block/${user._id}`, {
            block: !user.isBlocked,
          });

          if (res.data.success) {
            refetch(); 
            Swal.fire(
              "Updated!",
              `User has been ${actionText === "Block" ? "blocked" : "unblocked"} successfully.`,
              "success"
            );
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to update user status.", "error");
        }
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center font-bold text-blue-600 italic">Loading users...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Users ({users.length})</h2>
      </div>

      <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-100">
        <table className="table w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-4 px-4 text-left">No</th>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Subscription</th>
              <th className="text-left">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-20 text-gray-400 italic">
                  No general users found in the system.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr 
                  key={user._id} 
                  className={`border-b transition-colors hover:bg-blue-50/30 ${user.isBlocked ? 'bg-red-50/40' : 'bg-white'}`}
                >
                  <td className="p-4 font-semibold text-gray-500">{index + 1}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">
                      {user.displayName || "Anonymous User"}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>

                  {/* Subscription Info */}
                  <td className="p-4">
                    <div>
                      <p className={`font-bold capitalize text-sm ${user.subscription === 'premium' ? 'text-purple-600' : 'text-gray-500'}`}>
                        {user.subscription || "free"}
                      </p>
                      {user.subscription === "premium" && (
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-black rounded-sm uppercase tracking-tighter">Active</span>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        user.isBlocked
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleBlockToggle(user)}
                      className={`btn btn-xs px-4 py-1 h-auto min-h-0 border-none text-white font-bold transition-transform active:scale-95 ${
                        user.isBlocked 
                          ? "bg-green-500 hover:bg-green-600 shadow-green-200" 
                          : "bg-red-500 hover:bg-red-600 shadow-red-200"
                      } shadow-md`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;