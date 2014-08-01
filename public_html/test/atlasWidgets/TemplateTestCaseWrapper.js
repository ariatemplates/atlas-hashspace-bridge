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

var Aria = require("ariatemplates/Aria");
var Json = require("ariatemplates/utils/Json");
module.exports = Aria.classDefinition({
    $classpath : "test.atlasWidgets.TemplateTestCaseWrapper",
    $extends : require("aria/jsunit/TemplateTestCase"),
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
    },
    $destructor : function () {
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        /**
         * Overrides TemplateTestCase method.
         * Get the widget DOM element having the given widget id in the template
         * @param {String} templateWidgetId widget id
         * @return {HTMLElement}
         */
        getWidgetDomElement : function (widgetId) {
            if (this.widgets == null) {
                this.widgets = this.getElementsByClassName(this.testDiv, "xWidget");
            }
            var regExp = new RegExp("_" + widgetId + "(_.+)?$");
            for (var i = 0, l = this.widgets.length; i < l; i++) {
                var widg = this.widgets[i];
                if (regExp.test(widg.id)) {
                    return widg;
                }
            }
            return null;
        }
    }
});
