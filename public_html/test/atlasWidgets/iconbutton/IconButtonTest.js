var Aria = require("ariatemplates/Aria");
module.exports = Aria.classDefinition({
    $classpath : "test.atlasWidgets.iconbutton.IconButtonTest",
    $extends : require("test/atlasWidgets/TemplateTestCaseWrapper"),
    $constructor : function () {
        this.$TemplateTestCaseWrapper.constructor.call(this);
        this.data = {
            value : false
        }
        this.setTestEnv({
            template : "test.atlasWidgets.iconbutton.IconButton",
            data : this.data
        });

    },
    $destructor : function () {
        this.data = null;
        this.$TemplateTestCaseWrapper.$destructor.call(this);
    },

    $prototype : {
        runTemplateTest : function () {
            this.waitFor({
                condition : function () {
                    // wait for the element to be inserted in the dom
                    return this.getWidgetDomElement("myId");
                },
                callback : {
                    fn : function () {
                        this.button = this.getWidgetDomElement("myId");
                        aria.utils.SynEvents.click(this.button, {
                            fn : this._checkValue1,
                            scope : this
                        });
                    },
                    scope : this
                }
            });

        },

        _checkValue1 : function () {
            this.assertTrue(this.data.value, "The value has not been set to true by the button");
            aria.utils.SynEvents.click(this.button, {
                fn : this._checkValue2,
                scope : this
            });
        },

        _checkValue2 : function () {
            this.assertFalse(this.data.value, "The value has not been set to false by the button");
            this.notifyTemplateTestEnd();
        }

    }
});
