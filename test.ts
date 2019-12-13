// tests go here; this will not be compiled when this package is used as an extension.
console.log("ESCAPE")
basic.showString("ESCAPE")
radio.onReceivedBuffer(b => {
    led.toggle(0, 0)
    escape.logMessage(b);
})
