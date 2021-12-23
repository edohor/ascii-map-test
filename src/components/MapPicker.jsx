import React, {useState, useEffect} from "react";
import {getMaps} from '../assets/mapExporter'

export default function MapPicker(props) {
    const [allMaps, setAllMaps] = useState();
    const [selectedMap, setSelectedMap] = useState();
    
    useEffect(() => {
        props.setMapToDisplay(selectedMap)
    }, [selectedMap])

    useEffect(() => {
        if (allMaps == null) {
            setAllMaps(getMaps());
        }
    }, [])

    return (
        <div style={{margin: '50px auto', width: '80%'}}>
            {allMaps && allMaps.map((map, index) => {
                return <button style={{height: '30px', width: '80px', margin: '5px'}} onClick={() => setSelectedMap(map)}>Map {index+1}</button>
            })}
        </div>
    )
}