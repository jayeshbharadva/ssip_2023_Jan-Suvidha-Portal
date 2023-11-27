const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const { initializeApp } = require("firebase/app");
require("dotenv").config();
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../middleware/config");
initializeApp(config.firebaseConfig);
const storage = getStorage();

const secretkey = process.env.JWT_SECRETKEY;
const accountSid = process.env.TWILLIO_accountSid;
const authToken = process.env.TWILLIO_authToken;
const client = require("twilio")(accountSid, authToken);

const {
  addus,
  adddocument,
  finduser,
  saveotp,
} = require("../model/document.model");

const { getschemebyid } = require("../model/schemes.model");

const {
  addusertoscheme,
  userlistbyschemeid,
  schemelistbyaadhar,
} = require("../model/gov.model");

var schemeresponse;

async function sendotp(req, res) {
  console.log("backend called");
  // Step 1: Generate a random OTP
  const otp = generateOTP(6);
  console.log(otp);

  // Step 2: Store the OTP in the database
  const data = req.body;
  const aadhar = data.aadhar;

  try {
    const response = await finduser(aadhar);

    // Step 3: Check if the user exists
    if (!response) {
      console.log("Please varify aadhar");
      return res.json({
        success: false,
        message: "Please Verify your Aadhar Number",
      });
    }

    // Step 4: Prepare the phone number
    const numbertosend = "+91" + response.number;

    // Step 5: Send the OTP via Twilio
    await client.messages
      .create({
        body: `Your OTP is: ${otp}`, // Include the generated OTP
        messagingServiceSid: process.env.TWILLIO_messagingServiceSid,
        to: numbertosend,
      })
      .then(async (message) => {
        console.log("Message sent:", message.sid);

        // Step 6: Call your async custom function here and await its response
        const customFunctionResponse = await saveotp(aadhar, otp);

        // Step 7: Check the response and return the appropriate result
        if (customFunctionResponse === true) {
          console.log("otp sent");
          return res.json({
            success: true,
            message: "OTP sent successfully",
          });
        } else {
          console.log("try again");
          return res.json({
            success: false,
            message: "Try again",
          });
        }
      })
      .catch((error) => {
        console.log("Error in sending message:", error);
        // Step 8: Handle errors and return an error response
        return res.json({
          success: false,
          message: "Error sending OTP",
        });
      });
  } catch (error) {
    console.error("Error in sendotp:", error);
    // Step 8: Handle errors and return an error response
    return res.json({
      success: false,
      message: "Error sending OTP",
    });
  }
}

async function varifyuser(req, res) {
  const { aadhar, otp, schemeid } = req.body;
  console.log(aadhar);
  const userresponse = await finduser(aadhar);
  console.log(userresponse);
  const name = userresponse.name;
  console.log(name);
  console.log(userresponse);
  if (!userresponse) {
    console.log("user not found!!");
    return res.status(401).json({
      message: "Some error occured!! Please try again",
      success: false,
    });
  }
  if (userresponse.otp != otp) {
    return res.status(400).json({
      message: "Please Enter COrrect OTP",
      success: false,
    });
  } else {
    console.log("opt match");
    schemeresponse = await getschemebyid(schemeid);
    const schemedocument = schemeresponse.documents;
    const userdocument = userresponse.documents;
    const schemedetail = schemeresponse.userdetail;
    const userdetail = userresponse.userdetail;
    let matched, unmatched;
    if (userdocument === null) {
      matched = {};
      unmatched = schemedocument;
    } else {
      [matched, unmatched] = filterAndReturn(userdocument, schemedocument);
    }
    const [matcheddetail, unmatcheddetail] = filterAndReturndetail(
      userdetail,
      schemedetail
    );
    console.log(matcheddetail);
    console.log(unmatcheddetail);

    const payload = {
      aadhar: aadhar,
      name: name,
      role: "user",
    };

    const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Otp match",
      token: token,
      matcheddoc: matched,
      unmatcheddoc: unmatched,
      matcheddetail: matcheddetail,
      unmatcheddetail: unmatcheddetail,
      success: true,
    });
  }
}

