import nodemailer from 'nodemailer';

const sender = 'gracian2020@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: 'aakxeoncqztvwcag',
  },
});

export const sendEmail = async ({
  subject,
  text,
  html,
  receivers,
}: {
  subject: string;
  text?: string;
  html?: string;
  receivers?: string[];
}) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: sender, // sender address
    to: receivers, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
};
