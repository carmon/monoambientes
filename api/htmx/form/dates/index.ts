import { fetchAvailableData } from "../../../../src/backend/rooms";

export async function GET(request: Request) {
  const res = request.url.match(/\?mode=([a-z]+)&unit=([1-9])$/);
  if (res) {
    const [, mode, unit] = res;
    const current = (await fetchAvailableData()).find(r => String(r.unit) === unit);
    if (!current) return new Response('');

    const today = new Date();
    today.setDate(today.getDate() + 3);
    const future = new Date();
    future.setDate(today.getDate() + 90);
    const min = `${today.getFullYear()}-${(today.getMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${today.getDate()}`;
    const max = `${future.getFullYear()}-${(future.getMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${future.getDate()}`;
    if (mode === 'day') {
      return new Response(`
        <script>
          document.getElementById("room_select").onchange = calcDays;
        </script>
        <label>
          Fecha de ingreso
          <input id="init_date" name="init_date" onchange="calcDays()" type="date" min="${min}" max="${max}" required />
        </label>
        <label>
          Fecha de salida
          <input id="end_date" name="end_date" onchange="calcDays()"  type="date" min="${min}" max="${max}" required />
        </label>
        <label>Precio final (aproximado) <input id="price" type="text" disabled /></label>
      `);
    }
    return new Response(`
      <script>
        document.getElementById("room_select").onchange = setEndDate;
      </script>
      <label>
        Fecha de ingreso
        <input id="init_date" onchange="setEndDate()" name="init_date" type="date" min="${min}" max="${max}" required />
      </label>
      <label>
        Fecha de salida<br/>
        <input id="end_date" name="end_date" type="date" disabled />
      </label>
      <label>Precio final (aproximado) <input id="price" type="text" disabled /></label>
      <label>+ depósito de: <input id="deposit" type="text" disabled /></label>
      <br/>
      <fieldset class="note">
        Para alquileres mensuales se firma un contrato a 3 meses, que puede ser rescindido por el propietario o bajo arreglo previo.
        El depósito es obligatorio, el resto de los requisitos son: DNI y recibo de sueldo o garantía (con DNI fotocopiado). 
      </fieldset>
    `);
  }
  return new Response('');
}