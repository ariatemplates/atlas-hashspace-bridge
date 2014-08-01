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

{Template {
    $classpath : "test.binding.BindingTemplate",
    $wlibs : {
        'html' : 'aria.html.HtmlLibrary',
        'hsp' : 'bridge.aria.widget.BridgeWidgetLib'
    },
    $hasScript : true,
    $css: ['test.binding.BindingCSS']
}}
    {macro main()}
        TEST ARIA
        <div class="attpl">
            ATLAS OUTER
            <br/>
            {@html:TextInput {
                placeholder : "Type some text",
                id : "atlasOuter",
                bind : {
                    value : {
                        inside : data,
                        to : "value"
                    }
                  }
            }/}

            //Bridge to hashspace
            {@hsp:Template {
                id: "hspid",
                type:"div",
                hsp: {
                    src: getHsp(),
                    args:[{data: data}]
                }
            } /}
        </div>
        <br />
        <input id="justToFocusOut">

    {/macro}
{/Template}
