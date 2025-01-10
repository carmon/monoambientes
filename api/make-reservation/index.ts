export async function POST() {
  let html = `
    <p>Gracias por hacer una reserva &#128516;</p>
    <p>nos estaremos comunicando en el plazo de <b>48 horas</b>.</p>
  `;
  return new Response(html);
}