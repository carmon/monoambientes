import { fetchAvailableData, PriceRanges } from "../../../src/backend/rooms"; 

import type { Range } from "../../../src/backend/rooms";

export async function GET() {
  let html = '';
  const drawRange = (r: Range) => {
    const price = PriceRanges[r];
    return `
      <li>Por día: $${price.daily}</li>
      <li>Por mes: ${price.monthly ? '$' + price.monthly : 'NO'}</li>
    `;
  };
  (await fetchAvailableData()).forEach(v => {
    html += '<tr>';
    html += `<td>${v.unit}</td>`;
    html += `<td>Hasta ${v.capacity} persona${v.capacity > 1 ? 's' : ''}.</td>`;
    html += `<td><ul>${drawRange(v.range)}</ul></td>`;
    html += '</tr>';
  });
  return new Response(html);
}