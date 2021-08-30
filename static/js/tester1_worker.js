importScripts("https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js");

async function main() {
  await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/",
  });
  console.log(
    pyodide.runPython(`
        import sys
        sys.version
    `)
  );
  console.log(pyodide.runPython("print(1 + 2)"));
}
main();
