const btuRepos = document.getElementById("btuRepos");
const btuIssues = document.getElementById("btuIssues");

const divResult = document.getElementById("divResult");
btuRepos.addEventListener("click", gitRepos);
btuIssues.addEventListener("click", gitIssues);

async function gitRepos() {
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

async function gitIssues() {
  clear();

  const url =
    "https://api.github.com/search/issues?q=author:raisedadead repo:freecodecamp/freecodecamp type:issue";
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

function clear() {
  while (divResult.firstChild) divResult.removeChild(divResult.firstChild);
}
