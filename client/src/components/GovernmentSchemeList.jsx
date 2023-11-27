import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getallscheme } from "../api";

function Table() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getallscheme(); // Replace with your actual API call
        const data = response.data;
        console.log(data);
        // Assuming the API response is an array of objects similar to the tableData structure
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center text-green-800 font-bold mb-4">
        Government registered schemes
      </h2>
      <Link to="/addscheme">
        <button className="bg-[#19514F] text-white px-4 py-2 rounded">
          Add New Scheme
        </button>
      </Link>
      <ul className="w-full mt-4">
        <li className="flex bg-gray-300 font-bold p-2">
          <div className="flex-1">Scheme Id</div>
          <div className="flex-1">Scheme Name</div>
          <div className="flex-1">Status</div>
          <div className="flex-1">View</div>
        </li>
        {tableData.map((item, index) => (
          <li key={index} className="flex bg-white shadow-md mb-2">
            <div className="flex-1 p-2">{item.schemeid}</div>
            <div className="flex-1 p-2">{item.schemename}</div>
            <div className="flex-1 p-2">{item.status}</div>
            <div className="flex-1 p-2">
            <Link to={`/showapplicant/${item.schemeid}`}>
                <button className="bg-[#19514F] text-white px-2 py-1 rounded">
                  View Applications
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;

// src/components/Table.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Table() {
//   const tableData = [
//     {
//       schemeid: 42235,
//       schemename: 'MYSY',
//       status: 'Pending',
//     },
//     {
//       schemeid: 42442,
//       schemename: 'PM Kisan',
//       status: 'Pending',
//     },
//     {
//       schemeid: 42257,
//       schemename: 'Digital Gujarat',
//       status: 'Waiting',
//     },
//     {
//       schemeid: 42311,
//       schemename: 'PM Sahay Yojana',
//       status: 'Waiting',
//     },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl mb-4 text-center">Government registered schemes</h2>
//       <Link to="/addscheme">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Add New Scheme</button>
//       </Link>
//       <ul className="w-full mt-4">
//         <li className="flex bg-gray-300 font-bold p-2">
//           <div className="flex-1">Scheme Id</div>
//           <div className="flex-1">Scheme Name</div>
//           <div className="flex-1">Status</div>
//           <div className="flex-1">View</div>
//         </li>
//         {tableData.map((item, index) => (
//           <li key={index} className="flex bg-white shadow-md mb-2">
//             <div className="flex-1 p-2">{item.schemeid}</div>
//             <div className="flex-1 p-2">{item.schemename}</div>
//             <div className="flex-1 p-2">{item.status}</div>
//             <div className="flex-1 p-2">
//               <Link to="/showdocuments">
//                 <button className="bg-blue-500 text-white px-2 py-1 rounded">View Applications</button>
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Table;
