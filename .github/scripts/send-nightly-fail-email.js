const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: process.env.ETHEREAL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: `[NIGHTLY FAIL] Build/tests failed on ${process.env.GITHUB_REF}`,
    text: [
      `Commit: ${process.env.GITHUB_SHA}`,
      `Actor:  ${process.env.GITHUB_ACTOR}`,
      `Repo:   ${process.env.GITHUB_REPOSITORY}`,
      "",
      "The nightly build or test suite has failed.",
      `See the run at: https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
    ].join("\n"),
  });

  console.log("Message sent. Preview URL:", nodemailer.getTestMessageUrl(info));
}

main().catch((err) => { console.error(err); process.exit(1); });
