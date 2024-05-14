type Price = {
  daily: number;
  monthly: number | null;
}

export type Range = 'base' | 'low' | 'temp' | 'big'; 

export type RoomData = {
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

const APARTMENTS: RoomData[] = [
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
const FILLED = [2, 4, 7, 8];

export function getAvailableData(): RoomData[] {
  return APARTMENTS.reduce((prev, curr, it) => {
    const unit = it + 1;
    if (UNAVAILABLE.includes(unit) || FILLED.includes(unit)) return prev;
    return [...prev, { ...curr, unit }];
  }, [] as RoomData[]);
};

export function getUnitPrices(): Record<number, Price> {
  return getAvailableData().reduce((prev, curr) => ({
    ...prev,
    [curr.unit || 0]: PriceRanges[curr.range],
  }), {})
}