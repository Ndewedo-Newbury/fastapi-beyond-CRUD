const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'freddywitateddy@gmail.com',
  from: 'nfnewbury@dons.usfca.edu',
  subject: `[CI FAIL] Bad commit message on ${process.env.GITHUB_REF}`,
  text: [
    `Commit: ${process.env.GITHUB_SHA}`,
    `Actor:  ${process.env.GITHUB_ACTOR}`,
    `Repo:   ${process.env.GITHUB_REPOSITORY}`,
    "",
    "The commit message did not follow Conventional Commits.",
    "See: https://www.conventionalcommits.org",
  ].join("\n"),
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
