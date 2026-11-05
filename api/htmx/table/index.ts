import { fetchAvailableData, PriceRanges } from "../../../src/backend/rooms"; 

export async function GET() {
  let html = '';
  (await fetchAvailableData()).forEach(v => {
    html += '<tr>';
    html += `<td>${v.unit}</td>`;
    html += `<td>Hasta ${v.capacity} persona${v.capacity > 1 ? 's' : ''}.</td>`;
    html += `<td>$${PriceRanges[v.range].daily}</td>`;
    html += '</tr>';
  });
  return new Response(html);
}