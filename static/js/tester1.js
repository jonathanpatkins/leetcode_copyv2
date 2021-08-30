if (window.Worker) {
  let myWorker = new Worker("/static/js/tester1_worker.js");
  console.log("worker created for tester1");
}
