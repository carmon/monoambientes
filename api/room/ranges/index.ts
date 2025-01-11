import { getAvailableData, PriceRanges } from "../../../src/backend/apartments"; 
import type { MonoData, Range } from "../../../src/backend/apartments";
export async function GET() {
  const available: MonoData[] = getAvailableData();
  let html = '';
  const drawRange = (r: Range) => {
    const price = PriceRanges[r];
    return `
      <li>Por día: $${price.daily}</li>
      <li>Por mes: ${price.monthly ? '$' + price.monthly : 'NO'}</li>
    `;
  };
  available.forEach((v, it) => {
    html += '<tr>';
    html += `<td>${v.unit}</td>`;
    html += `<td>Hasta ${v.capacity} persona${v.capacity > 1 ? 's' : ''}.</td>`;
    html += `<td><ul style="list-style-type: none; padding-left: 16px; padding-right: 16px;" >${drawRange(v.range)}</ul></td>`;
    html += '</tr>';
  });
  return new Response(html);
}