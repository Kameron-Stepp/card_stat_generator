import './StatBlock.css'

export default function StatBlock({data}) {
    return(
        <span>
            <h4>{data.type}</h4>
            <h3>{data.number}</h3>
            {data.percentage != null && (<h4>{data.percentage}</h4>)}
        </span>
    )
}