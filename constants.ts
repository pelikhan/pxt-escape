namespace escape {
    // configuration
    // 1) physical lock combination
    // this is the key to the physical lock
    // for the detonator box. Updated as needed
    export const PHYSICAL_LOCK_KEY = [3, 7, 9, 1];
    // 2) lock codes
    // these are the various codes that will need to be transmitted
    // via CODE messages. Updated as needed
    export const CODES = [121915, 3592, 48462452, 853]
    // 3) total time
    // time to solve the room 30 minutes
    export const TOTAL_SECONDS = 30 * 60;

    // all constants
    const ESCAPE_EVENT_ID = 6574;
    export const RADIO_GROUP = 42
    export const CODE_RETRY = 3;

    // messages
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
    const UPDATE = 14

    export let LOCK_COUNT = 4
    export let ALL_UNLOCKED = 0

    export const enum GameState {
        Active,
        Won,
        Lost
    }

    /**
     * The current win/loose game state
     */
    export let gameState = GameState.Active;

    function init() {
        LOCK_COUNT = PHYSICAL_LOCK_KEY.length;
        for (let i = 0; i < LOCK_COUNT; ++i)
            ALL_UNLOCKED |= 1 << i;
        radio.setGroup(RADIO_GROUP);
        radio.setTransmitSerialNumber(true);
        onMessageReceived(undefined);
    }

    const msg: string[] = [];
    msg[REMAINING_SECONDS] = "remaining secs"
    msg[LOCK_CLOSED] = "lock closed"
    msg[LOCK_OPEN] = "lock open"
    //msg[LOCK_STATUS] = "lock status"
    msg[CODE] = "code"
    msg[TIME_OVER] = "time over"
    msg[BOMB_DEACTIVATED] = "bomb deactivated"
    msg[RESET] = "reset"
    msg[CODE_IMPULSE] = "code impulse"
    msg[CODE_DIGIT] = "code digit"

    function logMessage(b: Buffer) {
        let txt = msg[b[0]];
        if (!txt) return;
        
        if (b.length == 5)
            txt += ' ' + b.getNumber(NumberFormat.UInt32LE, 1)
        else
            txt += ' ' + b.slice(1).toHex()
        console.log(txt)
    }

    function showLose() {
        basic.showIcon(IconNames.Skull);
        basic.showString("LOSE")
    }

    function showWin() {
        basic.showIcon(IconNames.Heart);
        basic.showIcon(IconNames.SmallHeart);
        game.addScore(1)
        basic.showString("WIN")
    }

    /**
     * Register code to run when a game event is raised.
     */
    //% block
    export function onEvent(event: number, handler: () => void) {
        control.onEvent(ESCAPE_EVENT_ID, event, handler);
    }

    /**
     * Register a handler for a given message
     */
    export function onMessageReceived(handler: (msg: number, data: Buffer) => void) {
        radio.onReceivedBuffer(b => {
            logMessage(b);
            const msg = b[0];
            const data = b.slice(1)
            switch (msg) {
                case RESET:
                    control.reset();
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
            if (handler)
                handler(msg, data)
        })
    }

    /**
     * Registers a background rendering constant
     */
    //% block="escape on update"
    export function onUpdate(handler: () => void) {
        control.onEvent(ESCAPE_EVENT_ID, UPDATE, handler);
    }

    function renderLoop() {
        // background rendering loop
        basic.forever(function () {
            switch (gameState) {
                case GameState.Lost:
                    showLose(); break;
                case GameState.Won:
                    showWin(); break;
                default:
                    control.raiseEvent(ESCAPE_EVENT_ID, UPDATE);
                    break;
            }
        })
    }

    /**
     * Sends a code message to other escape gizmos
     */
    //% block
    export function broadcastMessage(msg: number) {
        const b = control.createBuffer(1)
        b[0] = msg;
        radio.sendBuffer(b);
    }

    /**
     * Sends a code message with a 32-bit unsigned code
     */
    //% block
    export function broadcastMessageNumber(msg: number, codeNumber: number) {
        const b = control.createBuffer(5);
        b[0] = msg;
        b.setNumber(NumberFormat.UInt32LE, 1, codeNumber);
        radio.sendBuffer(b);
    }

    /**
     * Sends a code message with a few retries
     */
    //% block
    export function broadcastCodeMessage(codeNumber: number) {
        for (let i = 0; i < CODE_RETRY; ++i) {
            escape.broadcastMessageNumber(escape.CODE, codeNumber);
            basic.pause(5);
        }
    }

    /**
     * Encodes a number as a binary sequence of A,B where A = 0, B = 1
     */
    //% block
    export function toAB(c: number) {
        let s = ""
        do {
            s += !!(c & 0x1) ? "B" : "A";
            c >>= 1;
        } while (c);
        return s;
    }

    /**
     * Decodes a sequence of A,B as a binary number where A = 0, B = 1
     */
    export function fromAB(s: string) {
        let c = 0;
        for(let i = 0; i < s.length; ++i) {
            if (s[i] == "B")
                c |= 0x1;
            c <<= 1;
        }
        return c;
    }

    /**
    Show all codes on screen
    */
    //% block
    export function showCodes() {
        for(let i = 0; i < CODES.length; ++i) {
            basic.clearScreen();
            basic.showString(`CODE/${i}`)
            const c = CODES[i];
            basic.showNumber(c);
            basic.pause(500);
            basic.showString(toAB(c));
            basic.pause(2000);
        }
    }

    init();
    renderLoop();
}
