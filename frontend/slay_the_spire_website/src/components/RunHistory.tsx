import './RunHistory.css'

export default function RunHistory() {
    const data = []

    for (let i = 0; i < 100; i++) {
        data.push([
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 3000),
            Math.floor(Math.random() * 60),
            Math.random() > 0.5 ? "Win" : "Loss"
        ])
    }

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
                        {data.map((run, index) => (
                            <tr key={index}>
                                {run.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}