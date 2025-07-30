import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  useAddLeadRemarkMutation,
  useGetLeadRemarksQuery,
} from "../../redux/api/leadApi";

const LeadRemarksModal = ({ leadId, onClose }) => {
  const [remark, setRemark] = useState("");
  const { data: remarksData, refetch } = useGetLeadRemarksQuery(leadId);
  const [addRemark, { isLoading }] = useAddLeadRemarkMutation();

  const handleAddRemark = async () => {
    if (!remark.trim()) {
      toast.error("Please enter update on leads");
      return;
    }
    try {
      await addRemark({ leadId, remark }).unwrap();
      toast.success("Remark added successfully");
      setRemark("");
      refetch();
    } catch (err) {
      toast.error("Failed to add remark");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Lead Details & Remarks</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write an update on the lead"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
              <button
                className="btn btn-primary mt-2"
                onClick={handleAddRemark}
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
            <hr />
            <h6>Previous Remarks:</h6>
            <ul className="list-group">
              {remarksData?.remarks?.length > 0 ? (
                remarksData.remarks.map((r) => (
                  <li key={r._id} className="list-group-item">
                    <strong>{r.createdAt.split("T")[0]}:</strong> {r.message}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No remarks yet.</li>
              )}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadRemarksModal;
