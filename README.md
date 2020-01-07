# pxt-escape ![Build status badge](https://github.com/pelikhan/pxt-escape/workflows/MakeCode/badge.svg)

This extension provides the base protocol and helpers
to build connected **escape room** gizmos.

https://youtu.be/je-6slUD054

## Devices

### Game Master

The [game master](https://github.com/pelikhan/pxt-escape-game-master)
controls the clock, reset the game and log all messages.
Connect the micro:bit game master to the editor to 
see the messages in the console.

Pressing A removes a minute, B adds a minute, A+B resets the clock.

If the detonator is disabed,the clock will show a WIN message.
If the time runs off, it will display a LOSE message.

### Clock

The [escape clock](https://github.com/pelikhan/pxt-escape-clock)
displays the time.

### Lock

The [escape lock](https://github.com/pelikhan/pxt-escape-lock)
is a gizmo that controls a combination for a lock.
It requires all locks to be enabled for them to show their digits.

Each lock is waiting for a code to be sent via radio.

### Phone

The [escape phone](https://github.com/pelikhan/pxt-escape-phone) 
is a rotary phone driver to send codes over radio. Players use
it to send codes to the locks.

### Detonator

The [escape detonator](https://github.com/pelikhan/pxt-escape-bomb),
is a hidden micro:bit that needs to be disabled by pressing a button

## Usage

### onEvent

Received when a particular event happened on a device in the game.

### onMessageReceived

Raised on every message passed in the game. Unlike ``onEvent``,
provide event id and data payload.

### onUpdate

Use this function register the code that renders the current 
state to the gizmo. If the game is lost or won, it will display
the correct animation.

## Use this extension

This repository can be added as an **extension** in MakeCode.

* open https://makecode.microbit.org/
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for the URL of this repository and import

## Edit this extension

To edit this repository in MakeCode.

* open https://makecode.microbit.org/
* click on **Import** then click on **Import URL**
* paste the repository URL and click import

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

```typescript
let x = 0
```

```blocks
let x = `1
```


<script>
var makeCodeRenderPre = makeCodeRenderPre || (function () {
    // pre waiting to be rendered
    // when undefined, iframe is loaded and ready
    var pendingPres = [];
    function injectRenderer() {
        var f = document.getElementById("makecoderenderer");
        // check iframe already added to the DOM
        if (f) {
            return;
        }
        var f = document.createElement("iframe");
        f.id = "makecoderenderer";
        f.style.position = "absolute";
        f.style.left = 0;
        f.style.bottom = 0;
        f.style.width = "1px";
        f.style.height = "1px";
        f.src = "https://makecode.microbit.org/--docs?render=1"
        document.body.appendChild(f);
    }

    function renderPre(pre) {
    		if(!pre.id) pre.id = Math.random();
        console.log('render ' + pre.id)
        var f = document.getElementById("makecoderenderer");
        // check if iframe is added and ready (pendingPres is undefined)
        if (!f || !!pendingPres) {
            // queue up
            pendingPres.push(pre);
            injectRenderer();
        } else {
            f.contentWindow.postMessage({
                type: "renderblocks",
                id: pre.id,
                code: pre.innerText,
                options: {
                	packageId: pre.getAttribute("pub")
                }
            }, "https://makecode.microbit.org/");
        }
    }

    // listen for messages
    window.addEventListener("message", function (ev) {
        var msg = ev.data;
        if (msg.source != "makecode") return;

        console.log(msg.type)
        switch (msg.type) {
            case "renderready":
                // flush pending requests            				
                var pres = pendingPres;
                // set as undefined to notify that iframe is ready
                pendingPres = undefined;
                pres.forEach(function (pre) { renderPre(pre); })
                break;
            case "renderblocks":
                var svg = msg.svg; // this is an string containing SVG
                var id = msg.id; // this is the id you sent
                // replace text with svg
                var img = document.createElement("img");
                img.src = msg.uri;
                img.width = msg.width;
                img.height = msg.height;
                var code = document.getElementById(id);
                code.parentElement.insertBefore(img, code)
                code.parentElement.removeChild(code);
                break;
        }
    }, false);

    return renderPre;
})();

function renderSnippets() {
    // TODO ADD RENDER LOGIC HERE
    let pres = document.getElementsByTagName("pre");
    Array.prototype.forEach.call(pres, function (pre) {
        makeCodeRenderPre(pre);
    })
}

// load the renderer
renderSnippets();
</script>
