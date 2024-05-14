import { getAvailableData, PriceRanges } from "../../../src/backend/rooms"; 
import type { RoomData, Range } from "../../../src/backend/rooms";
export async function GET() {
  const available: RoomData[] = getAvailableData();
  let html = '';
  const drawRange = (r: Range) => {
    const price = PriceRanges[r];
    return `
      <li>Por día: $${price.daily}</li>
      <li>Por mes: ${price.monthly ? '$' + price.monthly : 'NO'}</li>
    `;
  };
  available.forEach(v => {
    html += '<tr>';
    html += `<td>${v.unit}</td>`;
    html += `<td>Hasta ${v.capacity} persona${v.capacity > 1 ? 's' : ''}.</td>`;
    html += `<td><ul>${drawRange(v.range)}</ul></td>`;
    html += '</tr>';
  });
  return new Response(html);
}