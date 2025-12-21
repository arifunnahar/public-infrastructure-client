import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";
import Swal from "sweetalert2";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get("https://public-infrastructure-server.vercel.app/staff");
      setStaffList(res.data);
    } catch (err) {
      console.error("Fetch Staff Error:", err);
      toast.error("Failed to fetch staff");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      let photoURL = editStaff?.photo || "";

      // Upload image
      if (data.photo && data.photo.length > 0) {
        const file = data.photo[0];
        const formData = new FormData();
        formData.append("image", file);

        if (!import.meta.env.VITE_image_host_key) {
          toast.error("Image host key missing ");
          return;
        }

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        );
        photoURL = res.data.data.url;
      }

      if (editStaff) {
        // Update staff info
        const updatedStaff = {
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          photo: photoURL,
          role: editStaff.role || "staff",
          uid: editStaff.uid,
        };

        await axios.put(
          ` https://public-infrastructure-server.vercel.app/staff/${editStaff._id}`,
          updatedStaff
        );

        // update Firebase password if provided
        if (data.password && data.password.trim() !== "") {
          const user = auth.currentUser;
          if (user && user.email === editStaff.email) {
            await updatePassword(user, data.password);
          }
        }

        toast.success("Staff information updated successfully");
        setEditStaff(null);
      } else {
        // Add new staff
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const newStaff = {
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          photo: photoURL,
          role: "staff",
          uid: userCredential.user.uid,
        };

        await axios.post(" https://public-infrastructure-server.vercel.app/staff", newStaff);
        toast.success("Staff added successfully");
      }

      reset();
      setPhotoPreview("");
      setModalIsOpen(false);
      fetchStaff();
    } catch (err) {
      console.error("Add/Update Error:", err.response?.data || err.message);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (staff) => {
    setEditStaff(staff);
    reset({
      name: staff.name,
      email: staff.email,
      phone: staff.phone || "",
    });
    setPhotoPreview(staff.photo || "");
    setModalIsOpen(true);
  };

  const handleDelete = async (staff) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${staff.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://public-infrastructure-server.vercel.app/staff/${staff._id}`);
          toast.success("Staff deleted successfully");
          setStaffList(staffList.filter((s) => s._id !== staff._id));
        } catch (err) {
          console.error("Delete Staff Error:", err);
          toast.error("Failed to delete staff");
        }
      }
    });
  };

  return (
    <div className="p-10  min-h-screen relative">
      <Toaster />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Manage Staff</h2>
        <button
          onClick={() => {
            setEditStaff(null);
            reset();
            setPhotoPreview("");
            setModalIsOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Staff
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-200">
            {staffList.map((staff, index) => (
              <tr key={staff._id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={staff.photo || "https://via.placeholder.com/50"}
                    alt="staff"
                    className="h-12 w-12 rounded-full object-cover border"
                  />
                </td>

                <td className="px-6 py-4">{staff.name}</td>
                <td className="px-6 py-4">{staff.email}</td>
                <td className="px-6 py-4">{staff.phone || "-"}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(staff)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-start justify-center z-50 pt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editStaff ? "Update Staff" : "Add Staff"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex flex-col items-center">
                <img
                  src={
                    photoPreview ||
                    editStaff?.photo ||
                    "https://via.placeholder.com/100"
                  }
                  className="w-24 h-24 rounded-full object-cover border mb-3"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                onChange={handlePhotoChange}
                className="w-full border p-2 rounded"
              />
              <input
                {...register("name", { required: true })}
                defaultValue={editStaff?.name || ""}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                {...register("email", { required: true })}
                defaultValue={editStaff?.email || ""}
                placeholder="Email"
                type="email"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                {...register("phone", { required: true })}
                defaultValue={editStaff?.phone || ""}
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded"
              />
              {!editStaff && (
                <input
                  {...register("password", { required: true })}
                  placeholder="Password"
                  type="password"
                  className="w-full px-3 py-2 border rounded"
                />
              )}
              {/* {editStaff && (
                <input
                  {...register("password")}
                  placeholder="New Password (optional)"
                  type="password"
                  className="w-full px-3 py-2 border rounded"
                />
              )} */}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalIsOpen(false);
                    reset();
                    setPhotoPreview("");
                    setEditStaff(null);
                  }}
                  className="px-4 py-2 rounded border hover:bg-gray-100 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  {editStaff ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;

