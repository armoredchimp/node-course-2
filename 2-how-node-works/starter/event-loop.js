const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 5;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));
fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3330);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100001, 1024, "sha512", () => {
    console.log(Date.now() - start, "password2 encrypted");
  });
  crypto.pbkdf2("password", "salt", 100003, 1024, "sha512", () => {
    console.log(Date.now() - start, "password3 encrypted");
  });
  crypto.pbkdf2("password", "salt", 100500, 1024, "sha512", () => {
    console.log(Date.now() - start, "password4 encrypted");
  });
});

console.log("Hello from the top level code. No callbacks"); //1st (top level code)
