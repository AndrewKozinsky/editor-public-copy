
export type PressedKeysObj = {
    [K in Keys]: boolean
}
type Keys = 'esc' | 'alt' | 'cmd' | 'shift' | 's' | 'z'

/**
 * The function return object of pressed keys.
 * @param {KeyboardEvent} e — event object
 */
export function getPressedKeys(e: KeyboardEvent): PressedKeysObj {
    // Is it MacOS?
    let isMac = navigator.platform === 'MacIntel'

    // In MacOS you have to press Cmd key, but in Windows is Ctrl
    let cmdKey: boolean
    if (isMac) cmdKey = e.metaKey
    else cmdKey = e.ctrlKey

    const keysObj: PressedKeysObj = {
        esc: e.key === "Escape",
        alt: e.altKey,
        cmd: cmdKey,
        shift: e.shiftKey,

        s: e.key === 's',
        z: e.key === 'z'
    }

    return keysObj
}


/**
 * The function check if an user pressed only keys listed in keysArr
 * @param {Object} pressedKeys — object with keys pressed status
 * @param {Array} keysArr — array if keys which must be pressed
 */
export function checkPressedKeys(pressedKeys: PressedKeysObj, keysArr: Keys[]) {
    let result = true

    for (let key in pressedKeys) {
        // @ts-ignore
        if (pressedKeys[key] !== keysArr.includes(key)) {
            result = false
        }
    }

    return  result
}
