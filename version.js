
const GIT_URL="https://raw.githubusercontent.com/SakharovIvan/Interskol_browser_extension/main/manifest.json"
const GIT_EXT_URL="https://github.com/SakharovIvan/Interskol_browser_extension/"
config = {
  version: "1.0.2",
};
async function fetchVersion() {
  try {
    const response = await fetch(
      GIT_URL,
    );

    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    // Парсим полученные данные в объект JSON
    const data = await response.json();
    if (data.version === config.version) {
      return;
    } else {
      let a = document.createElement("a");
      a.textContent = "Обновите программу!!!";
      a.setAttribute(
        "href",
        GIT_EXT_URL,
      );
      a.setAttribute("target", "_blank");
      a.setAttribute("target", "_blank");

      const checkelement = document.getElementById("version");
      let hr = document.createElement("hr");
      checkelement.appendChild(hr);
      a.className = "red";
      checkelement.appendChild(a);
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
try {
  fetchVersion();
} catch (error) {
  console.log(error);
}
