import React, { useState } from "react";
import CustomSelect from "./govschemedropdown"; // Import the correct component
import { Navigate, useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [schemeName, setSchemeName] = useState("");
  const [schemeId, setSchemeId] = useState("");
  const [LastDate, setLastDate] = useState("");
  const [selectedOptions1, setSelectedOptions1] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);

  const handleSchemeNameChange = (e) => {
    setSchemeName(e.target.value);
  };

  const handleSchemeIdChange = (e) => {
    setSchemeId(e.target.value);
  };

  const handleLastDateChange = (e) => {
    setLastDate(e.target.value);
  };

  const handleSelectChange1 = (selectedValues) => {
    setSelectedOptions1(selectedValues);
  };

  const handleSelectChange2 = (selectedValues) => {
    setSelectedOptions2(selectedValues);
  };

  const postData = async (formData) => {
    try {
      const response = await fetch("http://localhost:3108/gov/addscheme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API response:", responseData);
        console.log(responseData.success);
        if (responseData.success) {
          navigate("/listscheme");
        } else if (responseData.success == false) {
          alert("Please try different SchemeId");
        }
      } else {
        console.error("Failed to make the API request.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastDateObject = new Date(LastDate);
    const formData = {
      schemeid: schemeId,
      schemename: schemeName,
      LastDate: lastDateObject,
      documents: selectedOptions2,
      userdetail: selectedOptions1,
    };
    console.log(formData);
    postData(formData);
  };

  const options1 = [
    "Name",
    "DOB",
    "Address",
    "City",
    "State",
    "Mobile No",
    "Email",
  ];
  const options2 = [
    "Aadhar Card",
    "Pan Card",
    "Voter ID Card",
    "Passport",
    "Driving License",
    "Bank Passbook",
    "Income Certificate",
    "Residence/Address Proof",
    "SSC Marksheet",
    "HSC Certificate",
    "Diploma Certificate",
    "Bachelor Degree Certificte",
    "Master Degree Certificate",
    "Domicile Certificate",
    "Application Form",
    "Death Certificate",
    "Caste Certificate",
    "Non-Creamy Layer Certificate",
    "Admission Letter",
    "Passport Photo",
    "PwD Certificate",
    "Bonafide Certificate",
    "BPL Card",
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-green-200 font-sans">
      <div className="bg-white border rounded-lg p-6 w-1/2 mx-auto shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Scheme Generation
        </h2>

        <div className="mb-4">
          <label htmlFor="schemeId" className="block font-bold text-lg">
            Scheme Id
          </label>
          <input
            type="number"
            id="schemeId"
            className="w-full p-2 border rounded-md"
            value={schemeId}
            onChange={handleSchemeIdChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="schemeName" className="block font-bold text-lg">
            Scheme Name
          </label>
          <input
            type="text"
            id="schemeName"
            className="w-full p-2 border rounded-md"
            value={schemeName}
            onChange={handleSchemeNameChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="LastDate" className="block font-bold text-lg">
            Last Date to Apply
          </label>
          <input
            type="Date"
            id="LastDate"
            className="w-full p-2 border rounded-md"
            value={LastDate}
            onChange={handleLastDateChange}
          />
        </div>

        <div className="mb-4 text-[#979797]">
          <CustomSelect
            listname="Select Personal Details"
            options={options1}
            onSelectedChange={handleSelectChange1}
          />
        </div>

        <div className="mb-4 text-[#979797]">
          <CustomSelect
            listname="Select Required Documents"
            options={options2}
            onSelectedChange={handleSelectChange2}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#19514F] text-white font-bold py-2 px-4 rounded-full hover:bg-[#379683] hover:text-[#ffffff]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
