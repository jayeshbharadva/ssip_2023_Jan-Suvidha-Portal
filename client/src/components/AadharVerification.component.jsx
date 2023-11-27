import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AadharVerification() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [displayAadharForm, setDisplayAadharForm] = useState(true);
  const [displayOtpForm, setDisplayOtpForm] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const { schemeId } = useParams();
  const navigate = useNavigate();

  const handleAadharSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3108/document/sendotp", {
        method: "POST",
        body: JSON.stringify({ aadhar: aadharNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setMessage(data.message);
      setDisplayAadharForm(false);
      setDisplayOtpForm(true);
    } catch (error) {
      setMessage("Aadhar verification failed. Please try again.");
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3108/document/validation",
        {
          method: "POST",
          body: JSON.stringify({
            aadhar: aadharNumber,
            otp: otp,
            schemeid: schemeId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setDisplayResult(true);
      navigate("/documentupload", { state: { data: data } });
    } catch (error) {
      console.log("catch");
      setMessage("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-green-200 font-sans">
      <div className="max-w-md mx-auto bg-white p-5 w-1/3 rounded shadow-md text-left">
        <div className={displayAadharForm ? "block" : "hidden"}>
          <label htmlFor="aadhar" className="block mb-2 font-medium text-lg">
            Enter Aadhar Number:
          </label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            title="Aadhar Card should be 12 digits"
            required
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleAadharSubmit}
            className="p-2 rounded bg-[#19514F] text-white hover:bg-[#379683] hover:text-[#ffffff] w-full"
          >
            Submit Aadhar Number
          </button>
        </div>

        <div className={displayOtpForm ? "block" : "hidden"}>
          <label htmlFor="otp" className="block mb-2">
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            title="OTP should be 6 digits"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleOTPSubmit}
            className="p-2 rounded bg-[#19514F] text-white hover:bg-[#379683] hover:text-[#ffffff] w-full"
          >
            Submit OTP
          </button>
        </div>

        <div className={displayResult ? "block" : "hidden"}>
          <p id="response-message" className="mt-4">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AadharVerification;
