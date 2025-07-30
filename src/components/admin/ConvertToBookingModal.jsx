import React, { useState } from "react";
import toast from "react-hot-toast";
import { useConvertLeadMutation } from "../../redux/api/leadApi";
import { useGetFlightTypesQuery } from "../../redux/api/flightTypeApi";

const ConvertToBookingModal = ({ lead, onClose, refetch }) => {
  const [form, setForm] = useState({
    amount: "",
    travelDate: lead.travelDate?.split("T")[0],
    travelTime: lead.travelTime,
    remark: "",
    flightType: "",
  });

  const [convertLead, { isLoading }] = useConvertLeadMutation();
  const { data: flightTypes = [], isLoading: flightLoading } =
    useGetFlightTypesQuery(); // ✅ fetch flight types

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { amount, travelDate, travelTime, remark, flightType } = form;
    if (!amount || !travelDate || !travelTime || !flightType || !remark) {
      toast.error("All fields are required");
      return;
    }

    try {
      await convertLead({
        id: lead._id,
        data: { amount, travelDate, travelTime, remark, flightType },
      }).unwrap();
      toast.success("Lead converted to booking successfully");
      onClose();
      refetch();
    } catch (err) {
      toast.error("Failed to convert lead");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Convert Lead to Booking</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body row">
            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Amount (INR)"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                type="date"
                name="travelDate"
                value={form.travelDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                type="time"
                name="travelTime"
                value={form.travelTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-2">
              <select
                className="form-select"
                name="flightType"
                value={form.flightType}
                onChange={handleChange}
                disabled={flightLoading}
              >
                <option value="">Select Flight Type</option>
                {flightTypes?.flightTypes?.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12 mb-2">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write an update for the lead"
                name="remark"
                value={form.remark}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Convert
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertToBookingModal;
