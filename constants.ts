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
        const msg: string[] = [];
        msg[ADD_MINUTE] = "add min"
        msg[REMOVE_MINUTE] = "remove min"
        msg[RESET_CLOCK] = "reset clock"
        msg[REMAINING_SECONDS] = "remaining secs"
        msg[LOCK_CLOSED] = "lock closed"
        msg[LOCK_OPEN] = "lock open"
        msg[LOCK_STATUS] = "lock status"
        msg[CODE] = "code"
        radio.onReceivedBuffer(b => {
            led.toggle(0, 0)
            console.log(`${msg[b[0]]} ${b.slice(1).toHex()}`)
        })
    }
}