async function varifyotp(req, res) {
  const { aadhar, otp } = req.body;
  console.log(aadhar + " " + otp);
  const userresponse = await finduser(aadhar);
  const name = userresponse.name;
  if (!userresponse) {
    console.log("user not found!!");
    return res.status(401).json({
      message: "Some error occured!! Please try again",
      success: false,
    });
  }
  if (userresponse.otp != otp) {
    return res.status(400).json({
      message: "Please Enter COrrect OTP",
      success: false,
    });
  } else {
    console.log("opt match");
    const payload = {
      aadhar: aadhar,
      name: name,
      role: "user",
    };
    const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Otp match",
      token: token,
      success: true,
    });
  }
}
async function documentupload(req, res) {
  console.log("backend");
  const aadhar = res.user.aadhar;
  console.log(aadhar);
  const formData = req.body;

  var userdetails;
  if (formData.details) {
    try {
      userdetails = JSON.parse(formData.details);
    } catch (error) {
      console.error("Error parsing details array:", error);
      return res.status(400).send("Bad Request");
    }
  }
  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      const storageRef = ref(storage, `files/${file.originalname}`);

      // Create file metadata including the content type
      const metadata = {
        contentType: file.mimetype,
      };

      // Upload the file to the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );
      // Get the public URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      uploadedFiles.push({
        docname: file.originalname,
        doclink: downloadURL,
      });
    }
    console.log(uploadedFiles);
    console.log("Files successfully uploaded.");
    console.log("userdetail in this is ", userdetails);
    const response = await adddocument(aadhar, uploadedFiles, userdetails);
    console.log("document upload reposne", response);
    await adddatatogovdb(aadhar);
    return res.send({
      message: "Files uploaded to Firebase Storage",
      uploadedFiles,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).send(error.message);
  }
}

async function adduser(req, res) {
  const body = req.body;
  console.log(body);
  const response = await addus(body);
  console.log(response);
}

async function document(req, res) {
  const body = req.body;
  // const body = [
  //   {
  //     docname: "aadhar",
  //     doclink: "jjj",
  //   },
  //   {
  //     docname: "pan",
  //     doclink: "jjj",
  //   },
  // ];
  const aadhar = 1234;
  console.log(body);
  const detail = [
    {
      name: "pan",
      value: "no",
    },
  ];
  const response = await adddocument(aadhar, body, detail);
  console.log(response);
}

async function find(req, res) {
  const { aadhar } = req.body;
  const response = await finduser(aadhar);
  console.log(response);
}

async function showappliedschmes(req, res) {
  const aadhar = res.user.aadhar;
  console.log(aadhar);
  const response = await schemelistbyaadhar(aadhar);
  if (response.success === false) {
    return res.status(400).json({
      message: "Database problem",
      success: false,
    });
  }
  const data = response.data;
  return res.json({
    data: response.data,
    success: true,
  });
}

async function showlistofuser(req, res) {
  const { schemeid } = req.body;
  console.log(schemeid);
  const response = await userlistbyschemeid(schemeid);
  console.log(response);
  return res.status(200).json({
    data: response,
  });
}

function generateOTP(length) {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    OTP += digits[randomIndex];
  }

  return OTP;
}

function filterAndReturn(userdocument, schemedocuments) {
  const matched = userdocument.filter((userdoc) =>
    schemedocuments.includes(userdoc.docname)
  );
  const unmatched = schemedocuments.filter(
    (document) => !userdocument.some((doc) => doc.docname === document)
  );

  return [matched, unmatched];
}

function filterAndReturndetail(userdocument, schemedocuments) {
  const matched = userdocument.filter((userdoc) =>
    schemedocuments.includes(userdoc.name)
  );
  const unmatched = schemedocuments.filter(
    (document) => !userdocument.some((doc) => doc.name === document)
  );

  return [matched, unmatched];
}

async function adddatatogovdb(aadhar) {
  console.log(aadhar);
  const userresponse = await finduser(aadhar);
  console.log(schemeresponse);
  const schemedocument = schemeresponse.documents;
  const userdocument = userresponse.documents;
  const schemedetail = schemeresponse.userdetail;
  const userdetail = userresponse.userdetail;

  const [matcheddocument, unmatcheddocument] = filterAndReturn(
    userdocument,
    schemedocument
  );
  const [matcheddetail, unmatcheddetail] = filterAndReturndetail(
    userdetail,
    schemedetail
  );

  console.log("documentindidefunction", matcheddocument);
  console.log("detail inside function", matcheddetail);
  console.log(schemeresponse);
  const response = await addusertoscheme(
    aadhar,
    schemeresponse.schemeid,
    schemeresponse.schemename,
    matcheddocument,
    matcheddetail
  );
  console.log("resposne of user add is::", response);
}

module.exports = {
  sendotp,
  varifyuser,
  varifyotp,
  documentupload,
  adduser,
  document,
  find,
  showappliedschmes,
  showlistofuser,
};
