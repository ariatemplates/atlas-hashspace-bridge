# Atlas - Hashspace Bridge

This repository is a proof-of-concept of Aria Templates / Hashspace two-way bridging.  
The Atlas - Hashspace Bridge allows the interoperability among the [Aria Templates](http://ariatemplates.com/) engines

Getting started:
----------------

    npm install -g grunt-cli
    npm install
    # until AT 1.5.3 is released, to have built code of AT available:
    cd /g/gh/at/ && cp -r --parents ./build/target/production /g/gh/atlas-hashspace-bridge/node_modules/ariatemplates && cd --
    npm start

In order to take a look to a bridge usage example, go to localhost:1337


Tests:
------

    npm test

Usage
=====

The bridging feature can be used in both ways, and any combination of nested bridged components is allowed.


Hashspace inside Atlas
----------------------

Only full template can be inserted in an AT template (i.e. 'component', a template with the using keyword, is forbidden).
The code allowing the inclusion is available via a new lib, `bridge.aria.widget.BridgeWidgetLib` :
```
    $wlibs : {
        'hsp' : 'bridge.aria.widget.BridgeWidgetLib'
    },
```

The widget provided has to be used in this way:
```
    {@hsp:Template {
        id: "hspId", // unique id associated to the widget
        type:"div",
        attributes: ..., // html attributes
        hsp: {
           src: getHsp(), // hashspace template
           args: [...], // arguments used by the HSP template
        }
    } /}
```
some remarks as follows:
 - The `getHsp` function returns the hashspace template instance (eg. `require("templates/hsp/tpl.hsp").myTplName`); since require is not available inside an Atlas template yet, it must be used via the template script.
 - the data model can be provided in the `args` parameter so that it can be used with the HSP template
 - Other attributes will be applyed on the container itself (the `type` attribute) as it is usually done for other widget.

Atlas inside Hashspace
----------------------

Only AT widgets are allowed to be included in HSP. To include Atlas templates, the AT template widget must be used.
The atbridge has to be required like the other libraries:

```
    var atlas = require("atlas/atlas.hsp");
```

Then the AT widget should be included with this component:

```
<#atlas name="TextField" config="{getConfig()}" lib="foo.bar.MyLib" id="componentId" />
```
The remarkable properties of this component are:
 - name: widget name (eg. "TextField")
 - config: AT configuration bean provided to the widget
 - lib (optional): AT library to use; if not specified, `aria.widgets.AriaLib` is the default one.
 - id (optional): id to be assigned to the widget's container div

Note that the configuration bean has to be defined in a referenced function (in this case, `getConfig`), and not directly provided.

Data Binding
------------
The data binding is guaranteed in both ways, so that any change in the included atlas widget will be reflected in the hashspace container and vice-versa.

This means that `utils.Json` assignment methods in Atlas world, and all the assignments in the hashspace one, will trigger refreshes and events in a transparent way, across the bridging layer.

Notes
-----
Atlas widgets are individually and concurrently included and processed by the bridge in such a way that `Tooltip` widget cannot be associated to the other widgets, thus it is not supported at the moment.

