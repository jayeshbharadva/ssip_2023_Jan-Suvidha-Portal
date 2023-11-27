import React, { useState, useEffect } from "react";
import { getallscheme } from "../api";
import { useNavigate } from "react-router-dom";

function SchemesTable() {
  const [searchValue, setSearchValue] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSchemes = async () => {
    try {
      const response = await getallscheme();
      const data = response.data;
      const filteredSchemes = data.filter(
        (scheme) => scheme.status !== "completed"
      );
      console.log("schemes are", filteredSchemes);
      setSchemes(filteredSchemes);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setLoading(false);
    }
  };

  const handleSchemeSearch = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleApplyClick = (schemeId) => {
    navigate(`/AadharVerification/${schemeId}`);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <div
      id="schemetable"
      className="container mx-auto max-w-screen-lg px-4 mt-8"
    >
      <h2 className="text-2xl text-center mb-4">Schemes</h2>
      <div className="mb-8">
        <div className="search-container">
          <input
            type="text"
            id="schemeSearch"
            className="search-input"
            placeholder="Search for a scheme..."
            onChange={handleSchemeSearch}
            value={searchValue}
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto w-full border border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Scheme Name</th>
              <th className="border p-2">Documents</th>
              <th className="border p-2">LastDate</th>
              <th className="border p-2 ">Apply</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{scheme.schemename}</td>
                <td className="border p-2">{scheme.documents.join(", ")}</td>
                <td className="border p-2">{scheme.LastDate}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleApplyClick(scheme.schemeid)}
                    className=" px-5 py-1 m-2 bg-[#19514F] text-white rounded cursor-pointer hover:bg-[#379683] hover:text-[#ffffff]"
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SchemesTable;
