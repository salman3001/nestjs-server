import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PortfolioService {
  async send(username: string, email: string, message: string) {
    const mailer = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASS,
      },
      secure: true,
    });

    try {
      const emialToMe = await mailer.sendMail({
        from: 'therodfighter@gmail.com',
        to: 'salman.k3001@gmail.com',
        subject: 'Email Server- new contact request',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Request</title>
</head>
<body>
    <h4>Hi Salman ! You have recieved a new contact request! </h4>
    <br>
    <p>From, Mr. ${username} !</p>
    <br><br>
    <p>Message:-</p>
    <p>${message}</p>
    <br>
    <p>Email: ${email}</p>
</body>
</html>`,
      });

      const emailToUser = await mailer.sendMail({
        from: 'therodfighter@gmail.com',
        to: email,
        subject: 'Auto Generated:- Request Recived',
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Request</title>
</head>
<body>
    <h4>Your request recieved!</h4>
    <br>
    <p>Hi, Mr. ${username} ! Thank you for submitting the contact request. I will contact you shortly.</p>
    <br><br>
    <p>Regards</p>
    <br>
    <p>Salman khan</p>
    <br>
    +971528551244
</body>
</html>
        `,
      });

      return { emialToMe, emailToUser };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'There was an on server! Please try again',
      );
    }
  }
}
