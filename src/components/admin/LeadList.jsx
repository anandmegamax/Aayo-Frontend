import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useGetLeadsQuery,
  useCloseLeadMutation,
} from "../../redux/api/leadApi";
import toast from "react-hot-toast";
import LeadRemarksModal from "./LeadRemarksModal";
import LeadAddForm from "./LeadAddForm"; // 👈 Import Add Form
import ConvertToBookingModal from "./ConvertToBookingModal";

const LeadList = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const { data, refetch } = useGetLeadsQuery(filters);
  const [closeLead] = useCloseLeadMutation();
  const [selectedLeadId, setSelectedLeadId] = useState(null); // For showing remarks modal
  const [showAddForm, setShowAddForm] = useState(false); // 👈 For toggling add form
  const [selectedLead, setSelectedLead] = useState(null);

  const handleCloseLead = async (id) => {
    await closeLead(id);
    toast.success("Lead closed");
    refetch();
  };

  const columns = [
    { name: "Lead ID", selector: (row) => row._id },
    { name: "User Name", selector: (row) => row.userId?.name || "N/A" },
    { name: "Email", selector: (row) => row.userId?.email || "N/A" },
    { name: "Phone", selector: (row) => row.userId?.phone || "N/A" },
    { name: "From-To", selector: (row) => `${row.fromPlace} - ${row.toPlace}` },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Actions",
      cell: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleCloseLead(row._id)}
              >
                Close Lead
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setSelectedLeadId(row._id)}
              >
                View Remarks
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setSelectedLead(row)}
              >
                Convert to Booking
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Leads</h4>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Hide Lead Form" : "Add Lead"}
        </button>
      </div>

      {/* Show Add Lead Form if toggled */}
      {showAddForm && (
        <LeadAddForm onClose={() => setShowAddForm(false)} refetch={refetch} />
      )}

      {selectedLead && (
        <ConvertToBookingModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          refetch={refetch}
        />
      )}

      <DataTable columns={columns} data={data?.leads || []} pagination />

      {/* Show Remarks Modal */}
      {selectedLeadId && (
        <LeadRemarksModal
          leadId={selectedLeadId}
          onClose={() => setSelectedLeadId(null)}
        />
      )}
    </div>
  );
};

export default LeadList;
