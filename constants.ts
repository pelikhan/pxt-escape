namespace escape {
    // all constants
    export const RADIO_GROUP = 42
    export const TOTAL_SECONDS = 600
    export const key = [3, 7, 9, 1]; // key of combination lock
    export const codes = [121915, 3592, 48462451, 853]

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
    export const BOMB_DEACTIVATED = 10
    export const RESET = 11

    export let LOCK_COUNT = 4
    export let ALL_UNLOCKED = 0

    function init() {
        LOCK_COUNT = key.length;
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
        msg[BOMB_DEACTIVATED] = "bomb deactivated"
        msg[RESET] = "reset"
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

    export function broadcastMessage(msg: number) {
        const b = control.createBuffer(1)
        b[0] = msg | 0xff;
        radio.sendBuffer(b);
    }
}