import { sendEmail } from "../../src/backend/lib/mailer";
export async function POST(request: Request) {
  const data = await request.formData();
  const mode = data.get('mode')?.toString();
  await sendEmail({
    name: data.get('name')?.toString() || '',
    email: data.get('email')?.toString() || '',
    tel: data.get('tel')?.toString() || '',
    room: Number(data.get('room')?.toString()),
    init_date: data.get('init_date')?.toString() || '',
    ...(mode === 'day' ? { end_date: data.get('end_date')?.toString() } : { month_count: Number(data.get('month_count')?.toString()) }),
  });
  return new Response(`
    <p>Gracias por hacer una reserva &#128516;</p>
    <p>nos estaremos comunicando en el plazo de <b>48 horas</b>.</p>
  `);
}