config = {
  version: "1.0.0",
};
const SP_warehouse_status_view = {
  "": "Нет на складе",
  null: "Нет на складе",
  0: "Нет на складе",
  1: "В наличии",
  2: "Путь",
  3: "Только под гарантию",
};

const button = document.getElementById("check");
button.onclick = async function () {
  const value = document.getElementById("text").value;
  const SP_ServiceURL = "https://interskol-b2b-test.ru/api/spareparts/";
  const answer = document.getElementById("answer");

  Array.from(answer.children).forEach((child) => child.remove());

  fetch(SP_ServiceURL + value, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${JSON.stringify(response)}`);
      }
      return response.json();
    })
    .then((spinfo) => {
      if (spinfo.status === 404) {
        throw new Error(`Ошибка HTTP! Статус: ${JSON.stringify(response)}`);
      }
      let name = document.createElement("div");
      name.textContent = "Наименование: " + spinfo.name;
      let warehouse = document.createElement("div");
      warehouse.textContent =
        "Склад: " + SP_warehouse_status_view[spinfo.warehouseqty];

      answer.appendChild(name);
      answer.appendChild(warehouse);
    })
    .catch((error) => {
      let name = document.createElement("div");
      name.textContent = "Артикул не найден ((";
      answer.appendChild(name);
    });

  try {
    const analog_search = await fetch(SP_ServiceURL + "analog/" + value, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!analog_search.ok) {
      throw new Error(`Ошибка HTTP! Статус: ${JSON.stringify(response)}`);
    }

    const analog = await analog_search.json();
    if (analog.status === 404) {
      throw new Error(`Ошибка HTTP! Статус: ${JSON.stringify(response)}`);
    }
    // Создаем таблицу для отображения аналога
    let table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    // Заголовки таблицы
    let headerRow = table.insertRow();
    let percentageHeaderCell = headerRow.insertCell();
    let spmatNoAnalogHeaderCell = headerRow.insertCell();
    percentageHeaderCell.innerHTML = "<strong>% Соответствия</strong>";
    spmatNoAnalogHeaderCell.innerHTML = "<strong>Номер аналога</strong>";

    // Заполняем строки таблицей данных
    for (let i = 0; i < analog.length; i++) {
      let row = table.insertRow();
      let percentageCell = row.insertCell();
      let spmatNoAnalogCell = row.insertCell();

      percentageCell.textContent = `${analog[i].percentage}%`;
      spmatNoAnalogCell.textContent = analog[i].spmatNoanalog;
    }

    // Добавляем таблицу в документ
    answer.appendChild(table);
  } catch (error) {
    console.log(error);
  }
  return;
};

async function fetchVersion() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/SakharovIvan/Interskol_browser_extension/main/manifest.json",
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
        "https://github.com/SakharovIvan/Interskol_browser_extension/",
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
