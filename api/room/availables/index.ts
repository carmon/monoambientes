import { getAvailableData } from "../../../src/backend/rooms"; 
export async function GET() {
  return new Response(getAvailableData().map(data => `<option value="${data.unit}">${data.unit} (${data.capacity} personas)</option>`).join(''));
}