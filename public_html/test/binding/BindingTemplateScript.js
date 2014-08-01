var Aria = require("ariatemplates/Aria");
module.exports = Aria.tplScriptDefinition({
    $classpath : "test.binding.BindingTemplateScript",

    $prototype : {
        getHsp : function () {
            return require("test/binding/page.hsp").page;
        }
    }
});