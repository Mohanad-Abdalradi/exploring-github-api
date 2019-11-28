const btuRepos = document.getElementById("btuRepos");
const btuIssues = document.getElementById("btuIssues");
const btuCommits = document.getElementById("btuCommits");

const divResult = document.getElementById("divResult");
btuRepos.addEventListener("click", getRepos);
btuIssues.addEventListener("click", getIssues);
btuCommits.addEventListener("click", getCommits);

async function getRepos() {
  clear();

  const url =
    "https://api.github.com/search/repositories?q=stars:100000..300000";
  const response = await fetch(url);
  const result = await response.json();

  result.items.forEach(i => {
    const anchor = document.createElement("a");
    anchor.href = i.html_url;
    anchor.textContent = i.full_name;
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement("br"));
  });
}

async function getIssues() {
  clear();

  const url =
    "https://api.github.com/search/issues?q=author:raisedadead repo:freecodecamp/freecodecamp type:issues type:issue";
  const response = await fetch(url);
  const result = await response.json();

  result.items.forEach(i => {
    const anchor = document.createElement("a");
    anchor.href = i.html_url;
    anchor.textContent = i.title;
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement("br"));
  });
}

async function getCommits() {
  clear();

  const url =
    "https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2019-03-31";
  const headers = {
    Accept: "application/vnd.github.cloak-preview"
  };
  const response = await fetch(url, {
    method: "GET",
    headers: headers
  });
  const result = await response.json();

  result.items.forEach(i => {
    const img = document.createElement("img");
    img.src = i.author.avatar_url;
    img.style.width = "32px";
    img.style.height = "32px";

    const anchor = document.createElement("a");
    anchor.href = i.html_url;
    anchor.textContent = i.commit.message;
    divResult.appendChild(img);
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement("br"));
  });
}

function clear() {
  while (divResult.firstChild) divResult.removeChild(divResult.firstChild);
}
