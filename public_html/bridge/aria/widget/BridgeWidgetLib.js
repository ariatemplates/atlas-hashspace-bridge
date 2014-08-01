var Aria = require("ariatemplates/Aria");
var ariaWidgetLibsWidgetLib = require("ariatemplates/widgetLibs/WidgetLib");
var ariaUtilsJson = require("ariatemplates/utils/Json");
module.exports = Aria.classDefinition({
    $classpath : "bridge.aria.widget.BridgeWidgetLib",
    $extends : ariaWidgetLibsWidgetLib,
    $singleton : true,
    $constructor : function () {
        this.$WidgetLib.constructor.apply(this, arguments);

        // Bridge hackish sync
        var json = require("hsp/json");
        ariaUtilsJson.constructor.prototype.setValue2 = ariaUtilsJson.constructor.prototype.setValue;
        ariaUtilsJson.constructor.prototype.setValue = function (container, property, val, listenerToExclude,
                throwError) {
            var initialValue = container[property];
            json.$set2(container, property, val);
            container[property] = initialValue;
            return ariaUtilsJson.setValue2(container, property, val, listenerToExclude, throwError);
        }
        json.$set2 = json.$set;
        json.$set = function (object, property, value) {
            var initialValue = object[property];
            ariaUtilsJson.setValue2(object, property, value);
            object[property] = initialValue;
            return json.$set2(object, property, value);
        }
        json.set = json.$set;
    },
    $prototype : {
        /**
         * Map of all the widgets in the library. Keys in the map are widget names as they can be used in templates.
         * Values are the corresponding classpaths.
         * @type Object
         */
        widgets : {
            "Template" : "bridge.aria.widget.Bridge"
        }
    }
});