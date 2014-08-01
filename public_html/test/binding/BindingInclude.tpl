{Template {
  $classpath: "test.binding.BindingInclude",
  $wlibs : {
     'html' : 'aria.html.HtmlLibrary',
     'hsp' : 'bridge.aria.widget.BridgeWidgetLib'
  },
  $hasScript : true
}}

{macro main()}
  <div class="attpl">

    ATLAS INNER<br/>
    {@html:TextInput {
      placeholder : "Type some text",
      id : "atlasInner",
      bind : {
          value : {
            inside : data,
            to : "value"
          }
        }
    }/}


    {@hsp:Template {
      id: "hspid",
      type:"div",
      hsp: {
          src: getHsp(),
          args:[{data: data}]
      }
    } /}

  </div>
{/macro}

{/Template}