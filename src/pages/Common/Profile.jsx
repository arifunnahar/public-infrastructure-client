import React, { useState } from 'react';
import coverImg from '../../assets/images/cover.jpg';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Profile = () => {
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const [role, isRoleLoading, subscription] = useRole();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");



  // Fetch block status ---
  const { data: blockInfo = { isBlocked: false }, isLoading: blockLoading } = useQuery({
    queryKey: ["userBlockStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/status/${user?.email}`);
      return data;
    },
  });

  const isBlocked = blockInfo?.isBlocked || false;

  if (authLoading || isRoleLoading || blockLoading) {
    return <div className="flex justify-center items-center h-screen font-bold text-green-600 text-2xl">Loading...</div>;
  }






  
  //  Photo change handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  // --- Update profile handler 
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target;
    const name = form.name.value;
    const imageFile = form.photo.files[0];

    try {
      let photoURL = user?.photoURL;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
          formData
        );
        photoURL = data.data.url;
      }

      await updateUserProfile({ displayName: name, photoURL });

      const { data: dbData } = await axiosSecure.patch(`/users/update/${user?.email}`, {
        name,
        photo: photoURL,
      });

      if (dbData.modifiedCount > 0 || dbData.matchedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsOpen(false);
        setPhotoPreview("");
      }

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setUploading(false);
    }
  };

  //Invoice PDF 
  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Invoice", 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Name: ${user?.displayName}`, 20, 40);
    doc.text(`Email: ${user?.email}`, 20, 50);
    doc.text(`User ID: ${user?.uid}`, 20, 60);
    doc.text(`Role: ${role || "User"}`, 20, 70);
    doc.text(`Subscription: ${subscription || "Free"}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);
    doc.setFontSize(16);
    doc.text("Thank you for using our service!", 105, 120, { align: "center" });
    doc.save(`invoice_${user?.uid}.pdf`);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4'>
      <div className='bg-white  dark:bg-gray-800 shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 overflow-hidden'>
        <img alt='cover' src={coverImg} className='w-full h-56 object-cover' />

        <div className='flex flex-col items-center justify-center p-4 -mt-16'>

          {/* Profile picture */}
          <div className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL || '/default-profile.png'}
              className='mx-auto object-cover rounded-full h-32 w-32 border-4 border-white shadow-md'
            />
          </div>

          {/* Warning badge if blocked */}
          {isBlocked && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-full mb-2 text-sm font-semibold">
              ⚠ Your account is currently blocked. Contact with the authorities
.
            </div>
          )}

          {/* Role and Subscription badges */}
          <div className='flex gap-2 mt-2'>
            <p className='p-1 px-4 text-xs text-white bg-green-500 rounded-full uppercase font-semibold'>
              {role || 'User'}
            </p>
            {role?.toLowerCase() === 'user' && subscription?.toLowerCase() === 'premium' && (
              <p className='p-1 px-4 text-xs text-white bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full uppercase font-bold shadow-sm'>
                ★  ★  ★ Premium
              </p>
            )}
          </div>

          {/* Subscribe link if not premium */}
          {role?.toLowerCase() === 'user' && subscription?.toLowerCase() !== 'premium' && (
            <Link
              to="/user-subscribe"
              className='p-2 px-4 text-xs mt-2 text-white bg-purple-600 hover:bg-purple-700 rounded-full uppercase font-bold shadow-md transition'
            >
              Subscribe Now
            </Link>
          )}

          <p className='mt-2 text-2xl font-bold text-gray-800 uppercase'>{user?.displayName || 'Anonymous'}</p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>ID: {user?.uid}</p>

          {/* Info & Buttons */}
          <div className='w-full p-6 rounded-xl bg-green-50 dark:bg-gray-700 border border-gray-100'>
            <div className='flex flex-wrap items-center justify-between gap-4 text-sm'>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex flex-col'>
                  <span className='text-gray-400  font-medium'>Full Name</span>
                  <span className='font-bold text-gray-700 dark:text-gray-100 text-lg'>{user?.displayName}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-gray-400 font-medium'>Email</span>
                  <span className='font-bold text-gray-700 dark:text-gray-100 text-lg'>{user?.email}</span>
                </div>
              </div>

              <div className='flex gap-2 flex-wrap mt-4 md:mt-0'>
                <button
                  onClick={() => { setPhotoPreview(user?.photoURL); setIsOpen(true); }}
                  className='bg-green-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-600 shadow-md transition'
                >
                  Update Profile
                </button>
                {role?.toLowerCase() === 'user' && (
                  <button
                    onClick={downloadInvoice}
                    className='bg-black px-6 py-2 text-white rounded-lg font-semibold shadow-md hover:bg-gray-900 transition'
                  >
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Update Profile Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl animate__animated animate__zoomIn">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Edit Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col items-center">
                <img
                  src={photoPreview || user?.photoURL || "https://via.placeholder.com/100"}
                  className="w-24 h-24 rounded-full object-cover border-2 border-green-500 mb-2 shadow-sm"
                  alt="Preview"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">Profile</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Full Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Change Photo</label>
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 w-full p-1 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {uploading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
