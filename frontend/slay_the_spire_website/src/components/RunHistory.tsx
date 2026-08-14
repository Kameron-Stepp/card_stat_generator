import './RunHistory.css'
import type { RunHistoryProps } from './helpers/typing'

export default function RunHistory({runs}: RunHistoryProps)  {  

    return (
        <>
            <div id="top_history">
                <h2>Run History</h2>
                <h2 id="select">Sort By
                <select>
                    <option value="Wins">Wins</option>
                    <option value="Ascension">Ascension</option>
                    <option value="time">Time</option>

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
                        {runs.map((run, index) => (
                            <tr key={index}>
                                <td>{run.ascension}</td>
                                <td>{run.run_time_seconds}</td>
                                <td>{run.floor_reached}</td>
                                <td>{run.won}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}