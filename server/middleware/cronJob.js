// cronJob.js
const cron = require("node-cron");
const { updatestatuseverytime } = require("../model/schemes.model");

const setupCronJob = () => {
  console.log("cron funcion called");
  // Schedule a job to run every day at midnight in the "Asia/Kolkata" timezone
  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("Cron job started");
      await updatestatuseverytime();
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = { setupCronJob };
