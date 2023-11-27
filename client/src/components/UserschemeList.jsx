// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Token = localStorage.getItem("token");

// function Userschemelist() {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3108/document/getscheme",
//           {
//             method: "GET",
//             headers: {
//               Authorization: "Bearer " + Token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const res = await response.json();
//         setTableData(res.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mx-auto max-w-screen-lg px-4 mt-8">
//       <h2 className="text-2xl mb-8 text-center">Applied schemes</h2>
//       <ul className="flex flex-col w-full">
//         <li className="flex justify-between items-center bg-gray-300 p-4 font-bold">
//           <div className="w-1/6">Scheme Id</div>
//           <div className="w-2/6">Scheme Name</div>
//           <div className="w-1/6">Status</div>
//           <div className="w-2/6">Remark</div>
//         </li>
//         {tableData.map((item, index) => (
//           <li
//             key={index}
//             className="flex justify-between items-center bg-white shadow-md p-4 my-4 rounded"
//           >
//             <div className="w-1/6" data-label="Scheme Id">
//               {item.schemeid}
//             </div>
//             <div className="w-2/6" data-label="Scheme Name">
//               {item.schemename}
//             </div>
//             <div className="w-1/6" data-label="Status">
//               {item.status}
//             </div>
//             <div className="w-2/6" data-label="Remark">
//               {item.remark}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Userschemelist;

import React, { useState, useEffect } from "react";
const Token = localStorage.getItem("token");
console.log(Token);

function Userschemelist() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3108/document/getscheme",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const res = await response.json();
        console.log(res.data);
        setTableData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-lg px-4 mt-8">
      <h2 className="text-2xl mb-8 text-center">Applied schemes</h2>
      <ul className="flex flex-col w-full">
        <li className="flex justify-between items-center bg-gray-300 p-4 font-bold">
          <div className="w-1/6">Scheme Id</div>
          <div className="w-2/6">Scheme Name</div>
          <div className="w-1/6">Status</div>
          <div className="w-2/6">Remark</div>
        </li>
        {tableData.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white shadow-md p-4 my-4 rounded"
          >
            <div className="w-1/6" data-label="Scheme Id">
              {item.schemeid}
            </div>
            <div className="w-2/6" data-label="Scheme Name">
              {item.schemename}
            </div>
            <div className="w-1/6" data-label="Status">
              {item.status}
            </div>
            <div className="w-2/6" data-label="Remark">
              {item.remark}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Userschemelist;
