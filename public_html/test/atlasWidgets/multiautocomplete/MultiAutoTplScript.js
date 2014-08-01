var Aria = require("ariatemplates/Aria");
module.exports = Aria.tplScriptDefinition({
    $classpath : 'test.atlasWidgets.multiautocomplete.MultiAutoTplScript',
    $constructor : function () {
    },
    $destructor : function () {
    },
    $prototype : {
        getHsp : function () {
            return require("test/atlasWidgets/multiautocomplete/MultiAuto.hsp").page;
        }
    }
});
