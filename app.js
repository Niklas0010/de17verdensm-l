const url = "https://api.mediehuset.net/sdg/goals";
const maincontainer = document.getElementById("maincontainer");

function listController() {
  removeHTML();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let item of data.items) {
        const { id, title, icon, color, byline } = item;
        console.log(item);
        listView(id, title, icon, color, byline);
      }
    });
}

function listView(id, title, icon, color, byline) {
  maincontainer.classList.add("containerGrid");
  const div = document.createElement("div");
  div.setAttribute("id", `goal-${id}`);
  div.style.backgroundColor = `#${color}`;

  div.innerHTML = icon;

  const h2 = document.createElement("h2");
  h2.innerText = title;
  div.appendChild(h2);

  const span_byline = document.createElement("span");
  span_byline.innerText = byline;
  div.appendChild(span_byline);

  div.onclick = () => {
    DetailController(id);
  };

  maincontainer.appendChild(div);
}

function DetailController(id) {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      removeHTML();
      DetailView(data.item);
    });
}

function DetailView({ id, title, description, image, color, byline } = data) {
  maincontainer.classList.remove("containerGrid");
  document.body.style.backgroundColor = `#${color}`;

  const div = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  div.appendChild(h2);

  const a = document.createElement("a");
  a.innerHTML = "&laquo; Tilbage til oversigt";
  a.onclick = () => {
    listController();
    document.body.style.backgroundColor = "";
  };
  div.appendChild(a);

  const p = document.createElement("p");
  p.innerText = description;
  div.appendChild(p);

  maincontainer.appendChild(div);
}

function removeHTML() {
  maincontainer.innerHTML = "";
}

listController();
