$(document).ready(function() {
    // var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}'
    //     fetch(requestUrl)
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(data){
    //         console.log(data)
    //     })


    var btnsearch = $('#searchbtn');
    var recentsearch = $('.container-aside');
    var searcharea = $('.textarea');
    var dayscontainer = $('.dayscontainer');
    var daystoClone = $('.daytoforecast');
    var citynumber = 0;
    var flag = 0;
    
    btnsearch.on('click', function(e){
        e.preventDefault();
        $('.startsearch').addClass('show')

        if(searcharea.val() == ''){
            alert('no data input');
            return;
        }
        // else if(limitofcities.length > 5){
        //     $('.recentcitysearch').pop()
        // }
        
        var newElement =  $('<button>');
        var trimtext = searcharea.val().trim()
        var adjustText = trimtext.charAt(0).toUpperCase() + trimtext.slice(1).toLowerCase();
        newElement.addClass('bg-secondary rounded text-center text-white mb-2 col-12 border-0 recentcitysearch').text(adjustText);
        recentsearch.prepend(newElement)
        $('#currentcity').text(adjustText + ' now');
        if(citynumber < 5){
            localStorage.setItem(citynumber,adjustText)
            citynumber++;
        }else{
            citynumber = 0; //reset local storage to save the last 5 items.
        }
        if(flag > 4){
            // $('.recentcitysearch').pop()
            var lastone = $('.recentcitysearch').last().addClass("hide");
            delete lastone
            // lastone.addClass("hide")
            // console.log(lastone)
        }
        flag++;
    })
    
    function cloneDays(){
        for(var i=2; i<6;i++){
            var clonedDay = daystoClone.clone();
            clonedDay.children().children('h6').text('Day ' + i);
            clonedDay.attr('id' , 'day-' + i).appendTo(dayscontainer);
        }
    }

    cloneDays();

    // function setRecentCities(){
    //     for(var i=0; i<localStorage.length;i++){
    //         data = localStorage.getItem(i,data)
    //         console.localStorage(data)
    //     }
    // }
    // setRecentCities();
    
});