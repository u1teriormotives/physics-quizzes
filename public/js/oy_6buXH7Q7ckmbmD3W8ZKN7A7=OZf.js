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

let seed = Math.floor(Math.random() * Math.random() * (3989898989 - 1e9)) + 1e9;
let rand = mkRng(seed);

/**
 * @param {number} index
 * @param {number} x
 * @param {(number|null)} y
 * @returns {number}
 */
const solve = (index, x1, y1, x2, y2) => {
  if (index === 1) return Math.abs(x1) / Math.abs(y1);
};
/**
 * @param {number} num
 * @return {[number, number, number, number, number, string]}
 */
const getQuest = (num) => {
  const i = Math.floor(num * Object.keys(data).length) + 1;
  const num1 = Math.random() * 99;
  const num2 = Math.random() * 99;
  const num3 = Math.random() * 99;
  const num4 = Math.random() * 99;
  const x1 = Number(num1.toFixed(2)),
    y1 = Number(num2.toFixed(2)),
    x2 = Number(num3.toFixed(2)),
    y2 = Number(num4.toFixed(2));
  return [
    solve(i, x, y),
    x1,
    y1,
    x2,
    y2,
    data[i]
      .replaceAll("{{x1}}", x1)
      .replaceAll("{{y1}}", y1)
      .replaceAll("{{x2}}", x2)
      .replaceAll("{{y2}}", y2),
  ];
};

/**
 * @param {number} r
 * @returns {number}
 */
const question = (r) => {
  const [answer, x1, y1, x2, y2, q] = getQuest(r);
  document.getElementById("quest").textContent = q;
  return answer;
};

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
  let ans = question(num);

  document.getElementById("questnum").textContent = iter;
  document.getElementById("seed").textContent = seed;

  document.getElementById("seeding").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const s = Number(document.querySelector("input#setseed").value);
    document.querySelector("input#setseed").value = "";
    seed = typeof s === "number" && !isNaN(s) && isFinite(s) ? s : 123456;
    rand = mkRng(seed);
    iter = 1;

    document.getElementById("seed").textContent = seed;
    document.getElementById("questnum").textContent = 1;

    num = rand();
    ans = question(num);
  });
  document.getElementById("formq").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const answer = Number(document.getElementById("ans").value);
    if (isNaN(answer) || !isFinite(answer)) {
      return (document.getElementById("qresult").textContent =
        "Please enter a number for your answer");
    }
    if (answer <= ans + 0.1 && answer >= ans - 0.1)
      return (document.getElementById("qresult").textContent = "Correct!");
    else return (document.getElementById("qresult").textContent = "Incorrect.");
  });
});
