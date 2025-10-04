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
 * @param {number} x1
 * @param {(number|null)} y1
 * @param {(number|null)} x2
 * @param {(number|null)} y2
 * @param {(number|null)} θ1
 * @param {(number|null)} θ2
 * @param {(number|null)} a1
 * @param {(number|null)} a2
 * @param {(number|null)} g
 * @param {(number|null)} v1
 * @param {(number|null)} v2
 * @returns {number}
 */
const solve = (index, x1, y1, x2, y2, θ1, θ2, a1, a2, g = 9.8, v1, v2) => {
  if (index === 1) return Math.abs(x1) / Math.abs(y1);
  else if (index === 2) return x1 * y1;
  else if (index === 3) return x1 ** 2 / (2 * y1);
  else if (index === 4) return x1 * Math.cos((y1 * Math.PI) / 180);
  else if (index === 5) return (x1 * Math.sin((y1 * Math.PI) / 180)) / x2;
  else if (index === 6) return Math.sqrt((x1 * y1) ** 2 + (x2 * y2) ** 2);
  else if (index === 7) return (v2 - v1) / a1;
  else if (index === 8) return (2 * v1) / g;
  else if (index === 9)
    return (v1 ** 2 * Math.sin((2 * θ1 * Math.PI) / 180)) / g;
  else if (index === 10) {
    const v = a1 * x1;
    return 0.5 * a1 * x1 ** 2 + v * y1;
  } else if (index === 11) {
    const vx =
      v1 * Math.cos((θ1 * Math.PI) / 180) + v2 * Math.cos((θ2 * Math.PI) / 180);
    const vy =
      v1 * Math.sin((θ1 * Math.PI) / 180) + v2 * Math.sin((θ2 * Math.PI) / 180);
    return Math.sqrt(vx ** 2 + vy ** 2);
  } else if (index === 12) return v1 ** 2 / (2 * a1);
  else if (index === 13) return Math.sqrt((2 * x1) / g);
  else if (index === 14)
    return (v1 ** 2 * Math.sin((θ1 * Math.PI) / 180) ** 2) / (2 * g);
  else if (index === 15) return 0.5 * a1 * x1 ** 2;
  else if (index === 16) {
    const t = Math.sqrt((2 * x1) / g);
    return v1 * t;
  } else if (index === 17) return (v1 + v2) / 2;
  else if (index === 18) return Math.sqrt(v1 ** 2 + v2 ** 2);
  else if (index === 19) return Math.sqrt(2 * a1 * x1);
  else if (index === 20) return (2 * v1 * Math.sin((θ1 * Math.PI) / 180)) / g;
  else if (index === 21) return -(v1 ** 2 / (2 * x1));
  else if (index === 22) {
    const vy = Math.sqrt(2 * g * x1);
    return Math.sqrt(v1 ** 2 + vy ** 2);
  } else if (index === 23) return v1 * Math.cos((θ1 * Math.PI) / 180);
  else if (index === 24) return v1 - g * x1;
  else if (index === 25) return v1 + a1 * y1;
  else if (index === 26) {
    const s1 = 0.5 * a1 * x1 ** 2;
    const v = a1 * x1;
    const s2 = v ** 2 / (2 * a2);
    return s1 + s2;
  } else if (index === 27) {
    const t = Math.sqrt((2 * x1) / g);
    return v1 * t;
  } else if (index === 28) return g * Math.sin((θ1 * Math.PI) / 180);
  else if (index === 29) return v1 * Math.sin((θ1 * Math.PI) / 180) - g * x1;
  else if (index === 30) return v1 ** 2 / (2 * x1);
  else if (index === 31) return v1 * x1 + v1 * y1 + 0.5 * a1 * y1 ** 2;
  else if (index === 32) return Math.sqrt(2 * g * x1);
  else if (index === 33) {
    const vx = v1 * Math.cos((θ1 * Math.PI) / 180);
    const vy = v1 * Math.sin((θ1 * Math.PI) / 180) - g * x1;
    return (Math.atan(vy / vx) * 180) / Math.PI;
  } else if (index === 34) return v1 * x1 + 0.5 * a1 * x1 ** 2;
  else if (index === 35)
    return (v1 ** 2 * Math.sin((2 * θ1 * Math.PI) / 180)) / g;
  else if (index === 36) return Math.sqrt(v1 ** 2 + v2 ** 2);
  else if (index === 37) return (2 * x1) / y1 ** 2;
  else if (index === 38) {
    const vx = v1 * Math.cos((θ1 * Math.PI) / 180) + v2;
    const vy = v1 * Math.sin((θ1 * Math.PI) / 180);
    return Math.sqrt(vx ** 2 + vy ** 2);
  } else if (index === 39) return (Math.atan(v2 / v1) * 180) / Math.PI;
  else if (index === 40) return v1 / g;
  else if (index === 41) return (v2 ** 2 - v1 ** 2) / (2 * x1);
  else if (index === 42) return (2 * v1 * Math.sin((θ1 * Math.PI) / 180)) / g;
  else if (index === 43) return v1 ** 2 / (2 * a1);
  else if (index === 44) {
    const v = Math.sqrt(v1 ** 2 + v2 ** 2);
    const θ = (Math.atan(v2 / v1) * 180) / Math.PI;
    return { magnitude: v, angle: θ };
  } else if (index === 45) return Math.sqrt(2 * a1 * 100);
};
/**
 * @param {number} num
 */
