var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


exports.sendInviteMail = async (email, token) => {
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASS
    }
  }));

  const mailTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Please activate your account</title>
    <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
  </head>
  <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <table role="presentation"
      style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
      <tbody>
        <tr>
          <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
            <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
              <tbody>
                <tr>
                  <td style="padding: 40px 0px 0px;">
                    <div style="text-align: left;">
                      <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/2N7jS4w/LogoGMI.png" alt="Orbit" style="width: 180px;">
                      </div>
                    </div>
                    <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                      <div style="color: rgb(0, 0, 0); text-align: left;">
                        <h1 style="margin: 1rem 0">Final step...</h1>
                        <p style="padding-bottom: 16px">Click button below to verify your email address.</p>
                        <p style="padding-bottom: 16px"><a href="http://localhost:3000/verifyEmail/${token}" target="_blank"
                            style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #3F8EE9;display: inline-block;margin: 0.5rem 0;">Confirm
                            now</a></p>
                        <p style="padding-bottom: 16px">If you didn’t ask to verify this address, you can ignore this email.</p>
                        <p style="padding-bottom: 16px">Thanks,<br>The Orbit team</p>
                      </div>
                    </div>
                    <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                      <p style="padding-bottom: 16px">Made with ♥ in Paris</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>`


  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email, // `techdocklabs.vaibhav@gmail.com`
    subject: `Joining Invitation From GMI Editor`,
    // text: 'That was easy!',
    html: mailTemplate
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return info.response;
    }
  });
}