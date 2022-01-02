import React, {useState, useEffect} from "react";
import {getLayout, findNextCharacter} from '../helpers/pathHelper'

export default function Results(props) {
    const [selectedMap, setSelectedMap] = useState();
    const [resolvedMap, setResolvedMap] = useState();
    const [layout, setLayout] = useState();
    const [letters, setLetters] = useState("");
    const [allCharacters, setAllCharacters] = useState("");
    const [result, setResult] = useState();

    fetch(props.map)
    .then((r) => r.text())
    .then(text  => {
        setSelectedMap(text);
    })  

    useEffect(() => {
        if (selectedMap != null) {
            setLayout(getLayout(selectedMap));
        }
    }, [selectedMap])

    useEffect( () => {
        function getResult() {
            setResult(findNextCharacter(layout, null, null));
            setResolvedMap(selectedMap);
        }
        if (layout &&  layout.mappedMap.length<300 && resolvedMap!==selectedMap) {
            getResult()
        }
    }, [layout]) 

    return (
        <div style={{margin: '50px auto', width: '80%'}}>
            <div style={{marginBottom: '5px'}}>Letters:</div>
            <div style={{marginBottom: '20px'}}>{result && result.letters}</div>
            <div style={{marginBottom: '5px'}}>All characters:</div>
            <div>{result && result.allChars}</div>
            {result && result.error!=="" && <div style={{marginTop: '20px'}}>ERROR: {result.error}</div>}
        </div>
    )
}