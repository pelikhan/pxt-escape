namespace escape {
    const ESCAPE_EVENT_ID = 6574;
    // configuration
    // this is the key to the physical lock
    // for the detonator box. Updated as needed
    export const PHYSICAL_LOCK_KEY = [3, 7, 9, 1]; // key of combination lock
    // these are the various codes that will need to be transmitted
    // via CODE messages. Updated as weeded
    export const CODES = [121915, 3592, 48462452, 853]
    // time to solve the room
    export const TOTAL_SECONDS = 1200

    // all constants
    export const RADIO_GROUP = 42

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
    export const CODE_IMPULSE = 12
    export const CODE_DIGIT = 13

    export let LOCK_COUNT = 4
    export let ALL_UNLOCKED = 0

    export const enum GameState {
        Active,
        Won,
        Lost
    }
    // keep track of the overall game state
    export let gameState = GameState.Active;

    function init() {
        LOCK_COUNT = PHYSICAL_LOCK_KEY.length;
        for (let i = 0; i < LOCK_COUNT; ++i)
            ALL_UNLOCKED |= 1 << i;
        radio.setGroup(RADIO_GROUP);
        radio.setTransmitSerialNumber(true);
    }
    init();

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
    msg[CODE_IMPULSE] = "code impulse"
    msg[CODE_DIGIT] = "code digit"

    export function logMessage(b: Buffer) {
        let txt = msg[b[0]] || b[0].toString();
        if (b.length == 5)
            txt += ' ' + b.getNumber(NumberFormat.UInt32LE, 1)
        else
            txt += ' ' + b.slice(1)
        console.log(txt)
    }

    export function showLose() {
        basic.showIcon(IconNames.Skull);
        basic.showString("LOSE")
    }

    export function showWin() {
        basic.showIcon(IconNames.Heart);
        basic.showIcon(IconNames.SmallHeart);
        game.addScore(1)
        basic.showString("WIN")
    }

    export function onEvent(event: number, handler: () => void) {
        control.onEvent(ESCAPE_EVENT_ID, event, handler);
    }    

    export function onMessageReceived(handler: (msg: number, data: Buffer) => void) {
        radio.onReceivedBuffer(b => {
            const msg = b[0];
            const data = b.slice(1)
            switch (msg) {
                case RESET:
                    gameState = GameState.Active;
                    break;
                case TIME_OVER:
                    if (gameState == GameState.Active)
                        gameState = GameState.Lost;
                    break;
                case BOMB_DEACTIVATED:
                    if (gameState == GameState.Active)
                        gameState = GameState.Won;
                    break;
            }

            control.raiseEvent(ESCAPE_EVENT_ID, msg)
            handler(msg, data)
        })
    }

    export function onUpdate(handler: () => void) {
        basic.forever(function () {
            switch (gameState) {
                case GameState.Lost:
                    showLose(); break;
                case GameState.Won:
                    showWin(); break;
                default: handler(); break;
            }
        })
    }

    export function broadcastMessage(msg: number) {
        const b = control.createBuffer(1)
        b[0] = msg;
        radio.sendBuffer(b);
    }
}