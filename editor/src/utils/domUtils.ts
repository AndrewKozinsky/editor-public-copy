/**
 * The function returns an object with info about element's padding
 * @param {HTMLElement} $elem — html-element
 */
export function getElementPadding($elem: HTMLElement) {
    // String with padding. For example: 10px 20px
    const paddingStr = getComputedStyle($elem).padding
    // Make string to values array
    const paddingArr = paddingStr.split(' ')

    // Return element
    const paddingObj = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }

    if (paddingArr.length === 1) {
        const value = parseInt(paddingArr[0])
        paddingObj.left = paddingObj.top = paddingObj.right = paddingObj.bottom = value
    }
    else if (paddingArr.length === 2) {
        const topValue = parseInt(paddingArr[0])
        const leftValue = parseInt(paddingArr[1])

        paddingObj.top = paddingObj.bottom = topValue
        paddingObj.left = paddingObj.right = leftValue
    }
    else if (paddingArr.length === 3) {
        const topValue = parseInt(paddingArr[0])
        const rightValue = parseInt(paddingArr[1])
        const bottomValue = parseInt(paddingArr[2])

        paddingObj.left = rightValue
        paddingObj.top = topValue
        paddingObj.right = rightValue
        paddingObj.bottom = bottomValue
    }
    else {
        paddingObj.left = parseInt(paddingArr[3])
        paddingObj.top = parseInt(paddingArr[0])
        paddingObj.right = parseInt(paddingArr[1])
        paddingObj.bottom = parseInt(paddingArr[2])
    }

    return paddingObj
}
