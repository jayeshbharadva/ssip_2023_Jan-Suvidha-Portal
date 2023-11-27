const schema = require("./schemes.schema");

async function addscheme(data) {
  console.log(data);
  try {
    await schema.create(data);
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.code,
    };
  }
}

async function getallscheme() {
  return await schema.find({}, { _id: 0, __v: 0 });
}

async function getschemebyid(id) {
  return await schema.findOne({ schemeid: id }, { _id: 0, __v: 0 });
}

async function updatestatuseverytime() {
  console.log("cron function change is called ");
  try {
    const currentDate = new Date();

    // Find schemes with LastDate in the past and status not completed
    const expiredSchemes = await schema.find({
      LastDate: { $lt: currentDate },
      status: { $ne: "completed" },
    });
    console.log(expiredSchemes);
    // Update the status of expired schemes
    await Promise.all(
      expiredSchemes.map(async (scheme) => {
        scheme.status = "completed";
        await scheme.save(); // Use scheme.save() instead of schema.save()
      })
    );
    console.log("Scheme status updated successfully");
  } catch (err) {
    console.log("error during db call", err);
  }
}

module.exports = {
  addscheme,
  getallscheme,
  getschemebyid,
  updatestatuseverytime,
};
