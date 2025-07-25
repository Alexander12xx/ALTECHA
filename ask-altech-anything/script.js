const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const languageSelect = document.getElementById("language-select");
const toggleTheme = document.getElementById("toggle-theme");

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

async function sendMessage() {
  const input = userInput.value;
  const lang = languageSelect.value;
  if (!input) return;

  const userMsg = document.createElement("p");
  userMsg.textContent = "🧑‍💻: " + input;
  chatBox.appendChild(userMsg);

  const reply = document.createElement("p");
  reply.textContent = "🤖: Typing...";
  chatBox.appendChild(reply);

  try {
    const response = await fetch("/.netlify/functions/ask-altech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, lang }),
    });

    const data = await response.json();
    reply.textContent = "🤖: " + data.reply + " — Powered by Altech";
  } catch (error) {
    reply.textContent = "🤖: There was an error. Please try again later.";
    console.error(error);
  }

  userInput.value = "";
}
