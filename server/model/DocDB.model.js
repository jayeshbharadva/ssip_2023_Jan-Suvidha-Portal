const schema = require("./DocDB.schema");

async function MakeDOClist(data) {
  return await schema.create(data);
}

async function FindDocument(number, docname, name) {
  console.log(number + " " + name);
  try {
    const response = await schema.findOne(
      {
        docnumber: number,
        docname: docname,
        name: name,
      },
      {
        _id: 0,
        __v: 0,
      }
    );
    return response;
  } catch (err) {
    console.log("error during db fetch", err);
  }
}

module.exports = {
  MakeDOClist,
  FindDocument,
};
