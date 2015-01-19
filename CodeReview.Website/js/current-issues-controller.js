angular.module('', []);


function CurrentIssuesCtrl($scope, $http) {

    //var url = "https://status.campaignmonitor.com/api/issues/current?callback=JSON_CALLBACK";

    url = "js/test.json";

    $(".container a").first().on('click', function (e) {


        $http.get(url)

            .success(function (data, status) {

                console.log(status);

                $(".container div#results").fadeIn("slow");

                if (status == 200) {

                    if (data.length > 0) {

                        $scope.status = status;
                        $scope.calculateMins = calculateMins;
                        $scope.searchResult = data;

                    }
                    else {
                        $(".container div.no-issues-template").show();
                    }
                }
            })
            .error(function (data, status) {

                //error code goes here
               
            });

        e.preventDefault();
    });
}


function calculateMins(date) {

    var now = new Date();

    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    var utc = now.getTime() + (now.getTimezoneOffset() / 60000);

    console.log(now.getUTCFullYear() + "-" + (now.getUTCMonth() + 1) + "-" + now.getUTCDate() + " " + now.getUTCHours() + ":" + now.getUTCMinutes());

    var diffMs = (utc - Date.parse(date)); // milliseconds between now & date

    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return diffMins;
};


