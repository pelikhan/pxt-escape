# pxt-escape ![Build status badge](https://github.com/pelikhan/pxt-escape/workflows/MakeCode/badge.svg)

This extension provides the base protocol and helpers
to build connected **escape room** gizmos. Other existing repoes
using this framework:

## Elements

### Clock

The [escape clock](https://github.com/pelikhan/pxt-escape-clock)
displays the time computes the time.

Pressing A removes a minute, B adds a minute, A+B resets the clock.

If the detonator is disabed,the clock will show a WIN message.
If the time runs off, it will display a failed message.

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

## Blocks preview

This section shows the blocks code from the last commit in master.

![A rendered view of the blocks](https://github.com/pelikhan/pxt-escape/raw/master/.makecode/blocks.png)

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

