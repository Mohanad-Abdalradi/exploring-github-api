const btuRepos = document.getElementById("btuRepos");
const btuIssues = document.getElementById("btuIssues");
const btuCommits = document.getElementById("btuCommits");

const divResult = document.getElementById("divResult");
btuRepos.addEventListener("click", getRepos);
btuIssues.addEventListener("click", getIssues);
btuCommits.addEventListener("click", e => getCommits());

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

async function getCommits(
  url = "https://api.github.com/search/commits?q=repo:freecodecamp/freecodecamp author-date:2019-03-01..2019-03-31"
) {
  clear();

  const headers = {
    Accept: "application/vnd.github.cloak-preview"
  };
  const response = await fetch(url, {
    method: "GET",
    headers: headers
  });
  //<https://api.github.com/search/commits?q=repo%3Afreecodecamp%2Ffreecodecamp+author-date%3A2019-03-01..2019-03-31&page=2>; rel="next", <https://api.github.com/search/commits?q=repo%3Afreecodecamp%2Ffreecodecamp+author-date%3A2019-03-01..2019-03-31&page=28>; rel="last"

  const link = response.headers.get("link");
  const links = link.split(",");
  const urls = links.map(a => {
    return {
      url: a
        .split(";")[0]
        .replace(">", "")
        .replace("<", ""),
      title: a.split(";")[1]
    };
  });

  const result = await response.json();

  result.items.forEach(i => {
    const img = document.createElement("img");
    img.src = i.author.avatar_url;
    img.style.width = "32px";
    img.style.height = "32px";

    const anchor = document.createElement("a");
    anchor.href = i.html_url;
    anchor.textContent = i.commit.message.substr(0, 120) + "...";
    divResult.appendChild(img);
    divResult.appendChild(anchor);
    divResult.appendChild(document.createElement("br"));
  });

  urls.forEach(u => {
    const btu = document.createElement("button");
    btu.textContent = u.title;
    btu.addEventListener("click", e => getCommits(u.url));
    divResult.appendChild(btu);
  });
}

function clear() {
  while (divResult.firstChild) divResult.removeChild(divResult.firstChild);
}
