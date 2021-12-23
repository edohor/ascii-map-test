import React, {useState, useEffect} from "react";

export default function MapDisplay(props) {
    const [selectedMap, setSelectedMap] = useState();

    useEffect(() => {
        if (props.map!=undefined) {
            fetch(props.map)
            .then((r) => r.text())
            .then(text  => {
                setSelectedMap(text);
            })  
        }
    }, [props])
    

    return (
        <div style={{margin: '50px auto', width: '80%'}}><textarea cols="20" rows="10" value={selectedMap}></textarea></div>
    )
}