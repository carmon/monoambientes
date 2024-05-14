import * as nodemailer from 'nodemailer';

type Reserve = {
  name: string;
  email: string;
  tel: string;
  room: number;
  init_date: string;
  end_date?: string;
  month_count?: number;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail(data: Reserve) {
  const info = await transporter.sendMail({
    from: `"Monoambientes Orlando" <${process.env.MAIL_FROM}>`, // sender address
    to: process.env.MAIL_TO,
    subject: "NUEVA RESERVA - Monoambientes Orlando",
    html: `
      <h1>NUEVA RESERVA - Monoambientes Orlando</h1>
      <table>
        <tbody>
          <tr><td><b>Nombre</b></td><td>${data.name}</td></tr>
          <tr><td><b>Email</b></td><td>${data.email}</td></tr>
          <tr><td><b>Telefono</b></td><td>${data.tel}</td></tr>
          <tr><td><b>Monoambiente</b></td><td>${data.room}</td></tr>
          <tr><td><b>Fecha de Inicio</b></td><td>${data.init_date}</td></tr>
          ${data.end_date ? `<tr><td><b>Fecha de Salida</b></td><td>${data.end_date}</td></tr>` : ''}
          ${data.month_count ? `<tr><td><b>Cantidad de Meses</b></td><td>${data.month_count}</td></tr>` : ''}
        </tbody>
      </table>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};