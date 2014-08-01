var Aria = require("ariatemplates/Aria");
var Json = require("ariatemplates/utils/Json");

module.exports = Aria.classDefinition({
    $classpath : "test.atlasWidgets.list.ListTest",
    $extends : require("test/atlasWidgets/TemplateTestCaseWrapper"),
    $constructor : function () {
        this.$TemplateTestCaseWrapper.constructor.call(this);
        this.listContainer = null;
        this.children = null;
        this.data = {
            italian : [{
                        value : "D",
                        label : "Donizetti"
                    }, {
                        value : "B",
                        label : "Bellini"
                    }, {
                        value : "V",
                        label : "Verdi"
                    }]
        };
        this.setTestEnv({
            template : "test.atlasWidgets.list.ListTestTpl",
            data : this.data
        });
    },
    $destructor : function () {
        this.listContainer = null;
        this.children = null;
        this.$TemplateTestCaseWrapper.$destructor.call(this);
    },
    $prototype : {
        runTemplateTest : function () {
            this._isOldIe = (aria.core.Browser.isIE && aria.core.Browser.majorVersion < 9);
            this.waitFor({
                condition : function () {
                    var widget = this.getWidgetDomElement("myId");
                    return widget && widget.getElementsByTagName("table")[0];
                },
                callback : {
                    fn : function () {
                        this.listContainer = this.getWidgetDomElement("myId");
                        this.children = this.getElementsByClassName(this.listContainer, "xListEnabledItem_std");

                        this.assertTrue(this.children.length === 3, "The number of list items is not 3");

                        if (this._isOldIe) {
                            aria.core.Timer.addCallback({
                                fn : this._testListChange,
                                scope : this,
                                delay : 500
                            });
                        } else {
                            this._testListChange();
                        }
                    },
                    scope : this
                }
            });
        },

        _testListChange : function () {
            this.addItem();
            this._updateElements();
            this.assertTrue(this.children.length === 4, "The item was not added to the DOM");

            this.removeItem();            
            this._updateElements();
            this.assertTrue(this.children.length === 3, "The item was not removed from the DOM");

            this.notifyTemplateTestEnd();
        },

        _updateElements : function () {
            if(this._isOldIe){
                this.listContainer = this.getWidgetDomElement("myId", "div");
                this.children = this.getElementsByClassName(this.listContainer, "xListEnabledItem_std");                
            }
        },

        addItem : function () {
            Json.add(this.data.italian, {
                value : "p",
                label : "Puccini"
            });
        },

        removeItem : function () {
            Json.removeAt(this.data.italian, 3);
        }
    }
});
