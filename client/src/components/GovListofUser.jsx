import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

function Listofuser() {
  const [tableData, setTableData] = useState([]);
  const { schemeid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3108/document/userlist`,
          {
            method: "POST",
            body: JSON.stringify({ schemeid: schemeid }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const res = await response.json();
        const userdata = res.data;
        const data = userdata.data;

        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [schemeid]); // Include schemeid in the dependency array to re-fetch data when schemeid changes

  return (
    <div className="container mx-auto max-w-screen-2xl px-4 mt-8">
      <h2 className="block text-2xl mb-3 text-center">
        Government registered schemes
      </h2>
      <div className="container h-screen bg-white border rounded-lg my-auto p-6 w-1/2 mx-auto shadow-md">
        <ul className="responsive-table">
          <li className="table-header flex justify-around border p-2 text-white font-bold mb-2 bg-[#19514F]">
            <span className="col col-1">Aadhar</span>
            <span className="col col-2">Mobile Number</span>
            <span className="col col-3">View Application</span>
          </li>
          {tableData.map((item, index) => (
            <li
              className="flex justify-around items-center p-1 my-4 rounded shadow-md mb-2 odd:bg-green-200 even:bg-white"
              key={index}
            >
              <div className="col col-1" data-label="Scheme Id">
                {item.aadhar}
              </div>
              <div className="col col-2" data-label="Mobile Number">
                {/* {item.number}{" "} */}9874298347
                {/* Assuming 'number' is the mobile number property */}
              </div>
              <div className="col col-4" data-label="View">
                <button
                  className="px-5 py-1 m-2 bg-[#19514F] text-white rounded cursor-pointer hover:bg-[#379683] hover:text-[#ffffff]"
                  onClick={() => {
                    // Use navigate to programmatically navigate to the second page
                    navigate(`/showapplication/${item.aadhar}`, {
                      state: { item },
                    });
                  }}
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Listofuser;
