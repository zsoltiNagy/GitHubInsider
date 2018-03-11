function getCompanyName(){
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
      var mainList = [];
      for (var i = 0; i < data.length; i++) {
        repoList = [];
        repoList.push(data[i].name);
        repoList.push(data[i].forks_count);
        repoList.push(data[i].updated_at);
        mainList.push(repoList);
      }

      var rowPart = "";
      var tableHeads = ["Name","Fork count","Updated at"];
      for (var i = 0; i < mainList.length; i++) {
        var row = "<tr>";
        for (var j = 0; j < mainList[i].length; j++) {
          if (mainList[i] != null) {
            rowPart = "<td data-column="+tableHeads[j]+">" + mainList[i][j] + "</td>";
          } else {
            rowPart = "undefined";
          }
          row += rowPart;
        }
        row += "</tr>"
        document.getElementById("compRepos").innerHTML += row;
      }
    } else {
      alert("Nope.")
    }
  };


  request.send()
}
