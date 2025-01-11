import { getDateHTML } from '../../../src/common/dateHTML';
import type { Mode } from '../../../src/common/dateHTML';
export async function GET(req: Request) {
  const res = req.url.match(/\?mode=([a-z]+)$/);
  if (res) {
    const [, mode] = res;
    return new Response(getDateHTML(mode as Mode));
  }
  return new Response('');
}