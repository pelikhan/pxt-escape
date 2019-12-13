namespace escape {
    // all constants
    export const RADIO_GROUP = 42
    export const ADD_MINUTE = 1
    export const REMOVE_MINUTE = 2
    export const RESET_CLOCK = 3
    export const REMAINING_SECONDS = 4
    export const LOCK_CLOSED = 5
    export const LOCK_OPEN = 6
    export const LOCK_STATUS = 7
    export const CODE = 8

    export const LOCK_COUNT = 4
    export let ALL_UNLOCKED = 0

    function init() {
        for (let i = 0; i < LOCK_COUNT; ++i)
            ALL_UNLOCKED |= 1 << i;
        radio.setGroup(RADIO_GROUP);
        radio.setTransmitSerialNumber(true);
    }
    init();

    export function sniffToConsole() {
        radio.onReceivedBuffer(b => {
            console.log(b.toHex())
        })
    }
}