let data = {};

/**
 * @param {number} seed 
 * @returns {() => number}
 */
const mkRng = (seed) => {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;

  return function () {
    state = (state * 48271) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

const seed =
  Math.floor(Math.random() * Math.random() * (3989898989 - 1e9)) + 1e9;
const rand = mkRng(seed);

document.addEventListener("DOMContentLoaded", async () => {
  const qReq = await fetch("/questions");
  if (qReq.status !== 200) {
    document.body.innerHTML = "<h1>error</h1>";
    console.error(`${qReq.status}: ${qReq.statusText}, ${await qReq.text()}`);
    return;
  }
  const qData = await qReq.json();
  data = qData;

  let iter = 1;
  let num = rand();

  document.getElementById("questnum").textContent = iter;
  document.getElementById("seed").textContent = seed;
});
