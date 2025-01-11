import { getAvailableOptions } from "../../../src/backend/apartments"; 
export async function GET() {
  return new Response(getAvailableOptions());
}