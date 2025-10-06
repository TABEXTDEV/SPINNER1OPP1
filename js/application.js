


tableau.extensions.initializeAsync().then(function () {
    // Get the worksheet named "work1"
    const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets.find(w => w.name === 'Opposite');
  
    // Get the data from the worksheet


    function LoadGameExample(){
      worksheet.getSummaryDataAsync().then(function (sumdata) {
        const data = sumdata.data;
        const rowData = [];
        const Uniqueidentifier = [];
        const RoundExamples = [];
        let Banker = 0;
        let Player = 0;
    //    $('#my-table').DataTable().clear().destroy();
        $(".butoon-container").empty();
        $(".UserData").empty();
        // Loop through each row of data and convert to an object
        for (let i = 0; i < data.length; i++) {
  
  
            
                    if (!Uniqueidentifier.some(obj => obj.Uniqueidentifier === data[i][2].value + data[i][3].value)) {
              Uniqueidentifier.push({ Uniqueidentifier: data[i][2].value + data[i][3].value, UniqueGroup: String.fromCharCode(65 + Uniqueidentifier.length) });
              
              
  /*
              var button = $("<button/>", {
                "data-Uniqueidentifier": data[i][2].value + data[i][3].value,
                //text: String.fromCharCode(65 + Uniqueidentifier.length),
                text: data[i][2].value + " " +data[i][3].value,
                "data-UniqueGroup": String.fromCharCode(65 + Uniqueidentifier.length),
                id: "333"
  
              });
  */

              var button = $("<button/>", {
               // "data-Uniqueidentifier": data[i][2].value + data[i][3].value,
                "data-Uniqueidentifier": data[i][2].value + data[i][3].value,
                "data-UniqueGroup": String.fromCharCode(65 + Uniqueidentifier.length),
                id: "333"
              }).append(
                '<a href="#_" class="inline-flex overflow-hidden text-white bg-gray-900 rounded group">\n' +
                '  <span class="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">\n' +
                '    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>\n' +

                
               
               '<p class="margin-l"> '+data[i][3].value+'</p>\n' +
                '  </span>\n' +
              '  <span class="pl-4 pr-5 py-2.5">'+data[i][2].value+'</span>\n' +
                '</a>'
              );
              
              $(".butoon-container").append(button);
            }

  
            if(data[i][8].value == "BANKER"){
              Banker += data[i][10].value;
            }else if (data[i][8].value == "PLAYER"){
              Player += data[i][10].value;
            }
  
          const rowObj = {
              Createdate: data[i][0].formattedValue,
              Gameid: data[i][1].value,
              Partner: data[i][2].value,
              //SubPartner: data[i][3].value,
              //OperatorID: data[i][4].value === "%null%" ? " " : data[i][4].value,
              // Casino player id
              UserId: data[i][3].value,
              UserName: data[i][4].value === "%null%" ? " " : data[i][4].value,
              TableType: data[i][5].value,
              TableId: data[i][6].value,
              BetPosition: data[i][7].value,
              Currency: data[i][8].value,
              Amount: data[i][9].value,
              Net: data[i][10].formattedValue,
              UniqueGroup: "no",
              Uniqueidentifier: data[i][2].value + data[i][3].value,
              UniquePlayerID: data[i][3].value + "/" + data[i][2].formattedValue
          };
    
          // Add the row object to the array
  
          for(let Y = 0; Y < Uniqueidentifier.length; Y++){
              if(data[i][2].value + data[i][3].value == Uniqueidentifier[Y].Uniqueidentifier){
                  rowObj.UniqueGroup = Uniqueidentifier[Y].UniqueGroup
              }
          }
  
  
          rowData.push(rowObj);
  

        }
  
        console.log(rowData)
  
        
        
        
        function GetPlayerList(){


    let uniqueArray = [...new Set(rowData.map(item => item.UniquePlayerID))];

    
    console.log(uniqueArray)

    $(".player-list-count").html(uniqueArray.length);

$('#myTable').DataTable({
    data: uniqueArray.map(id => [id]),
    searching: false,
    bPaginate: false,
    ordering: false,
    stateSave: true,
    bDestroy: true,
    destroy: true,
    pageLength: -1,
    dom: 'Bfrtip',
    buttons: [{
        extend: 'copyHtml5',
        text: '    ',
        title: '',
        columns: ':not(:last-child)'
    }],
    columns: [{ title: "" }]
});

$('title').remove(); //Remove document title



console.log(uniqueArray.length)

  
  
}

 GetPlayerList()
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
     //   console.log(Uniqueidentifier)


   function PlayerExampleGenerator() {
     $(".UserData").empty();

  const uniqueGameIds = [...new Set(rowData.map(item => item.Gameid))];
  const resultArray = [];

  uniqueGameIds.forEach(gameId => {
    const gameData = { gameId: gameId };
    const playersInGame = [];

    rowData.forEach(item => {
      if (item.Gameid === gameId) {
        const betPosition = item.BetPosition;
        if (betPosition === "BANKER_no_commission" || betPosition === "RED") {
          gameData.BANKER = (gameData.BANKER || 0) + item.Amount;
        } else if (betPosition === "player_no_commission" || betPosition === "BLACK") {
          gameData.PLAYER = (gameData.PLAYER || 0) + item.Amount;
        } else {
          gameData[betPosition] = (gameData[betPosition] || 0) + item.Amount;
        }
        playersInGame.push(item.UserId);
      }
    });

    gameData.players = [...new Set(playersInGame)];
    gameData.difference = (gameData.BANKER || 0) - (gameData.PLAYER || 0);
    gameData.differencePercentage = ((gameData.BANKER || 0) - (gameData.PLAYER || 0)) / (gameData.PLAYER || 1) * 100;
    resultArray.push(gameData);
  });

  const filteredArray = [];
  const userIds = {};

  resultArray.forEach(gameData => {
    const uniquePlayers = [...new Set(gameData.players)];

    if (uniquePlayers.length > 0) {
      let exampleCount = 0;

      if (uniquePlayers.length <= 5) {
        exampleCount = 1;
      } else {
        exampleCount = 2;
      }

      if (gameData.differencePercentage <= 45 && gameData.differencePercentage >= -45) {
        let bankerGames = filteredArray.filter(game => game.UserId === 'BANKER');
        let playerGames = filteredArray.filter(game => game.UserId === 'PLAYER');
        let topBankerGame = bankerGames.reduce((max, game) => max.BANKER > game.BANKER ? max : game, {BANKER: -Infinity});
        let topPlayerGame = playerGames.reduce((max, game) => max.PLAYER > game.PLAYER ? max : game, {PLAYER: -Infinity});

        if ((gameData.BANKER || 0) > topBankerGame.BANKER || (gameData.PLAYER || 0) > topPlayerGame.PLAYER) {
          const gameIdList = [];
          for (let i = 0; i < exampleCount; i++) {
            gameIdList.push(gameData.gameId);
          }
          filteredArray.push({
            UserId: gameData.BANKER >= gameData.PLAYER ? 'BANKER' : 'PLAYER',
            gameIdList,
            BANKER: gameData.BANKER || 0,
            PLAYER: gameData.PLAYER || 0,
            difference: gameData.difference || 0,
            differencePercentage: gameData.differencePercentage || 0
          });
        }
      }
    } else {
      alert("Something is wrong...");
      return false;
    }
  });

  // Sort filteredArray by highest rounds by panker or player amount
  filteredArray.sort((a, b) => {
    const aMaxBet = Math.max(a.BANKER, a.PLAYER);
    const bMaxBet = Math.max(b.BANKER, b.PLAYER);
    return bMaxBet - aMaxBet;
  });
  
    // Sort filteredArray by highest rounds by panker or player amount
    filteredArray.sort((a, b) => {
      const aMaxBet = Math.max(a.BANKER, a.PLAYER);
      const bMaxBet = Math.max(b.BANKER, b.PLAYER);
      return bMaxBet - aMaxBet;
    });
  
    const matchingRows = rowData.filter(row => filteredArray.some(filteredRow => filteredRow.gameIdList.includes(row.Gameid)));
  
    console.log(resultArray);
    console.log(filteredArray);
    console.log(matchingRows);
  
    GenerateHtmalTable(matchingRows);
  }
    
    

//PlayerExampleGenerator()


    
function GenerateHtmalTable(matchingRows){

        var data = matchingRows || rowData;

    //   $('#my-table').DataTable().clear().destroy();
          // Add the row data to the HTML table
          const table = document.getElementById("my-table");
          const tbody = table.getElementsByTagName("tbody")[0];
      
          for (let i = 0; i < data.length; i++) {
            const row = tbody.insertRow();
      
            const Createdate = row.insertCell(0);
            Createdate.innerHTML = data[i].Createdate;
      
            const Gameid = row.insertCell(1);
            Gameid.innerHTML = data[i].Gameid;
    
            const Partner = row.insertCell(2);
            Partner.innerHTML = data[i].Partner;
            //Partner.classList.add("category");
            Partner.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            Partner.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            Partner.setAttribute("data-Partner", data[i].Partner);
    
    
           // const SubPartner = row.insertCell(3);
            //SubPartner.innerHTML = data[i].SubPartner;
            //SubPartner.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            //SubPartner.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            //SubPartner.setAttribute("data-SubPartner", data[i].SubPartner);
    
            
            
            
            //const OperatorID = row.insertCell(4);
            //OperatorID.innerHTML = data[i].OperatorID;
            //OperatorID.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            //OperatorID.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            //OperatorID.setAttribute("data-OperatorID", data[i].OperatorID);
            
            

    
            
            const UserId = row.insertCell(3);
            UserId.innerHTML = data[i].UserId;
            UserId.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            UserId.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            UserId.setAttribute("data-UserId", data[i].UserId);
    
            const UserName = row.insertCell(4);
            UserName.innerHTML = data[i].UserName;
            UserName.setAttribute("data-UniqueGroup", data[i].UniqueGroup);
            UserName.setAttribute("data-Uniqueidentifier", data[i].Uniqueidentifier);
            UserName.setAttribute("data-UserName", data[i].UserName);
    
            const TableType = row.insertCell(5);
            TableType.innerHTML = data[i].TableType;
    
            const TableId = row.insertCell(6);
            TableId.innerHTML = data[i].TableId;
    
            const BetPosition = row.insertCell(7);
            BetPosition.innerHTML = data[i].BetPosition;
    
            const Currency = row.insertCell(8);
            Currency.innerHTML = data[i].Currency;
    
    
            const Amount = row.insertCell(9);
            Amount.innerHTML = data[i].Amount;
    
    
            const Net = row.insertCell(10);
            Net.innerHTML = data[i].Net;
    
    
    
    
    
    
    
          }
}
  
GenerateHtmalTable()

let bankerFormatted = Banker.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
let bankerWithoutSymbol = bankerFormatted.replace(/[$]/g, '');
$(".banker").html(bankerWithoutSymbol);
        
let PlayerFormatted = Player.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
let PlayerWithoutSymbol = PlayerFormatted.replace(/[$]/g, '');
$(".player").html(PlayerWithoutSymbol);

  $("#example-btn").on("click", function() {
  //  $(".butoon-container").empty()
  PlayerExampleGenerator()
  });

  
  
  
  $('button[data-Uniqueidentifier]').click(function() {
    var clickedUniqueId = $(this).attr('data-Uniqueidentifier');
    
    currentBrand = clickedUniqueId;
    
    $('td[data-Uniqueidentifier]').each(function() {
      var tdUniqueId = $(this).attr('data-Uniqueidentifier');
      if (tdUniqueId !== clickedUniqueId) {
       // $(this).html($(this).attr("data-UniqueGroup"));
      //  console.log($(this).attr("data-UniqueGroup"))
  
     // console.log($(this).html($(this).attr("data-UniqueGroup")))
  
     if($(this).is('[data-userid]')){
  
      let UserIdY = $(this).attr('data-userid')
        console.log(UserIdY)
        $(this).html("User ID " + $(this).attr("data-uniquegroup"))
  
  
     }else if($(this).is('[data-partner]')){
      $(this).html("Partner Id " + $(this).attr("data-uniquegroup"))
     }else if($(this).is('[data-subpartner]')){
      $(this).html("Sub Partner Id " + $(this).attr("data-uniquegroup"))
     }else if($(this).is('[data-username]')){
      $(this).html("User Name  " + $(this).attr("data-uniquegroup"))
     }
        else if($(this).is('[data-OperatorID]')){
      $(this).html("Operator User Id  " + $(this).attr("data-uniquegroup"))
     }
      }else{
        if($(this).is('[data-userid]')){
  
          let UserIdY = $(this).attr('data-userid')
            console.log(UserIdY)
            $(this).html($(this).attr('data-userid'))
      
      
         }else if($(this).is('[data-partner]')){
          $(this).html($(this).attr('data-partner'))
         }else if($(this).is('[data-subpartner]')){
          $(this).html($(this).attr('data-subpartner'))
         }else if($(this).is('[data-username]')){
          $(this).html($(this).attr('data-username'))
         }
        else if($(this).is('[data-OperatorID]')){
          $(this).html($(this).attr('data-OperatorID'))
         }
        
        
        
        
      }
    });
  });
  
  
  
      });
    }


    $("#load").on("click", function() {
            $('#my-table').DataTable().destroy();     
        $('#my-Table').DataTable();     
      $(".butoon-container").empty();
      LoadGameExample()
    });
  });

