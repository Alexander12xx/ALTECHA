exports.handler = async function (event, context) {
  try {
    const { message, lang } = JSON.parse(event.body);

    const prompt = `Answer in ${lang === "sw" ? "Swahili" : "English"}: ${message}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=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",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const result = await response.json();

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand that.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error("AI Function Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Server error. Please try again later." })
    };
  }
};
