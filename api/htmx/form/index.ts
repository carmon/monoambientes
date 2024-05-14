import { getAvailableData, PriceRanges } from "../../../src/backend/rooms";
import type { RoomData } from "../../../src/backend/rooms";

export async function GET(request: Request) {
  const res = request.url.match(/\?mode=([a-z]+)$/);
  if (res) {
    const [, mode] = res;
    const available: RoomData[] = getAvailableData();
    const options = available.filter(v => mode === 'month' ? PriceRanges[v.range].monthly !== null : true);
    return new Response(`
      <label>
        Departamento
        <select id="room_select" name="room">
          ${options.map(data => `<option value="${data.unit}">${data.unit} (${data.capacity} personas)</option>`).join('')}
        </select>
      </label>
      <div hx-get="/api/htmx/form/dates?mode=${mode}&unit=${available[0].unit}" hx-target="this" hx-trigger="load once"></div>
      <button type="submit">Reservar</button>
    `);
  }
  return new Response('');
}