const getQuest = (num) => {
  const i = Math.floor(num * Object.keys(data).length) + 1;
  const r2 = mkRng((seed - 2) / 2 + Math.E * Math.sin(seed));
  const num1 = r2() * 99;
  const num2 = r2() * 99;
  const num3 = r2() * 99;
  const num4 = r2() * 99;
  const num5 = r2() * 99;
  const num6 = r2() * 99;
  const num7 = r2() * 99;
  const num8 = r2() * 99;
  const num9 = r2() * 99;
  const num10 = r2() * 99;
  const x1 = Number(num1.toFixed(2)),
    y1 = Number(num2.toFixed(2)),
    x2 = Number(num3.toFixed(2)),
    y2 = Number(num4.toFixed(2)),
    θ1 = Number(num5.toFixed(2)),
    θ2 = Number(num6.toFixed(2)),
    a1 = Number(num7.toFixed(2)),
    a2 = Number(num8.toFixed(2)),
    v1 = Number(num9.toFixed(2)),
    v2 = Number(num10.toFixed(2));
  return [
    solve(i, x1, y1, x2, y2, θ1, θ2, a1, a2, 9.8, v1, v2),
    x1,
    y1,
    x2,
    y2,
    θ1,
    θ2,
    a1,
    a2,
    9.8,
    v1,
    v2,
    data[i]
      .replaceAll("{{x1}}", x1)
      .replaceAll("{{y1}}", y1)
      .replaceAll("{{x2}}", x2)
      .replaceAll("{{y2}}", y2)
      .replaceAll("{{θ1}}", θ1)
      .replaceAll("{{θ2}}", θ2)
      .replaceAll("{{a1}}", a1)
      .replaceAll("{{a2}}", a2)
      .replaceAll("{{g}}", 9.8)
      .replaceAll("{{v1}}", v1)
      .replaceAll("{{v2}}", v2),
  ];
};

/**
 * @param {number} r
 * @returns {number}
 */
const question = (r) => {
  const [answer, x1, y1, x2, y2, θ1, θ2, a1, a2, g, v1, v2, q] = getQuest(r);
  document.getElementById("quest").textContent = q;
  return answer;
};

let iter = 1,
  num = 0,
  ans = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const qReq = await fetch("/questions");
  if (qReq.status !== 200) {
    document.body.innerHTML = "<h1>error</h1>";
    console.error(`${qReq.status}: ${qReq.statusText}, ${await qReq.text()}`);
    return;
  }
  const qData = await qReq.json();
  data = qData;

  iter = 1;
  num = rand();
  ans = question(num);

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
  document.getElementById("next").addEventListener("click", () => {
    num = rand();
    ans = question(num);
    iter++;
    document.getElementById("questnum").textContent = iter;
  });
});
