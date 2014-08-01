var Aria = require("ariatemplates/Aria");
module.exports = Aria.tplScriptDefinition({
    $classpath : 'test.atlasWidgets.iconbutton.IconButtonScript',
    $constructor : function () {
    },
    $destructor : function () {
    },
    $prototype : {
        getHsp : function () {
            return require("test/atlasWidgets/iconbutton/IconButton.hsp").page;
        }
    }
});
