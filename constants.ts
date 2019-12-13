namespace escape {
    // all constants
    export const RADIO_GROUP = 42
    export const TOTAL_SECONDS = 600

    // messages
    export const ADD_MINUTE = 1
    export const REMOVE_MINUTE = 2
    export const RESET_CLOCK = 3
    export const REMAINING_SECONDS = 4
    export const LOCK_CLOSED = 5
    export const LOCK_OPEN = 6
    export const LOCK_STATUS = 7
    export const CODE = 8
    export const TIME_OVER = 9
    export const BOMB_DEACTIVATE = 10

    export const LOCK_COUNT = 4
    export let ALL_UNLOCKED = 0

    function init() {
        for (let i = 0; i < LOCK_COUNT; ++i)
            ALL_UNLOCKED |= 1 << i;
        radio.setGroup(RADIO_GROUP);
        radio.setTransmitSerialNumber(true);
    }
    init();

    export function logMessage(b: Buffer) {
        const msg: string[] = [];
        msg[ADD_MINUTE] = "add min"
        msg[REMOVE_MINUTE] = "remove min"
        msg[RESET_CLOCK] = "reset clock"
        msg[REMAINING_SECONDS] = "remaining secs"
        msg[LOCK_CLOSED] = "lock closed"
        msg[LOCK_OPEN] = "lock open"
        msg[LOCK_STATUS] = "lock status"
        msg[CODE] = "code"
        msg[TIME_OVER] = "time over"
        msg[BOMB_DEACTIVATE] = "bomb deactivate"
        console.log(`${msg[b[0]] || b[0]} ${b.slice(1).toHex()}`)
    }

    export function showLose() {
        basic.showIcon(IconNames.Skull);
        game.addScore(1)
        basic.showString("LOSE")
    }

    export function showWin() {
        basic.showIcon(IconNames.Heart);
        basic.showIcon(IconNames.SmallHeart);
        game.addScore(1)
        basic.showString("WIN")
    }
}