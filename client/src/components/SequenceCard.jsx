import React from 'react'

function SequenceCard(props) {
    return (
        <div className="sequenceCard">
            <h1 className="subHeading">{props.type}</h1>
            {props.data && props.data.map((row) => {
                return (
                    <div className="sequenceCardRows">
                        {row.image ? <img src={row.image} alt="" /> : <> </>}
                        {props.type === "Ingredients" ? <> </> : <h2 className="subHeading2"> {`${props.title} ${row.seq}`} </h2>}
                        <p className="mainText">
                            {props.type === "Ingredients" ? `${row.quantity} ${row.measure} ${row.name}` : row.description}
                        </p>
                        {row.note && <p className="mainText">{`* ${row.note}`}</p>}
                    </div>
                )})}
        </div>
    )
}

export default SequenceCard
