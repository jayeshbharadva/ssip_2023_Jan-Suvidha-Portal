const mongoose = require("mongoose");
const schema = require("./document.schema");

async function addus(data) {
  return await schema.create(data);
}

async function adddocument(aadhar, data, detail) {
  try {
    const result = await schema.updateOne(
      { aadhar: aadhar },
      {
        $push: {
          documents: { $each: data },
          userdetail: { $each: detail },
        },
      }
    );

    if (result.nModified === 0 && result.upserted.length === 0) {
      // No document was updated or upserted, handle this as an error
      throw new Error("No document updated or upserted");
    }

    return result;
  } catch (error) {
    // Handle and log the error
    console.error("Error in adddocument:", error);
    throw error; // Re-throw the error to be handled at a higher level or provide a custom response
  }
}

async function finduser(aadhar) {
  return await schema.findOne(
    {
      aadhar: aadhar,
    },
    { _id: 0, __v: 0, "documents._id": 0, "userdetail._id": 0 }
  );
}

async function saveotp(aadhar, otp) {
  try {
    const filter = { aadhar: aadhar };
    const update = { $set: { otp: otp } };

    const result = await schema.updateOne(filter, update);

    console.log(result);
    if (result.modifiedCount === 1) {
      // The update was successful, and one document was modified
      return true;
    } else {
      // No matching document found, or the update was not successful
      return false;
    }
  } catch (error) {
    console.error("Error in updateOtp:", error);
    return false; // Error occurred
  }
}

module.exports = {
  addus,
  adddocument,
  finduser,
  saveotp,
};
