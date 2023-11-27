const schema = require("../model/gov.schema");

async function addusertoscheme(aadhar, schemeid, schemename, data, detail) {
  try {
    const result = await schema.updateOne(
      { aadhar: aadhar, schemeid: schemeid },
      {
        $setOnInsert: {
          aadhar: aadhar,
          schemeid: schemeid,
        },
        schemename: schemename,
        status: "Applied",
        $push: {
          documents: { $each: data },
          userdetail: { $each: detail },
        },
      },
      { upsert: true } // Set upsert option to true
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

async function userlistbyschemeid(schemeid) {
  try {
    const userlist = await schema.find(
      {
        schemeid: schemeid,
      },
      {
        _id: 0,
        __v: 0,
      }
    );
    return {
      data: userlist,
      success: true,
    };
  } catch (err) {
    console.log("Error occured while finding in DB", err);
    return {
      success: false,
    };
  }
}

async function schemelistbyaadhar(aadhar) {
  try {
    const schemelist = await schema.find(
      {
        aadhar: aadhar,
      },
      {
        _id: 0,
        __v: 0,
      }
    );
    return {
      data: schemelist,
      success: true,
    };
  } catch (err) {
    console.log("Error occured while finding in DB", err);
    return {
      success: false,
    };
  }
}

async function setstatus(aadhar, id, status, remark) {
  console.log(aadhar + " " + status + " " + remark);

  try {
    const filter = { aadhar: aadhar, schemeid: id };
    let update;

    if (status === "approved") {
      console.log("approved");
      update = { $set: { status: status } };
    } else {
      update = { $set: { status: status, remark: remark } };
    }

    const result = await schema.updateOne(filter, update);
    console.log(result);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      success: false,
    };
  }
}

module.exports = {
  addusertoscheme,
  userlistbyschemeid,
  schemelistbyaadhar,
  setstatus,
};
