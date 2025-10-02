export default function (errorCode, message) {
  return `<main>
  <h1>ERROR ${errorCode}</h1>
  <p>${message}</p>
</main>`;
}
