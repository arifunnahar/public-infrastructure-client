import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdBolt } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";

const BoostModal = ({ isOpen, closeModal, issue }) => {
  if (!issue) return null;

  const { user } = useAuth();
  const {
    _id,
    title,
    category,
    priority,
    description,
    reportedBy,
    imageUrl,

    boostCost: initialBoostCost,
  } = issue;

  const [boostCost, setBoostCost] = useState(initialBoostCost || 100);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const paymentInfo = {
        issueId: _id,
        title,
        category,
        description,
        reportedBy,
        imageUrl,
        boostCost,
        quantity: 1,
        reporter: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      // payment processing
      const result = await axios.post(
        " https://public-infrastructure-server.vercel.app/create-checkout-session",
        paymentInfo
      );

      if (result.data.url) {
        window.location.href = result.data.url;
      } else {
        console.error("No session URL returned");
      }

      // Payment success
      await axios.post(
        ` https://public-infrastructure-server.vercel.app/issues/${_id}/boost`,
        {
          paymentId: "dummy",
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl p-6 space-y-5">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MdBolt className="text-amber-600" />
            Boost Your Issue
          </DialogTitle>

          {/* Issue Info */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Issue ID: <b>{_id}</b>
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You're boosting the issue: <b>{title}</b>
          </p>
          <p className="text-gray-600  dark:text-gray-400 leading-relaxed">
            Category: <b>{category}</b>
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Current Priority: <b>{priority}</b>
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relax">
            Boosting this issue will:
          </p>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-500 space-y-1">
            <li>Move the issue to the top</li>
            <li>
              Set priority to <b>High</b>
            </li>
            <li>Increase visibility to authorities</li>
          </ul>

          {/* Boost Amount Input */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex flex-col gap-2">
            <label className="font-semibold">Boost Amount</label>
            <input
              type="number"
              min="50"
              value={boostCost}
              onChange={(e) => setBoostCost(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModal}
              className="px-5 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handlePayment}
              type="button"
              disabled={isLoading}
              className="px-5 py-2 bg-amber-600 text-white rounded-lg disabled:opacity-60"
            >
              {isLoading ? "Processing..." : "Confirm Boost"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BoostModal;