let currentBrand = "No Brand name selected";
let TicketCount = 0;


function LoadDataTables() {
    TicketCount += 1;

    // Get current timestamp in 24-hour format with seconds
    let now = new Date();
    let timestamp = now.getFullYear() + "-" +
                    String(now.getMonth() + 1).padStart(2, '0') + "-" +
                    String(now.getDate()).padStart(2, '0') + "_" +
                    String(now.getHours()).padStart(2, '0') + "-" +
                    String(now.getMinutes()).padStart(2, '0') + "-" +
                    String(now.getSeconds()).padStart(2, '0');

    $('#my-table').DataTable({
        "searching": false,
        "bPaginate": false,
        "ordering": false,
        stateSave: true,
        "bDestroy": true,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excelHtml5',
            title: '',
            filename: "Example_" + currentBrand + "_LFS_" + TicketCount + "_" + timestamp,
            text: 'Excel',

            customize: function (xlsx) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];

                // jQuery selector to add a border
                $('row c[r]', sheet).attr('s', '25');
                $('row:first c', sheet).attr('s', '47');
            },
        }]
    });
}

/*
  $("#export-btn").on("click", function() {
    
    LoadDataTables()
    $(".buttons-excel").trigger("click");
 //   $('#my-table').DataTable().clear().destroy();
  });

*/


