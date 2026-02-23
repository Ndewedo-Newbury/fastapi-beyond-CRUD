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
    subject: `[CI FAIL] Bad commit message on ${process.env.GITHUB_REF}`,
    text: [
      `Commit: ${process.env.GITHUB_SHA}`,
      `Actor:  ${process.env.GITHUB_ACTOR}`,
      `Repo:   ${process.env.GITHUB_REPOSITORY}`,
      "",
      "The commit message did not follow Conventional Commits.",
      "See: https://www.conventionalcommits.org",
    ].join("\n"),
  });

  console.log("Message sent. Preview URL:", nodemailer.getTestMessageUrl(info));
}

main().catch((err) => { console.error(err); process.exit(1); });
