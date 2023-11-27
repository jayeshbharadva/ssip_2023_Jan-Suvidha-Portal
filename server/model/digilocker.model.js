const schema = require("./digilocker.scheme");

async function adddata(data) {
  return await schema.create(data);
}

async function returndata(aadhar, docnames) {
  console.log(aadhar);
  console.log(docnames);
  const response = await schema.find({
    aadhar,
    docname: { $in: docnames },
  });
  return response;
}

module.exports = {
  adddata,
  returndata,
};
