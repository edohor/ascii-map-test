let letters = "";
let allChars = "";
let result = {};
let error = "";

export const getLayout = (map) => {
    let arr = map.split("\r\n");
    let xLength = null;
    let yLength = arr.length;
    let startCoordinates = [0, 0];
    let mappedMap = [];
    arr.forEach((line, index) => {
        for (let i = 0; i < line.length; i++) {
            if (line[i]==="@") {
                startCoordinates = [i, index];
            }
            if (i===line.length-1) {
                xLength = i;
            }
            mappedMap.push([i, index, line[i]])
        }
    })
    let layout = {
        xLength: xLength,
        yLength: yLength,
        startCoordinates: startCoordinates,
        mappedMap
    }

    return layout;
}

export const checkRightDirection = (layout, lastDirection, regEx, elementRight) => {
    let nextCoordinates = null;
    var regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    if (elementRight!=undefined && regEx.test(elementRight[2]) && lastDirection!=="left" && elementRight[2]!==" ") {
        lastDirection = "right";
        saveCharacters(elementRight[2], regExLetters)
        nextCoordinates = [elementRight[0], elementRight[1]];
        findNextCharacter(layout, nextCoordinates, lastDirection)
        return true;        
    } else {
        return false;    
    }
}

export const checkLeftDirection = (layout, lastDirection, regEx, elementLeft) => {
    let nextCoordinates = null;
    var regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    if (elementLeft!=undefined && regEx.test(elementLeft[2]) && lastDirection!=="right" && elementLeft[2]!==" ") {
        lastDirection = "left";
        saveCharacters(elementLeft[2], regExLetters)
        nextCoordinates = [elementLeft[0], elementLeft[1]];
        findNextCharacter(layout, nextCoordinates, lastDirection)
        return true;        
    } else {
        return false;    
    }
}

export const checkDownDirection = (layout, lastDirection, regEx, elementDown) => {
    let nextCoordinates = null;
    var regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    if (elementDown!=undefined && regEx.test(elementDown[2]) && lastDirection!=="up" && elementDown[2]!==" ") {
        lastDirection = "down";
        saveCharacters(elementDown[2], regExLetters)
        nextCoordinates = [elementDown[0], elementDown[1]];
        findNextCharacter(layout, nextCoordinates, lastDirection)
        return true;        
    } else {
        return false;    
    }
}

export const checkUpDirection = (layout, lastDirection, regEx, elementUp) => {
    let nextCoordinates = null;
    var regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    if (elementUp!=undefined && regEx.test(elementUp[2]) && lastDirection!=="down" && elementUp[2]!==" ") {
        lastDirection = "up";
        saveCharacters(elementUp[2], regExLetters)
        nextCoordinates = [elementUp[0], elementUp[1]];
        findNextCharacter(layout, nextCoordinates, lastDirection)
        return true;        
    } else {
        return false;    
    }
}

export const checkIfFinished = (elementCurrent) => {   
    if (elementCurrent[2]==="x") {
        return true;
    } else {
        return false;
    }
}

export const checkShouldContinueDirection = (layout, lastDirection, regEx, elementRight, elementLeft, elementDown, elementUp) => {   
    if (lastDirection && lastDirection==="right") {
        return checkRightDirection(layout, lastDirection, regEx, elementRight)
    } else if (lastDirection && lastDirection==="left") {
        return checkLeftDirection(layout, lastDirection, regEx, elementLeft)
    } else if (lastDirection && lastDirection==="down") {
        return checkDownDirection(layout, lastDirection, regEx, elementDown)
    } else if (lastDirection && lastDirection==="up") {
        return checkUpDirection(layout, lastDirection, regEx, elementUp)
    } else {
        return false;        
    }
}

export const saveCharacters = (character, regEx) => {   
    if (regEx.test(character) && character!=="x") {
        letters = letters + character;        
    }
    allChars = allChars + character;
}

export const returnError = (message) => {   
    console.log("ERROR", message);
    error = message;
}

export const findNextCharacter = (layout, lastCharCoo, lastDirectionForwarded) => {
    var regEx = new RegExp("^\|[^-\s][a-zA-Z-+]*$", "g");
    var regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    let firstElemet = layout.mappedMap.find(element => element[2] === "@");
    if (firstElemet==null) {
        returnError("Can't find first element");
    }
    let currnetCoordinates = lastCharCoo!=null ? lastCharCoo : [firstElemet[0], firstElemet[1]];
    let lastDirection = lastDirectionForwarded!=null ? lastDirectionForwarded : null;

    let elementCurrent = layout.mappedMap.find(element => element[0] === currnetCoordinates[0] && element[1] === currnetCoordinates[1]);
    let elementRight = layout.mappedMap.find(element => element[0] === currnetCoordinates[0]+1 && element[1] === currnetCoordinates[1]);
    let elementLeft = layout.mappedMap.find(element => element[0] === currnetCoordinates[0]-1 && element[1] === currnetCoordinates[1]);
    let elementDown = layout.mappedMap.find(element => element[0] === currnetCoordinates[0] && element[1] === currnetCoordinates[1]+1);
    let elementUp = layout.mappedMap.find(element => element[0] === currnetCoordinates[0] && element[1] === currnetCoordinates[1]-1);
    
    lastDirection==null && saveCharacters(elementCurrent[2], regExLetters)
    
    let finished = checkIfFinished(elementCurrent);
    let shouldContinueDirection = !finished && checkShouldContinueDirection(layout, lastDirection, regEx, elementRight, elementLeft, elementDown, elementUp);
    
    if (shouldContinueDirection===false && !finished && error==="") {
        let nextCoordinates = null;
        // horizontal check
        if (elementRight!=undefined && regEx.test(elementRight[2]) && lastDirection!=="left" && elementRight[2]!==" ") {
            // go right
            saveCharacters(elementRight[2], regExLetters)
            nextCoordinates = [elementRight[0], elementRight[1]];
            lastDirection = "right";
            findNextCharacter(layout, nextCoordinates, lastDirection)
        } else if (elementLeft!=undefined && regEx.test(elementLeft[2]) && lastDirection!=="right" && elementLeft[2]!==" ") {
            // go left
            saveCharacters(elementLeft[2], regExLetters)
            nextCoordinates = [elementLeft[0], elementLeft[1]];
            lastDirection = "left";
            findNextCharacter(layout, nextCoordinates, lastDirection)
        } 
        // vertical check
        else if (elementDown!=undefined && regEx.test(elementDown[2]) && lastDirection!=="up" && elementDown[2]!==" ") {
            // go down
            saveCharacters(elementDown[2], regExLetters)
            nextCoordinates = [elementDown[0], elementDown[1]];
            lastDirection = "down";
            findNextCharacter(layout, nextCoordinates, lastDirection)
        } else if (elementUp!=undefined && regEx.test(elementUp[2]) && lastDirection!=="down" && elementUp[2]!==" ") {
            // go up
            saveCharacters(elementUp[2], regExLetters)
            nextCoordinates = [elementUp[0], elementUp[1]];
            lastDirection = "up";
            findNextCharacter(layout, nextCoordinates, lastDirection)
        }         
    } else if (finished && error==="") {
        result = {
            letters: letters, allChars: allChars, error: error
        }
    } else if (error!=="") {
        result = {
            letters: letters, allChars: allChars, error: error
        }
    }
    letters = "";
    allChars = "";
    error = "";

    return result
}