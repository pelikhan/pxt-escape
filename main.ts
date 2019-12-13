namespace escape {
    // all constants
    export const RADIO_GROUP = 42
    export const ADD_MINUTE = 1
    export const REMOVE_MINUTE = 2
    export const RESET_CLOCK = 3

    function init() {
        radio.setGroup(RADIO_GROUP);
    }
}