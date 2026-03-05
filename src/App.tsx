import { useMemo, useState } from 'react';
import './App.css';
import { parseRatings } from './sheet/parseRatings';
import { useGoogleSheetCsv } from './sheet/useGoogleSheetCsv';

export function App() {
  const { data, loading, error } = useGoogleSheetCsv();
  const ratings = useMemo(() => parseRatings(data), [data]);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  if (error) return <div className="page">Fel: {error}</div>;

  return (
    <div className="page">
      {!loading ? (
        <div className="list fadeIn">
          {ratings.map((r) => {
            const isOpen = !!open[r.restaurant];
            const visibleRows = r.rows.filter((x) => (x.total ?? 0) > 0);

            return (
              <div key={r.restaurant} className="card cardEnter">
                <button
                  type="button"
                  className="cardButton"
                  onClick={() =>
                    setOpen((p) => ({ ...p, [r.restaurant]: !p[r.restaurant] }))
                  }
                  aria-expanded={isOpen}
                >
                  <h2 className="cardTitle">{r.restaurant}</h2>
                  <div className="chev">{isOpen ? '–' : '+'}</div>
                </button>

                {isOpen ? (
                  <div className="cardBody">
                    <div className="rows">
                      {visibleRows.map((row) => (
                        <div key={row.name} className="voteCard">
                          <div className="voteTop">
                            <div className="voteName">{row.name}</div>
                            <div className="voteTotal">
                              Total {row.total ?? 0}
                            </div>
                          </div>

                          <div className="voteScores">
                            {r.categories.map((c) => (
                              <div key={c} className="scorePill">
                                <span className="scoreKey">{c}</span>
                                <span className="scoreVal">
                                  {row.scores[c] ?? 0}
                                </span>
                              </div>
                            ))}
                          </div>

                          {r.hasComments && row.comment ? (
                            <div className="voteComment">{row.comment}</div>
                          ) : null}
                        </div>
                      ))}

                      {r.totals ? (
                        <div className="voteCard totalVote">
                          <div className="voteTop">
                            <div className="voteName">Totalt</div>
                            <div className="voteTotal">
                              Total {r.totals.total}
                            </div>
                          </div>

                          <div className="voteScores">
                            {r.categories.map((c) => (
                              <div key={c} className="scorePill">
                                <span className="scoreKey">{c}</span>
                                <span className="scoreVal">
                                  {r.totals?.scores[c] ?? 0}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
