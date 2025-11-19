// Read package & price from URL
const url = new URL(window.location.href);
const packageName = url.searchParams.get("package");
const price = url.searchParams.get("price");

document.getElementById("selected").innerText =
  `You selected: ${packageName}`;
document.getElementById("amount").innerText = price;

// 10-minute timer
let timeLeft = 600;
const timer = document.getElementById("timer");

setInterval(() => {
  if (timeLeft <= 0) {
    timer.innerHTML = "⛔ QR expired — Reload to get new QR";
    return;
  }
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  timer.innerHTML = `⏳ ${min}:${sec.toString().padStart(2, '0')} remaining`;
  timeLeft--;
}, 1000);

// Submit booking to Google Sheet
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const data = {
    timestamp: new Date().toLocaleString(),
    package: packageName,
    name: form.get("name"),
    birthdate: form.get("birthdate"),
    weekday: form.get("weekday"),
    question: form.get("question"),
    payment: form.get("payment"),
    price: price
  };

  document.getElementById("status").innerText = "Submitting...";

  try {
    await fetch("PASTE_YOUR_SCRIPT_URL_HERE", {
      method: "POST",
      body: JSON.stringify(data)
    });

    document.getElementById("status").innerText =
      "✔ Booking received! We will verify your payment.";
  } catch (err) {
    document.getElementById("status").innerText =
      "❌ Failed — Try again.";
  }
});
