import React, { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function FormComponent() {
  const navigate = useNavigate();
  // Define state to store the document IDs and their verification status
  const [documentData, setDocumentData] = useState({});

  function handleApplyClick(link) {
    window.open(link, "_blank");
  }

  const location = useLocation();
  const dataReceived = location.state.data;
  const token = dataReceived.token;

  const matchedDetails = dataReceived.matcheddetail;
  const unmatchedDetails = dataReceived.unmatcheddetail;

  const matchedDocuments = dataReceived.matcheddoc;
  const unmatchedDocuments = dataReceived.unmatcheddoc;
  function handleDocumentIdChange(docName, event) {
    setDocumentData((prevData) => ({
      ...prevData,
      [docName]: {
        ...prevData[docName],
        id: event.target.value,
      },
    }));
  }

  async function handleUploadClick(docName) {
    const docData = documentData[docName];

    if (docData && docData.id) {
      const uploadedDocument = {
        docname: docName,
        docnumber: docData.id,
      };
      console.log("Uploaded Document:", uploadedDocument);

      try {
        const response = await fetch(`http://localhost:3108/varify/varidydoc`, {
          body: JSON.stringify({ docname: docName, docnumber: docData.id }),
          method: "Post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(response);
        const isVerified = response.ok;
        setDocumentData((prevData) => ({
          ...prevData,
          [docName]: {
            ...docData,
            verifiedStatus: isVerified ? "Verified" : "Unverified",
          },
        }));
      } catch (err) {
        console.log("Error in api call", err);
      }
    } else {
      console.error("Document ID is not defined for", docName);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here
    const fileInputs = document.querySelectorAll(".file-input");
    const detailInput = document.querySelectorAll(".form-detail");
    const uploadButton = document.getElementById("uploadButton");
    uploadButton.addEventListener("click", async () => {
      const formData = new FormData();
      fileInputs.forEach((input) => {
        const file = input.files[0];
        if (file) {
          const fieldName = input.id;
          formData.append("files", file, fieldName);
        }
      });
      const detailsArray = [];
      detailInput.forEach((input) => {
        const fieldName = input.id;
        const value = input.value;
        if (value.trim() !== "") {
          const detailObject = {
            name: fieldName,
            value: value,
          };
          detailsArray.push(detailObject);
        }
      });
      formData.append("details", JSON.stringify(detailsArray));
      const response = await fetch("http://localhost:3108/document/docupload", {
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      if (response.ok) {
        navigate("/");
      }
      // You can send the formData to your server using Fetch or XHR
      // Include code here to send the formData to your server
    });
  };

  return (
    <div className="bg-green-200 font-sans flex items-center justify-center">
      <div className="mx-auto p-6 w-[800px] bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="text-xl font-bold mb-4">Available Details</h2>

            {matchedDetails.map((doc, index) => (
              <div className="form-group" key={index}>
                <label
                  htmlFor={`${doc.name}${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {doc.name}:
                </label>
                <div className="input-group">
                  <div className="input-group-append">
                    {doc.name === "DOB" ? (
                      <input
                        type="date"
                        className="form-input"
                        id={`${doc.name}`}
                        name={doc.name}
                        value={doc.value}
                        readOnly
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-input"
                        id={`${doc.name}`}
                        name={doc.name}
                        value={doc.value}
                        readOnly
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2 className="text-xl font-bold mb-4">Available Documents</h2>
            {matchedDocuments.map((doc, index) => (
              <div className="form-group" key={index}>
                <label
                  htmlFor={`${doc.docname}${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {doc.docname}:
                </label>
                <div className="input-group">
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary view-button"
                      onClick={() => handleApplyClick(doc.doclink)}
                      type="button"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section ">
            <h2 className="text-xl font-bold mb-4">Add Details</h2>
            {unmatchedDetails.map((doc, index) => (
              <div
                className="form-group flex justify-around bg-green-200 "
                key={index}
              >
                <label
                  htmlFor={`${doc}${index}`}
                  className="block text-gray-700 text-sm font-bold mt-3 mb-2 mx-auto text-left"
                >
                  {doc === "DOB" ? <span>{doc}:</span> : <span>{doc}:</span>}
                </label>
                {doc === "DOB" ? (
                  <input
                    type="date"
                    className="form-detail mb-2 mx-auto border-2 rounded-md mt-3"
                    id={`${doc}`}
                    required
                  />
                ) : (
                  <input
                    type="text"
                    className="form-detail mb-2 mx-auto border-2 rounded-md mt-3"
                    id={`${doc}`}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-section">
            <h2 className="text-xl font-bold my-4">Upload Documents</h2>
            {unmatchedDocuments.map((doc, index) => (
              <div
                key={index}
                className="form-group border-2 bg-green-200 mb-2 pl-3"
              >
                <label
                  htmlFor={`${doc}${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2 "
                >
                  {doc}:
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    className="file-input pl-3"
                    id={`${doc}`}
                    accept=".pdf, .jpg, .png"
                    required
                  />
                  <input
                    type="text"
                    className="form-input ml-2 rounded-md pl-2"
                    id={`${doc}`}
                    placeholder="Document ID"
                    required
                    onChange={(event) => handleDocumentIdChange(doc, event)}
                  />
                  <button
                    className="btn btn-primary ml-2 px-2 m-2 bg-[#19514F] text-white rounded cursor-pointer hover:bg-[#379683] hover:text-[#ffffff]"
                    onClick={() => handleUploadClick(doc)}
                    type="button"
                  >
                    Upload
                  </button>
                  {/* Display verification status specific to each document */}
                  {documentData[doc] && documentData[doc].verifiedStatus && (
                    <span
                      className={`${
                        documentData[doc].verifiedStatus === "Verified"
                          ? "text-green-500"
                          : "text-red-500"
                      }  w-1/4 mx-2 py-1 pl-32`}
                    >
                      {documentData[doc].verifiedStatus}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              id="uploadButton"
              className="px-5 py-1 m-2 bg-[#19514F] text-white rounded cursor-pointer hover:bg-[#379683] hover:text-[#ffffff]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormComponent;
