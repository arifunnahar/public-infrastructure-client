import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdBolt } from "react-icons/md";

const SubscriptionModal = ({ isOpen, closeModal, handleSubscribe, isLoading }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" />

      {/* Centered panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl p-6 space-y-5 shadow-lg transition-colors">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MdBolt className="text-amber-600" /> Subscribe to Premium
          </DialogTitle>

          <p className="text-gray-600 dark:text-gray-300">
            Unlock unlimited issue reporting and priority support for only 1000tk.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModal}
              className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className="px-5 py-2 bg-purple-700 text-white rounded-lg disabled:opacity-60 hover:bg-purple-800 transition"
            >
              {isLoading ? "Redirecting to Stripe..." : "Confirm Payment"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SubscriptionModal;
