import './RunHistory.css'
export default function RunHistory() {
    // This is for testing purposes only
    const data = []
    for (let i = 0; i < 100; i++) {
        data.push(
            [
                i + 1,
                Math.floor(Math.random() * 20),
                Math.floor(Math.random() * 3000),
                Math.floor(Math.random() * 60),
                Math.random() > 0.5 ? "Win" : "Loss"
            ]
        )
    }

    return(
        <div id="run">
            <h2>Run History</h2>
            <div id='runTable'>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Ascension</th>
                            <th>Time</th>
                            <th>Floor</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                        
                    <tbody>
                        {data.map(run => (
                            <tr>
                                {run.map(cell => (
                                    <td>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}