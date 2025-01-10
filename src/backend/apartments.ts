type Price = {
  daily: number;
  monthly: number | null;
}

export type Range = 'base' | 'low' | 'temp' | 'big'; 

export type MonoData = {
  unit?: number;
  capacity: number;
  range: Range;
}

export const PriceRanges: Record<Range, Price> = {
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

export function getAvailableData(): MonoData[] {
  return APARTMENTS.reduce((prev, curr, it) => {
    const unit = it + 1;
    if (UNAVAILABLE.includes(unit) || FILLED.includes(unit)) return prev;
    return [...prev, { ...curr, unit }];
  }, <MonoData[]>[]);
};

export function getAvailableOptions(): string {
  return getAvailableData().map((data: MonoData) => `<option value="${data.unit}">${data.unit} (${data.capacity} personas)</option>`).join('');
}