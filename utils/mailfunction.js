"use strict";
const nodemailer = require("nodemailer");


async function main() {

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "testingicecasemail@gmail.com", // generated ethereal user
      pass: "icecase1337", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo " <testingicecasemail@gmail.com>', // sender address
    to: "analysehf@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);