// tests go here; this will not be compiled when this package is used as an extension.
basic.showString("ESCAPE")
radio.setTransmitPower(7)
radio.onReceivedBuffer(b => {
    led.toggle(0, 0)
    escape.logMessage(b);
})
input.onButtonPressed(Button.A, function () {
    escape.broadcastMessage(escape.REMOVE_MINUTE)
    basic.showIcon(IconNames.SmallHeart)
    basic.clearScreen()    
})
input.onButtonPressed(Button.B, function () {
    escape.broadcastMessage(escape.ADD_MINUTE)    
    basic.showIcon(IconNames.Heart)
    basic.clearScreen()    
})
input.onButtonPressed(Button.AB, function () {
    for(let i = 0; i < 5; ++i) {
        escape.broadcastMessage(escape.RESET)
        basic.pause(10)
    }
    basic.showIcon(IconNames.Chessboard)
    basic.clearScreen()    
})