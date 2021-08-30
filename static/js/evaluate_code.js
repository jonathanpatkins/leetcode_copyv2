// necessary to import to use pyodide
importScripts("https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js");

// init Pyodide
async function main() {
  await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/",
  });
  // basically needed for exceptions and rerouting the stdout from prints in the python code
  pyodide.runPython(`
                      import sys
                      import traceback
                      from traceback import format_exception
                      sys.version
                      import io
                      sys.stdout = io.StringIO()
                      `);
}
let getReadyPromise = main();
console.log("ready");

// evaluates the code on the test cases and posts a message with the results
async function evaluatePython(e) {
  // does not run the rest of the code until the instance of pyodide is ready
  await getReadyPromise;
  console.log("Running code...");
  let code = e.data.code;
  let yaml_data = e.data.context;
  let html_message = "";
  let output = "";

  for (let i = 8, j = 1; i < 11; i += 2, j += 1) {
    // to formate the errors
    pyodide.runPython(`
                        def reformat_exception():
                            from traceback import format_exception
                            # Format a modified exception here
                            # this just prints it normally but you could for instance filter some frames
                            e = "".join(
                                traceback.format_exception(sys.last_type, sys.last_value, sys.last_traceback)
                            )
                            return e[:e.find(":") + 3] + e[e.rfind("File"):]
                        `);
    let reformat_exception = pyodide.globals.get("reformat_exception");

    try {
      // this is the result of running the code on an input
      var return_value = await pyodide.runPythonAsync(
        `${code}\n${yaml_data[17]}(${yaml_data[i]})`
      );
      // collects the stdout - any print statements that occurred in the python code
      output = await pyodide.runPythonAsync("sys.stdout.getvalue()");

      console.log("return value: ", return_value);
      console.log("output: ", output);

      let correct = false;
      if (return_value != undefined) {
        correct = return_value.toString().trim() == yaml_data[i + 1];
      }

      // formats the html to for the submissions tab
      html_message += `<div class="btn m-1 btn-${
        correct ? "success" : "danger"
      } testcase-result" style="width: 100%;" type="button" data-bs-toggle="collapse" data-bs-target="#test-case${j}" aria-expanded = "false" aria-controls = "collapseExample"> +Test Case #${j}: ${
        correct ? "Passed" : "Failed"
      }</div> <div class= "collapse testcase-result-text" id = "test-case${j}" ><div class = "card card-body m-3 p-3 bg-light" style=color:"black;">Input: ${
        yaml_data[i]
      } <br>Output: ${return_value} <br >Expected: ${yaml_data[
        i + 1
      ].trim()} </div> </div>`;
    } catch (err) {
      output = reformat_exception();

      // formats the html to for the submissions tab
      html_message += `<div class="btn m-1 testcase-result" style="width: 100%; background-color: orange" type="button" data-bs-toggle="collapse" data-bs-target="#test-case${j}" aria-expanded = "false" aria-controls = "collapseExample"> +Test Case #${j}: Error </div> <div class= "collapse" id = "test-case${j}"><div class = "card card-body m-3 p-3 bg-light testcase-result-text" style=color:"black;">Input: ${
        yaml_data[i]
      } <br>Output: Error <br >Expected: ${yaml_data[
        i + 1
      ].trim()} </div> </div>`;
    }
    // https://stackoverflow.com/questions/59026837/how-to-flush-python-io-stream
    // basically we need to shift where we are in the stream and truncate it to effectively "clear" out the stream
    pyodide.runPython("sys.stdout.seek(0)");
    pyodide.runPython("sys.stdout.truncate(0)");

    output.scrollTop = output.scrollHeight;
  }
  postMessage({ output: output, html_message: html_message });
}

onmessage = function (e) {
  evaluatePython(e);
};
