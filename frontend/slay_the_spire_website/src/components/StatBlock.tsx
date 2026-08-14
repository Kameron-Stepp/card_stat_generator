import './StatBlock.css'

type Data = {
    type: string,
    number: string,
    percentage: string
}

type StatBlockProps = {
    data: Data;
};
export default function StatBlock({data}: StatBlockProps){
    return(
        <span>
            <h4>{data.type}</h4>
            <h3>{data.number}</h3>
            {data.percentage != '' && (<h4>{data.percentage}</h4>)}
        </span>
    )
}