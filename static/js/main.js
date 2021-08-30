var pythonError = false;

// Reset the run code button
function resetButtons() {
  document.getElementById("run").disabled = true;
}

// clears the stdout console of output
function clearConsole() {
  document.getElementById("output").innerText = "";
}

// clears the results from the submissions tab
function clearResults() {
  document.getElementById("nav-submission").innerHTML = "";
}

// logs the text to the stdout console with a time stamp
function log(text) {
  text = text.toString();

  if (text === "") {
    return;
  }

  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time =
    "[" +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    "] ";

  let consoleLog = document.getElementById("output");
  if (text.includes("Python exception:") || text.includes("Traceback")) {
    pythonError = true;
  }
  if (pythonError) {
    text =
      "Traceback (most recent last call):<br> " +
      text.slice(text.lastIndexOf("File"), -1);
    consoleLog.innerHTML +=
      '<span style= "color: red;">' + time + text + "</span>" + "<br>";
    if (text.includes("Error:")) {
      pythonError = false;
    }
  } else if (text.includes("ERROR:")) {
    consoleLog.innerHTML +=
      '<span style= "color: red;">' + time + text + "</span>" + "<br>";
    console.log("sdc");
  } else {
    consoleLog.innerHTML += time + text + "<br>";
  }
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

// Creates a web worker with the file evaluate_code.js
// On click of the button run code then a message is posted to the worker with the code and the yaml context
// When a message is recieved from the worker then the results are posted to submissions and to stdout console
if (window.Worker) {
  let myWorker = new Worker("/static/js/evaluate_code.js");
  console.log("Worker created");

  document.getElementById("run").addEventListener("click", function () {
    clearResults();

    code = cm.getValue().trim();
    localStorage.setItem("code" + yaml_data[0], code);

    myWorker.postMessage({
      code: code,
      context: JSON.parse(JSON.stringify(yaml_data)),
    });
    console.log("Message has been posted to web worker");
  });

  myWorker.onmessage = function (e) {
    console.log("Message received from worker");
    log(e.data.output); // to the console
    let nav_submission = document.getElementById("nav-submission");
    nav_submission.innerHTML += e.data.html_message; // this is the result
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
