import { getAvailableData, PriceRanges } from "../../../src/backend/rooms";
import { getDateHTML } from '../../../src/common/dateHTML';

import type { MonoData } from "../../../src/backend/rooms";
import type { Mode } from '../../../src/common/dateHTML';

export async function GET(request: Request) {
  const res = request.url.match(/\?mode=([a-z]+)$/);
  if (res) {
    const [, mode] = res;
    const available: MonoData[] = getAvailableData();
    const options = available.filter(v => mode === 'month' ? PriceRanges[v.range].monthly !== null : true);
    return new Response(`
      <label>
        Departamento
        <select name="room">
          ${options.map(data => `<option value="${data.unit}">${data.unit} (${data.capacity} personas)</option>`).join('')}
        </select>
      </label>
      ${getDateHTML(mode as Mode)}
      <label>Precio final (aproximado) <input id="price" type="text" disabled /></label>
      </fieldset>
      <button type="submit">Reservar</button>
    `);
  }
  return new Response('');
}