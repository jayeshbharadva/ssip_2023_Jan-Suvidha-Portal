import React, { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
function UserDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.item;
  console.log(data);

  const matchedDetails = data.userdetail;
  const matchedDocuments = data.documents;
  const aadhar = data.aadhar;
  const schemeid = data.schemeid;
  const [approvalStatus, setApprovalStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleApplyClick = (link) => {
    window.open(link, "_blank");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3108/gov/setstatus`, {
      method: "Post",
      body: JSON.stringify({ aadhar, schemeid, approvalStatus, remarks }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate("/listscheme");
    }
  };

  return (
    <div className="bg-green-200 min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-[600px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          {matchedDetails.map((detail, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                {detail.name}:
              </label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                id={detail.name}
                name={detail.name}
                value={detail.value}
                readOnly
              />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">User Documents</h2>
          {matchedDocuments.map((doc, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                {doc.docname}:
              </label>
              <button
                className="bg-[#19514F] text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={() => handleApplyClick(doc.doclink)}
                type="button"
              >
                View
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Approval Status</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="approvalStatus"
                value="approved"
                checked={approvalStatus === "approved"}
                onChange={() => setApprovalStatus("approved")}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-700">Approve</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="approvalStatus"
                value="reject"
                checked={approvalStatus === "reject"}
                onChange={() => setApprovalStatus("reject")}
                className="form-radio text-red-500"
              />
              <span className="ml-2 text-gray-700">Reject</span>
            </label>
          </div>
        </div>

        {approvalStatus === "reject" && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Rejection Remarks</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Remarks:
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            id="uploadButton"
            className="bg-[#19514F] text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetail;
