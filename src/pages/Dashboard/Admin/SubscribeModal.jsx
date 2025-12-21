
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdBolt } from "react-icons/md";

const SubscriptionModal = ({ isOpen, closeModal, handleSubscribe, isLoading }) => {








  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 " />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full bg-white rounded-xl p-6 space-y-5">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MdBolt className="text-amber-600" /> Subscribe to Premium
          </DialogTitle>

          <p className="text-gray-600">
            Unlock unlimited issue reporting and priority support for only 1000tk.
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={closeModal} className="px-5 py-2 rounded-lg bg-gray-200">
              Cancel
            </button>
            <button
              onClick={handleSubscribe} 
              disabled={isLoading}
              className="px-5 py-2 bg-purple-700 text-white rounded-lg disabled:opacity-60"
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

