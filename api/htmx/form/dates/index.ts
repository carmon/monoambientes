import { getAvailableData } from "../../../../src/backend/rooms";
import type { RoomData } from "../../../../src/backend/rooms";

export async function GET(request: Request) {
  const res = request.url.match(/\?mode=([a-z]+)&unit=([1-9])$/);
  if (res) {
    const [, mode, unit] = res;
    const current: RoomData | undefined = getAvailableData().find(r => String(r.unit) === unit);
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
        Cantidad de meses
        <select id="month_count" onchange="setEndDate()" name="month_count" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3 (máximo)</option>
        </select>
      </label>
      <label>
        Fecha de salida<br/>
        <input id="end_date" name="end_date" type="date" disabled />
      </label>
      <label>Precio final (aproximado) <input id="price" type="text" disabled /></label>
      <label>+ depósito de: <input id="deposit" type="text" disabled /></label>
    `);
  }
  return new Response('');
}