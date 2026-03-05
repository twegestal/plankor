import { useEffect, useState } from 'react';

function parseCsv(text: string): string[][] {
  return text
    .replace(/\r/g, '')
    .split('\n')
    .map((row) => row.trimEnd())
    .filter((row) => row.length > 0)
    .map((row) => row.split(/\t|,/g).map((cell) => cell.trim()));
}

export function useGoogleSheetCsv() {
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const url =
      'https://docs.google.com/spreadsheets/d/1-EIVc_TxYcESzluoEaI_DTnbjb9igdeeCkFB6SWjfnY/export?format=csv&gid=0';

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const text = await res.text();
        const rows = parseCsv(text);

        if (!cancelled) setData(rows);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
