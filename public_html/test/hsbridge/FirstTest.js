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
    $classpath : "test.hsbridge.FirstTest",
    $extends : require("ariatemplates/jsunit/TestCase"),
    $prototype : {
        "test Noder is loaded" : function () {
            var a = require("templates/hsp/hello.hsp");
            console.log("hsp"+a.hello);
            this.assertTruthy(noder);
        }
    }
});
