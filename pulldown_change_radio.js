/* プルダウンラベル化ver.2.0*/
var labelCustomFunc = {
  flg: false,
  create: function () {
    var targetElm = document.getElementsByName("プルダウン項目")[0].options;
    var returnText = "";
    var addText;
    var cl = document.createElement("div");
    // input,label要素の作成　※　ループはその都度記載変更が必要
    for (var i = 0; i < targetElm.length; i++) {
      if (targetElm[i]) {
        addText =
          "<input type='radio' id='choiceBox" +
          i +
          "' name='choiceBox" +
          "' value='" +
          targetElm[i].value +
          "'><label for='choiceBox" +
          i +
          "'>" +
          targetElm[i].innerHTML +
          "</label>";
        returnText = returnText + addText;
      }
    }
    cl.innerHTML = returnText;
    document.body.appendChild(cl);
  },
  triggerEvent: function (element, event) {
    //jsでtriggerイベント
    if (document.createEvent) {
      // IE以外
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true); // event type, bubbling, cancelable
      return element.dispatchEvent(evt);
    } else {
      // IE
      var evt = document.createEventObject();
      return element.fireEvent("on" + event, evt);
    }
  },
  click: function () {
    var createElm = document.getElementsByName("choiceBox");
    var targetElm = document.getElementsByName("LC_PURPOSE")[0];
    var array = "";
    if (createElm && targetElm) {
      for (var j = 0; j < createElm.length; j++) {
        //clickする用のfor文
        createElm[j].addEventListener(
          "click",
          function () {
            for (var k = 0; k < createElm.length; k++) {
              //arrayに格納するためのfor文
              if (createElm[k].checked && createElm[k].value) {
                array = createElm[k].value;
                console.log(array);
              }
            }
            for (var l = 0; l < targetElm.length; l++) {
              if (targetElm.options[l].value == array) {
                targetElm.options[l].selected = true;
                labelCustomFunc.triggerEvent(targetElm[l], "focus");
                labelCustomFunc.triggerEvent(targetElm[l], "blur");
              }
            }
          },
          false
        );
      }
    }
  },
};

labelCustomFunc.create();
labelCustomFunc.click();
