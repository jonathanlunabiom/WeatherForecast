

$(document).ready(function() {

    fetch('api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=1cbb0bb3c0dae31a0af54f06954be8f4')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })


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
            citynumber = 0; 
        }

        if(flag > 4){
            recentsearch.children().last().remove();
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
    

    // parent.on (delegate target)
    // recentsearch.on('click', '.recentcitysearch', function(){

    // })
});