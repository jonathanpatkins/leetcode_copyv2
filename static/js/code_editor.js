function setCookie(name, value) {
  document.cookie = name + "=" + (value || "");
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

var cm = CodeMirror(document.getElementById("cmblock"), {
  value: "",
  mode: "python",
  lineNumbers: true,
  keyMap: "sublime",
  indentUnit: 4,
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  theme: "blackboard",
  comment: true,
  tabSize: 4,
});

cm.setSize((width = "100%"), (height = "100%"));
cm.setOption("extraKeys", {
  Tab: function (cm) {
    if (cm.somethingSelected()) {
      cm.indentSelection("add");
    } else {
      cm.replaceSelection(
        cm.getOption("indentWithTabs")
          ? "\t"
          : Array(cm.getOption("indentUnit") + 1).join(" "),
        "end",
        "+input"
      );
    }
  },
});

// my edit
// will get code depending on what page we were on
CodeMirror.keyMap.default["Shift-Tab"] = "indentLess";
var code = localStorage.getItem("code" + yaml_data[0]);
if (code == "" || code === null) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `/static/data/problem_boilerplate/problem_${yaml_data[0]}.py`
  );
  xhr.onload = () => {
    code = xhr.responseText;
    cm.setValue(code);
  };
  xhr.send();
} else {
  cm.setValue(code);
}

// https://www.delftstack.com/howto/javascript/javascript-download/
function download(filename, textInput) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8, " + encodeURIComponent(textInput)
  );
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
document.getElementById("download").addEventListener(
  "click",
  function () {
    var text = cm.getValue().trim();
    var filename = "output.py";
    download(filename, text);
  },
  false
);

let diff = document.getElementById("difficulty");

if (diff.innerText === "Easy") {
  diff.style.color = "green";
} else if (diff.innerText === "Medium") {
  diff.style.color = "orange";
} else {
  diff.style.color = "red";
}

// changes the code editor theme
function changeTheme(theme, save = true) {
  if (save === true) {
    localStorage.setItem("theme", theme);
  }
  if (theme == 0) {
    cm.setOption("theme", "default");
  } else if (theme == 1) {
    cm.setOption("theme", "blackboard");
  } else if (theme == 2) {
    cm.setOption("theme", "monokai");
  } else if (theme == 3) {
    cm.setOption("theme", "cobalt");
  } else if (theme == 4) {
    cm.setOption("theme", "solarized");
  } else if (theme == 5) {
    cm.setOption("theme", "yeti");
  } else if (theme == 6) {
    cm.setOption("theme", "midnight");
  }
}
