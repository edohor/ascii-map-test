let letters = "";
let allChars = "";
let result = {};
let error = "";
let letterCoordinates = [];
let starts = [];
let ends = [];

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
    starts = layout.mappedMap.filter(element => element[2] === "@")
    ends = layout.mappedMap.filter(element => element[2] === "x")

    return layout;
}

export const checkRightDirection = (layout, lastDirection, regEx, elementRight) => {
    let nextCoordinates = null;
    var regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    if (elementRight!=undefined && regEx.test(elementRight[2]) && lastDirection!=="left" && elementRight[2]!==" " && elementRight[2]!=="|") {
        lastDirection = "right";
        saveCharacters(elementRight, regExLetters)
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
    if (elementLeft!=undefined && regEx.test(elementLeft[2]) && lastDirection!=="right" && elementLeft[2]!==" " && elementLeft[2]!=="|") {
        lastDirection = "left";
        saveCharacters(elementLeft, regExLetters)
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
    if (elementDown!=undefined && regEx.test(elementDown[2]) && lastDirection!=="up" && elementDown[2]!==" " && elementDown[2]!=="-") {
        lastDirection = "down";
        saveCharacters(elementDown, regExLetters)
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
    if (elementUp!=undefined && regEx.test(elementUp[2]) && lastDirection!=="down" && elementUp[2]!==" " && elementUp[2]!=="-") {
        lastDirection = "up";
        saveCharacters(elementUp, regExLetters)
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
        return checkRightDirection(layout, lastDirection, regEx, elementRight);
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

export const saveCharacters = (element, regEx) => {   
    let exists = letterCoordinates.find(existing => {
        if (existing===element) {
            return existing;
        }
    })
    if (regEx.test(element[2]) && element[2]!=="x" && !exists) {
        letters = letters + element[2];        
        letterCoordinates.push(element);
    }
    allChars = allChars + element[2];
}

export const checkStartDirections = (elementRight, elementLeft, elementDown, elementUp, regExLetters) => {
    if (elementRight!=null && (regExLetters.test(elementRight[2]) || elementRight[2]==="-" || elementRight[2]==="+")) {
        if (elementLeft!=null && (regExLetters.test(elementLeft[2]) || elementLeft[2]==="-" || elementLeft[2]==="+")) {
            return 2
        } else if (elementDown!=null && (regExLetters.test(elementDown[2]) || elementDown[2]==="|" || elementDown[2]==="+")) {
            return 2
        } else if (elementUp!=null && (regExLetters.test(elementUp[2]) || elementUp[2]==="|" || elementUp[2]==="+")) {
            return 2
        }
    } else if (elementDown!=null && (regExLetters.test(elementDown[2]) || elementDown[2]==="|" || elementDown[2]==="+")) {
        if (elementLeft!=null && (regExLetters.test(elementLeft[2]) || elementLeft[2]==="-" || elementLeft[2]==="+")) {
            return 2
        } else if (elementRight!=null && (regExLetters.test(elementRight[2]) || elementRight[2]==="-" || elementRight[2]==="+")) {
            return 2
        } else if (elementUp!=null && (regExLetters.test(elementUp[2]) || elementUp[2]==="|" || elementUp[2]==="+")) {
            return 2
        }
    } else if (elementLeft!=null && (regExLetters.test(elementLeft[2]) || elementLeft[2]==="-" || elementLeft[2]==="+")) {
        if (elementDown!=null && (regExLetters.test(elementDown[2]) || elementDown[2]==="|" || elementDown[2]==="+")) {
            return 2
        } else if (elementRight!=null && (regExLetters.test(elementRight[2]) || elementRight[2]==="-" || elementRight[2]==="+")) {
            return 2
        } else if (elementUp!=null && (regExLetters.test(elementUp[2]) || elementUp[2]==="|" || elementUp[2]==="+")) {
            return 2
        }
    } else if (elementUp!=null && (regExLetters.test(elementUp[2]) || elementUp[2]==="|" || elementUp[2]==="+")) {
        if (elementLeft!=null && (regExLetters.test(elementLeft[2]) || elementLeft[2]==="-" || elementLeft[2]==="+")) {
            return 2
        } else if (elementRight!=null && (regExLetters.test(elementRight[2]) || elementRight[2]==="-" || elementRight[2]==="+")) {
            return 2
        } else if (elementDown!=null && (regExLetters.test(elementDown[2]) || elementDown[2]==="|" || elementDown[2]==="+")) {
            return 2
        }
    } else {
        return 1
    }
}

export const returnResult = (result) => {   
    letters = "";
    allChars = "";
    error = "";

    return result
}

export const returnError = (message) => {   
    letters = "";
    allChars = "";
    error = message;
    result = {
        letters: letters, allChars: allChars, error: error
    }
    returnResult(result);
}

export const findNextCharacter = (layout, lastCharCoo, lastDirectionForwarded) => {
    let regEx = new RegExp("^\|[^-\s][a-zA-Z-+]*$", "g");
    let regExLetters = new RegExp("^[a-zA-Z]*$", "g");
    let firstElement = layout.mappedMap.find(element => element[2] === "@");
    if (firstElement==null) {
        returnError("Can't find first element");
    } else if (starts.length>1) {
        returnError("Multiple starts");        
    }
    else if (ends.length>1) {
        returnError("Multiple ends");        
    } else {
        let currnetCoordinates = lastCharCoo!=null ? lastCharCoo : [firstElement[0], firstElement[1]];
        let lastDirection = lastDirectionForwarded!=null ? lastDirectionForwarded : null;
    
        let elementCurrent = layout.mappedMap.find(element => element[0] === currnetCoordinates[0] && element[1] === currnetCoordinates[1]);
        let elementRight = layout.mappedMap.find(element => element[0] === currnetCoordinates[0]+1 && element[1] === currnetCoordinates[1]);
        let elementLeft = layout.mappedMap.find(element => element[0] === currnetCoordinates[0]-1 && element[1] === currnetCoordinates[1]);
        let elementDown = layout.mappedMap.find(element => element[0] === currnetCoordinates[0] && element[1] === currnetCoordinates[1]+1);
        let elementUp = layout.mappedMap.find(element => element[0] === currnetCoordinates[0] && element[1] === currnetCoordinates[1]-1);
        
        lastDirection==null && saveCharacters(elementCurrent, regExLetters)

        if (currnetCoordinates[0]===firstElement[0] && currnetCoordinates[1]===firstElement[1] && lastDirection==null) {
            let directionNumber = checkStartDirections(elementRight, elementLeft, elementDown, elementUp, regExLetters);
            if (directionNumber===2) {
                error="Multiple starting paths";                       
            }
        }
        
        let finished = checkIfFinished(elementCurrent);
        let shouldContinueDirection = !finished && elementCurrent[2]!=="+" && checkShouldContinueDirection(layout, lastDirection, regEx, elementRight, elementLeft, elementDown, elementUp);
        
        if (shouldContinueDirection===false && !finished && error==="") {
            let nextCoordinates = null;
            // horizontal check
            if (elementRight!=undefined && regEx.test(elementRight[2]) && lastDirection!=="left"  && elementRight[2]!==" ") {
                // go right
                if (elementCurrent[2]==="+" && lastDirection==="right") {
                    error = "Fake turn"
                }
                saveCharacters(elementRight, regExLetters)
                nextCoordinates = [elementRight[0], elementRight[1]];
                lastDirection = "right";
                findNextCharacter(layout, nextCoordinates, lastDirection)
            } else if (elementLeft!=undefined && regEx.test(elementLeft[2]) && lastDirection!=="right" && elementLeft[2]!==" ") {
                // go left
                if (elementCurrent[2]==="+" && lastDirection==="left") {
                    error = "Fake turn"
                }
                saveCharacters(elementLeft, regExLetters)
                nextCoordinates = [elementLeft[0], elementLeft[1]];
                lastDirection = "left";
                findNextCharacter(layout, nextCoordinates, lastDirection)
            } 
            // vertical check
            else if (elementDown!=undefined && regEx.test(elementDown[2]) && lastDirection!=="up" && elementDown[2]!==" ") {
                // go down
                if (elementCurrent[2]==="+" && lastDirection==="down") {
                    error = "Fake turn"
                }
                saveCharacters(elementDown, regExLetters)
                nextCoordinates = [elementDown[0], elementDown[1]];
                lastDirection = "down";
                findNextCharacter(layout, nextCoordinates, lastDirection)
            } else if (elementUp!=undefined && regEx.test(elementUp[2]) && lastDirection!=="down" && elementUp[2]!==" ") {
                // go up
                if (elementCurrent[2]==="+" && lastDirection==="up") {
                    error = "Fake turn"
                }
                saveCharacters(elementUp, regExLetters)
                nextCoordinates = [elementUp[0], elementUp[1]];
                lastDirection = "up";
                findNextCharacter(layout, nextCoordinates, lastDirection)
            } else {
                returnError("Can't find last element");
            }   
        } else if (finished && error==="") {
            result = {
                letters: letters, allChars: allChars, error: ""
            }
        } else if (error!=="") {
            result = {
                letters: "", allChars: "", error: error
            }
        }
    }
    return returnResult(result);
}