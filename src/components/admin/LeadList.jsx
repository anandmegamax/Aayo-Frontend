// components/admin/LeadList.jsx
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useGetLeadsQuery,
  useCloseLeadMutation,
} from "../../redux/api/leadApi";
import toast from "react-hot-toast";
import LeadRemarksModal from "./LeadRemarksModal";
import LeadAddForm from "./LeadAddForm";
import ConvertToBookingModal from "./ConvertToBookingModal";

const LeadList = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const [searchText, setSearchText] = useState("");
  const { data, refetch } = useGetLeadsQuery(filters);
  const [closeLead] = useCloseLeadMutation();
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null); // for convert to booking
  const [editingLead, setEditingLead] = useState(null); // for editing

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
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setEditingLead(row);
                  setShowAddForm(true);
                }}
              >
                Edit Lead
              </button>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const filteredLeads = data?.leads?.filter((lead) =>
    JSON.stringify(lead).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Leads</h4>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingLead(null);
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? "Hide Lead Form" : "Add Lead"}
        </button>
      </div>

      {showAddForm && (
        <LeadAddForm
          onClose={() => {
            setShowAddForm(false);
            setEditingLead(null);
          }}
          refetch={refetch}
          editingLead={editingLead}
        />
      )}

      {selectedLead && (
        <ConvertToBookingModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          refetch={refetch}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search leads..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredLeads || []}
        pagination
        highlightOnHover
        persistTableHead
        noDataComponent="No leads found"
      />

      {/* <DataTable columns={columns} data={data?.leads || []} pagination /> */}

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
