import { getDateHTML } from '../../../src/common/dateHTML';
import type { Mode } from '../../../src/common/dateHTML';
export async function GET(req: Request) {
  const [, mode] = req.url.match(/\?mode=([a-z]+)$/);
  return new Response(getDateHTML(mode as Mode));
}