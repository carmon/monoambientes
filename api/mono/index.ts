type Price = {
  daily: number;
  monthly: number | null;
}

type Range = 'base' | 'low' | 'temp' | 'big'; 

type MonoData = {
  unit?: number;
  capacity: number;
  range: Range;
}

const PriceRanges: Record<Range, Price> = {
  base: {
    daily: 30000,
    monthly: 300000,
  },
  low: {
    daily: 20000,
    monthly: 250000,
  },
  temp: {
    daily: 40000,
    monthly: null,
  },
  big: {
    daily: 40000,
    monthly: 350000,
  }
};

const APARTMENTS: MonoData[] = [
  { capacity: 2, range: 'base'},
  { capacity: 2, range: 'base'},
  { capacity: 2, range: 'base'},
  { capacity: 2, range: 'base'},
  { capacity: 2, range: 'base'},
  { capacity: 2, range: 'temp'},
  { capacity: 3, range: 'big' },
  { capacity: 1, range: 'low' },
  { capacity: 2, range: 'base'}
];

const UNAVAILABLE = [1, 5, 9];
const FILLED = [2, 4, 7];

export async function GET() {
  const available: MonoData[] = APARTMENTS.reduce((prev, curr, it) => {
    const unit = it + 1;
    if (UNAVAILABLE.includes(unit) || FILLED.includes(unit)) return prev;
    return [...prev, { ...curr, unit }];
  }, <MonoData[]>[]);
  
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