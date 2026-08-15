import { useState } from 'react'
import './RunHistory.css'
import { formatTime } from './helpers/formating'
import type { RunHistoryProps } from './helpers/typing'

export default function RunHistory({runs}: RunHistoryProps)  {  

    const [sortBy, setSortBy] = useState('Ascension')

    const sortedRuns = [...runs].sort((a, b) => {
        switch (sortBy) {
            case "Wins":
                return b.won - a.won;

            case "Ascension":
                return b.ascension - a.ascension;

            case "Time":
                return b.run_time_seconds - a.run_time_seconds;

            default:
                return 0;
        }
    });

    return (
        <>
            <div id="top_history">
                <h2>Run History</h2>
                <h2 id="select">Sort By
                <select value={sortBy} onChange={(e) => {setSortBy(e.target.value)}}>
                    <option value="Wins">Wins</option>
                    <option value="Ascension">Ascension</option>
                    <option value="Time">Time</option>

                </select>
                </h2>
            </div>
            <div id="runTable">
                <table>
                    <thead>
                        <tr>
                            <th>Ascension</th>
                            <th>Time</th>
                            <th>Floor</th>
                            <th>Result</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedRuns.map((run, index) => (
                            <tr key={index}>
                                <td>{run.ascension}</td>
                                <td>{formatTime(run.run_time_seconds)}</td>
                                <td>{run.floor_reached}</td>
                                {run.won ? <td className='win'>Win</td> : <td className='loss'>Loss</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}