const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'freddywitateddy@gmail.com',
  from: 'nfnewbury@dons.usfca.edu',
  subject: `[NIGHTLY FAIL] Build/tests failed on ${process.env.GITHUB_REF}`,
  text: [
    `Commit: ${process.env.GITHUB_SHA}`,
    `Actor:  ${process.env.GITHUB_ACTOR}`,
    `Repo:   ${process.env.GITHUB_REPOSITORY}`,
    "",
    "The nightly build or test suite has failed.",
    `See the run at: https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
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
