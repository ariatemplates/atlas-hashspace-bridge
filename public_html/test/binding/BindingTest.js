/*
 * Copyright 2014 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Test suite grouping all tests
 */
var Aria = require("ariatemplates/Aria");
module.exports = Aria.classDefinition({
    $classpath : "test.binding.BindingTest",
    $extends : require("ariatemplates/jsunit/RobotTestCase"),
    $constructor : function () {
        this.$RobotTestCase.constructor.call(this);
        this.setTestEnv({
            template : "test.binding.BindingTemplate",
            data : {
                value : ""
            }
        });

        this.tests = [{
                    getInput : "_getInput",
                    inputId : "atlasOuter",
                    str : "te",
                    checkStr : "te"
                }, {
                    getInput : "_getInput",
                    inputId : "hspOuter",
                    str : "s",
                    checkStr : "tes"
                }, {
                    getInput : "_getInput",
                    inputId : "atlasInner",
                    str : "t ",
                    checkStr : "test "
                }, {
                    getInput : "_getInput",
                    inputId : "hspInner",
                    str : "b",
                    checkStr : "test b"
                }, {
                    getInput : "_getWidgetInput",
                    inputId : "hspWidget",
                    str : "inding",
                    checkStr : "test binding"
                }];
        this.testsIndex = 0;

    },
    $prototype : {
        runTemplateTest : function () {

            this.outerInput = aria.utils.Dom.getElementById("justToFocusOut");

            this.waitFor({
                condition : function () {
                    // wait for the innermost elements to be inserted in the dom
                    return (this._getInput("hspInner") != null && this._getWidgetInput("hspWidget") != null);
                },
                callback : {
                    fn : this._performTests,
                    scope : this
                }
            });
        },

        _performTests : function () {
            if (this.testsIndex >= this.tests.length) {
                this.end();
                return;
            }

            var test = this.tests[this.testsIndex];

            this._changeInputValueAndCheck({
                input : this[test.getInput](test.inputId),
                str : test.str,
                checkValue : test.checkStr
            })
            this.testsIndex++;;
        },

        _changeInputValueAndCheck : function (args) {
            this.synEvent.click(args.input, {
                fn : this._type,
                args : args,
                scope : this
            });
        },

        _type : function () {
            this.synEvent.type(arguments[1].input, arguments[1].str, {
                fn : this._blur,
                args : arguments[1],
                scope : this
            });
        },

        _blur : function () {
            this.synEvent.click(this.outerInput, {
                fn : this._check,
                args : arguments[1],
                scope : this
            });
        },

        _check : function () {
            var value = arguments[1].checkValue;
            this.assertEquals(this._getWidgetInput("hspWidget").value, value, "The hspWidget input value is %1 but it should be %2");
            this.assertEquals(this._getInput("atlasOuter").value, value, "The atlasOuter input value is %1 but it should be %2");
            this.assertEquals(this._getInput("atlasInner").value, value, "The atlasInner input value is %1 but it should be %2");
            this.assertEquals(this._getInput("hspOuter").value, value, "The hspOuter input value is %1 but it should be %2");
            this.assertEquals(this._getInput("hspInner").value, value, "The hspInner input value is %1 but it should be %2");

            this._performTests();
        },

        _getWidgetInput : function (widgetId) {
            if (this.widgets == null) {
                this.widgets = this.getElementsByClassName(this.testDiv, "xWidget");
            }
            var regExp = new RegExp("_" + widgetId + "$");
            for (var i = 0, l = this.widgets.length; i < l; i++) {
                var widg = this.widgets[i];
                if (regExp.test(widg.id)) {
                    return widg.getElementsByTagName("input")[0];
                }
            }

        },

        _getInput : function (inputId) {
            if (this.inputs == null) {
                this.inputs = this.testDiv.getElementsByTagName("input");
            }
            var regExp = new RegExp(inputId + "$");
            for (var i = 0, l = this.inputs.length; i < l; i++) {
                var input = this.inputs[i];
                if (regExp.test(input.id)) {
                    return input;
                }
            }

        }

    }
});
