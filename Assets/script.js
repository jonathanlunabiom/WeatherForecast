

$(document).ready(function() {

    var btnsearch = $('#searchbtn');
    var recentsearch = $('.container-aside');
    var searcharea = $('.textarea');
    var dayscontainer = $('.dayscontainer');
    var daystoClone = $('.daytoforecast');
    var parentCities = $('#parentcities')
    var citynumber = 0;
    var flag = 0;

    function setDataLocation(data){
        var lat = data[0].lat
        var lon = data[0].lon
        var Url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon='+ lon +'&appid=1cbb0bb3c0dae31a0af54f06954be8f4&units=metric';
        fetch(Url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            $('.card-body').each(function(i){
                $(this).children().eq(1).text("Temperature: " + data.list[i].main.temp + "°c");
                $(this).children().eq(2).text("Wind speed: " + data.list[i].wind.speed + "km/h");
                $(this).children().eq(3).text("Humidity: " + data.list[i].main.humidity + "%");

                var icondata = $('.iconweather');
                var weather = data.list[i].weather[0].main;

                switch (weather){
                    case 'Clouds':
                        icondata[i].src = './Assets/img/clouds.png'
                    break;
                    case 'Clear':
                        icondata[i].src = './Assets/img/clear.png'
                    break;
                    case 'Mist':
                        icondata[i].src = './Assets/img/wind.png'
                    break;
                    case 'Rain':
                        icondata[i].src = './Assets/img/rain.png'
                    break;
                    case 'Drizzle':
                        icondata[i].src = './Assets/img/drizzle.png'
                    break;
                    default:
                        icondata[i].src = './Assets/img/clear.png'
                }
            })


        })
    }
    
    function createbutton(adjustText){
        var newElement =  $('<button>');
        newElement.addClass('bg-secondary rounded text-center text-white mb-2 col-12 border-0 recentcitysearch').text(adjustText);
        sendCurrentCity(adjustText);
        recentsearch.prepend(newElement)
    }
    
    btnsearch.on('click', function(e){
        e.preventDefault();

        $('.startsearch').removeClass('hide')

        if(searcharea.val() == ''){
            alert('no data input');
            return;
        }

        var trimtext = searcharea.val().trim()
        var adjustText = trimtext.charAt(0).toUpperCase() + trimtext.slice(1).toLowerCase();
        createbutton(adjustText);

        if(citynumber < 4){
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

    function sendCurrentCity(currentcity){
        var Url = 'https://api.openweathermap.org/geo/1.0/direct?q='+ currentcity + ',&limit=5&appid=1cbb0bb3c0dae31a0af54f06954be8f4';
        $('#currentcity').text(currentcity + ' now');
        fetch(Url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if (data.length !== 0){
                setDataLocation(data);
            }else{
                alert("Error: no city found")
            }
        })
    }

    function cloneDays(){
        for(var i=2; i<6;i++){
            var clonedDay = daystoClone.clone();
            clonedDay.children().children('h6').text('Day ' + i);
            clonedDay.attr('id' , 'day-' + i).appendTo(dayscontainer);
        }
    }

    cloneDays();

    function currentCityTo(e){
        var btnclick = $(e.target);
        var  value = btnclick.html();
        sendCurrentCity(value);
    }
    
    parentCities.on('click','.recentcitysearch', currentCityTo)


    function setLocalStorageInfo(){
        for(var i = 0; i < localStorage.length;i++){
            var setItem = localStorage.getItem(i)
            createbutton(setItem)
        }
    }
    setLocalStorageInfo();

});