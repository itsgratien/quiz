import nodemailer from 'nodemailer';
import axios from 'axios';

const sender = 'gracian2020@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: 'aakxeoncqztvwcag',
  },
});

const authenticate = async () => {
  try {
    const uri = process.env.COMMUNICATION_SERVICE_URI + '/v1/applications/auth';
    const res = await axios.post(uri, {
      app_id: process.env.COMMUNICATION_SERVICE_APP_ID ?? '',
      access_key: process.env.COMMUNICATION_SERVICE_ACCESS_KEY ?? '',
    });

    return res.data.data.token;
  } catch (error) {
    return undefined;
  }
};

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
  try {
    const token = await authenticate();

    const uri =
      process.env.COMMUNICATION_SERVICE_URI + '/v1/messages/sendEmail';

    const res = await axios.post(
      uri,
      {
        recipients: receivers,
        subject,
        html,
        text,
      },
      {
        headers: {
          'x-access-key': token,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    console.log('error:', error);
    throw new Error(error);
  }
};
