var Aria = require("ariatemplates/Aria");
module.exports = Aria.tplScriptDefinition({
    $classpath : 'test.atlasWidgets.list.ListTestTplScript',
    $constructor : function () {
    },
    $destructor : function () {
    },
    $prototype : {
        getHsp : function () {
            return require("test/atlasWidgets/list/List.hsp").page;
        }
    }
});
