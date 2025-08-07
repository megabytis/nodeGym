const crypto = require("crypto");

// process.env.UV_THREADPOOL_SIZE = 10;

const start = Date.now();
console.log("🚀 Starting thread pool demo...");

for (let i = 1; i <= 6; i++) {
  crypto.pbkdf2("password", `salt${i}`, 100000, 512, "sha512", () => {
    console.log(`✅ Operation ${i} finished after ${Date.now() - start}ms`);
  });
}

console.log("📋 All 6 operations queued!");

crypto.pbkdf2("password", `salt`, 100000, 512, "sha512", () => {
  console.log(`1- finished after ${Date.now() - start}ms`);
});
crypto.pbkdf2("password", `salt`, 100000, 512, "sha512", () => {
  console.log(`2- finished after ${Date.now() - start}ms`);
});
crypto.pbkdf2("password", `salt`, 100000, 512, "sha512", () => {
  console.log(`3- finished after ${Date.now() - start}ms`);
});
crypto.pbkdf2("password", `salt`, 100000, 512, "sha512", () => {
  console.log(`4- finished after ${Date.now() - start}ms`);
});
crypto.pbkdf2("password", `salt`, 100000, 512, "sha512", () => {
  console.log(`5- finished after ${Date.now() - start}ms`);
});

// byDefault the thread pool thread size is 4, but we can increase or decrease the thread size using // process.env.UV_THREADPOOL_SIZE = 10;

// one operation will be sent to one single thread, when it will be freed, another operaton will be inserted to it !