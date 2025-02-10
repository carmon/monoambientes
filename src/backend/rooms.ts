type Price = {
  daily: number;
  monthly: number | null;
}

export type Range = 'base' | 'low' | 'temp' | 'big'; 

export type RoomData = {
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

type Reservation = {
  unit: string;
  available: boolean;
  start_date: Date;
  end_date: Date;
};
type Room = RoomData & { unit: string };

export async function fetchAvailableData(): Promise<Room[]> { 
  try {
    const result = await fetch(
      `https://api.notion.com/v1/blocks/${process.env.NT_BLOCK}/children`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Notion-Version': '2022-06-28',
          Authorization: `Bearer ${process.env.NT_TOKEN}`,
        }
      }
    );
    const { results: [_, ...rows] } = await result.json();
    const reservations: Reservation[] = rows.map(r => {
      const [[unitName], [availability], [dateCell]] = r.table_row.cells;
      const available = availability.plain_text === 'Si';
      const date = dateCell?.mention?.date;
      return {
        unit: unitName.plain_text,
        available,
        ...(available ? { start_date: new Date(date.start), end_date: new Date(date.end) } : {}),
      };
    });
    const now = Date.now();
    return reservations
      .filter(r => r.available && !(now > r.start_date.getTime() && now < r.end_date.getTime()))
      .map(({ unit }) => ({ unit, ...APARTMENTS[Number(unit)-1] }));
  } catch (error) {
    console.log('Error fetching Notion data', error.message);
    return [];
  }
} 

export async function getUnitPrices(block, token): Promise<Record<number, Price>> {
  process.env.NT_BLOCK = block;
  process.env.NT_TOKEN = token;
  return (await fetchAvailableData()).reduce((prev, curr) => ({
    ...prev,
    [curr.unit || 0]: PriceRanges[curr.range],
  }), {})
}