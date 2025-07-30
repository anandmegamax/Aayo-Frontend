import React, { useState, useEffect } from "react";
import { useUpdatePaymentMutation } from "../../redux/api/bookingApi";

const AddPaymentForm = ({ booking, onClose, refetch }) => {
  const [form, setForm] = useState({
    amount: "",
    transactionDate: "",
    transactionNo: "",
    remarks: "",
    method: "",
  });

  const [updatePayment] = useUpdatePaymentMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updatePayment({ id: booking._id, body: form });
    onClose();
    refetch();
  };

  const paidAmount = booking.payments.reduce((sum, p) => sum + p.amount, 0);
  const balance = booking.totalAmount - paidAmount;

  return (
    <div className="card card-body my-3 border">
      <h5>Add Payment for Booking ID: {booking._id.slice(-5)}</h5>
      <form onSubmit={handleSubmit} id="payment-form">
        <div className="row">
          <div className="col-md-2">
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
              max={balance}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="transactionDate"
              className="form-control"
              value={form.transactionDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="transactionNo"
              className="form-control"
              placeholder="Txn No"
              value={form.transactionNo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="remarks"
              className="form-control"
              placeholder="Remarks"
              value={form.remarks}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              name="method"
              className="form-control"
              value={form.method}
              onChange={handleChange}
              required
            >
              <option value="">Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* History */}
      <h6 className="mt-4">Payment History</h6>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Txn No</th>
            <th>Method</th>
            <th>Remarks</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {booking.payments.map((p, index) => {
            const prev = booking.payments
              .slice(0, index)
              .reduce((sum, p) => sum + p.amount, 0);
            const bal = booking.totalAmount - prev - p.amount;
            return (
              <tr key={index}>
                <td>{p.transactionDate?.slice(0, 10)}</td>
                <td>{p.transactionNo}</td>
                <td>{p.method}</td>
                <td>{p.remarks}</td>
                <td>{p.amount}</td>
                <td>{bal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddPaymentForm;
