import React, { useState } from "react";
import { useAddPaymentMutation } from "../../redux/api/bookingApi";
import toast from "react-hot-toast";

const PaymentUpdateForm = ({ bookingId, onSuccess }) => {
  const [form, setForm] = useState({
    amount: 0,
    transactionDate: "",
    transactionNo: "",
    remarks: "",
    method: "",
  });

  const [addPayment] = useAddPaymentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPayment({ id: bookingId, body: form }).unwrap();
      toast.success("Payment added");
      onSuccess?.();
    } catch (err) {
      toast.error("Failed to add payment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: +e.target.value })}
        required
      />
      <input
        type="date"
        value={form.transactionDate}
        onChange={(e) => setForm({ ...form, transactionDate: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Transaction No"
        value={form.transactionNo}
        onChange={(e) => setForm({ ...form, transactionNo: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Remarks"
        value={form.remarks}
        onChange={(e) => setForm({ ...form, remarks: e.target.value })}
      />
      <input
        type="text"
        placeholder="Method"
        value={form.method}
        onChange={(e) => setForm({ ...form, method: e.target.value })}
      />
      <button type="submit">Add Payment</button>
    </form>
  );
};

export default PaymentUpdateForm;
