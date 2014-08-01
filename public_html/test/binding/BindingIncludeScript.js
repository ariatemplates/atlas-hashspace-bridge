
var Aria = require("ariatemplates/Aria");
module.exports = Aria.tplScriptDefinition({
    $classpath : "test.binding.BindingIncludeScript",

    $prototype : {
        getHsp : function () {
            return require("test/binding/page2.hsp").page;
        }
    }
});