/*function LoadDataTables(){
  $('#my-table').DataTable({
    "searching": false,
    "bPaginate": false,
    "ordering": false,
    stateSave: true,
  "bDestroy": true,
    destroy: true,
     pageLength: -1,
    dom: 'Bfrtip',
    buttons: [{
      extend: 'excelHtml5',
      title: '',
      text: 'Excel',
      
      customize: function(xlsx) {
        var sheet = xlsx.xl.worksheets['sheet1.xml'];

        // jQuery selector to add a border
        $('row c[r]', sheet).attr('s', '25');
        $('row:first c', sheet).attr('s', '47');
      },
    }]

  });
}*/

$("#export-btn").on("click", function() {
  
  LoadDataTables()
  $(".buttons-excel").trigger("click");
//   $('#my-table').DataTable().clear().destroy();
});

function openPopup(title, desc) {
  // Get the elements for the popup
  const popupOverlay = document.getElementById('popupOverlay');
  const popupContent = document.getElementById('popupContent');
  const popupTitle = document.getElementById('popupTitle');
  const popupDesc = document.getElementById('popupDesc');
  const copyButton = document.getElementById('copyButton');

  // Set the content and show the popup
  popupTitle.innerText = title;
  popupDesc.innerText = desc;
  popupOverlay.classList.remove('hidden');
  popupContent.classList.remove('hidden');

  // Add event listener to close the popup when copy button is pressed
  copyButton.addEventListener('click', function () {
    $(".buttons-copy").trigger("click");
    popupOverlay.classList.add('hidden');
    popupContent.classList.add('hidden');
    
    
  });
}


