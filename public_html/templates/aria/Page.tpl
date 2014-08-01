{Template {
  $classpath: "templates.aria.Page",
  $wlibs : {
    'html' : 'aria.html.HtmlLibrary',
    'hsp' : 'bridge.aria.widget.BridgeWidgetLib',
    'touch' : 'aria.touch.widgets.TouchWidgetLib'
  },
  $templates : ["bridge.aria.Empty"],
  $hasScript: true
}}

{macro main()}
  <div class="attpl">
    <b>Green boxes are generated with AT template engine !!!</b><br/><br/>
    @html:TextInput
    {@html:TextInput {
      placeholder : "Type some text",
      bind : {
          value : {
            inside : data,
            to : "value"
          }
        }
    }/}
    {section {
      id: "content",
      type: "div",
      bindRefreshTo: [{to:"value", inside:data}],
      macro: {name: "displayContent", scope : this}
    }/}

    //Bridge to hashspace
    {@hsp:Template {
      id: "hspid",
      type:"div",
      hsp: {
          src: getHsp(),
          args:[{moduleCtrl: this.moduleCtrl, data: data}]
      }
    } /}
  </div>
{/macro}

{macro displayContent()}
  ${data.value}
{/macro}
{/Template}