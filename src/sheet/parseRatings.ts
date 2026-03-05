export type RatingRow = {
  name: string;
  scores: Record<string, number>;
  total: number;
  comment?: string;
  isTotalRow?: boolean;
};

export type RestaurantRating = {
  restaurant: string;
  categories: string[];
  hasComments: boolean;
  rows: RatingRow[];
  totals?: RatingRow;
};

function toNumber(value: string | undefined): number {
  if (!value) return 0;
  const n = Number(value.replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function trimTrailingEmpties(row: string[]) {
  const r = row.map((c) => (c ?? '').trim());
  while (r.length > 0 && r[r.length - 1] === '') r.pop();
  return r;
}

function isHeaderRow(row: string[]) {
  const joined = row.join(' ').toLowerCase();
  return (
    joined.includes('kött') &&
    joined.includes('duchesse') &&
    joined.includes('tillbehör') &&
    joined.includes('helhet') &&
    joined.includes('total')
  );
}

export function parseRatings(rows: string[][]): RestaurantRating[] {
  const result: RestaurantRating[] = [];
  let current: RestaurantRating | null = null;

  for (const raw of rows) {
    const r = trimTrailingEmpties(raw);

    if (!r[0]) continue;

    if (isHeaderRow(r)) {
      const restaurant = r[0];

      const last = (r[r.length - 1] ?? '').toLowerCase();
      const hasComments = last === 'kommentarer';

      const categories = r.slice(1, hasComments ? r.length - 2 : r.length - 1);

      current = {
        restaurant,
        categories,
        hasComments,
        rows: [],
      };

      result.push(current);
      continue;
    }

    if (!current) continue;

    const name = r[0];

    if (name.toLowerCase() === 'totalt') {
      const scores: Record<string, number> = {};
      current.categories.forEach((cat, idx) => {
        scores[cat] = toNumber(r[idx + 1]);
      });

      const totalIndex = 1 + current.categories.length;
      const total = toNumber(r[totalIndex]);

      current.totals = {
        name: 'Totalt',
        scores,
        total,
        isTotalRow: true,
      };

      continue;
    }

    const scores: Record<string, number> = {};
    current.categories.forEach((cat, idx) => {
      scores[cat] = toNumber(r[idx + 1]);
    });

    const totalIndex = 1 + current.categories.length;
    const total = toNumber(r[totalIndex]);
    const comment = current.hasComments ? r[totalIndex + 1] : undefined;

    current.rows.push({
      name,
      scores,
      total,
      comment: comment || undefined,
    });
  }

  return result;
}
