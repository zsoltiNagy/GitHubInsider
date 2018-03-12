//document.getElementById("textInput").action = getCompanyName();

function getCompanyName() {
  var companyName = document.getElementById("companyName").value;
  getBasicRepoInfo(companyName);
  console.log(companyName);
}

function getBasicRepoInfo(companyName) {

  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.github.com/orgs/' + companyName + '/repos', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) { // succesful response
      var data = JSON.parse(request.responseText);
      // get important parts from reponse
      var mainList = filterData(data);
      // refill table from selected data
      reFillTable(mainList);
    } else {
      alert("Nope.")
    }
  };


  request.send()
}

function filterData(data) {
  var mainList = [];
  for (var i = 0; i < data.length; i++) {
    repoList = [];
    repoList.push(data[i].name);
    repoList.push(data[i].forks_count);
    repoList.push(data[i].updated_at);
    mainList.push(repoList);
  }
  return mainList;
}

function reFillTable(mainList) {
  document.getElementById("compRepos").innerHTML = '';
  var tableHeads = ["Name", "Fork count", "Updated at"];
  for (let i = 0; i < mainList.length; i++) {
    var row = "<tr>";
    for (let j = 0; j < mainList[i].length; j++) {
      row  += "<td data-column=" + tableHeads[j] + ">" + mainList[i][j] + "</td>";
    }
    row += "</tr>"
    document.getElementById("compRepos").innerHTML += row;
  }
}
