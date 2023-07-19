$(document).ready(function() {
    //set variables
    var btnsearch = $('#searchbtn');
    var searcharea = $('.textarea');
    var dayscontainer = $('.dayscontainer');
    var daystoClone = $('.daytoforecast');
    var parentCities = $('#parentcities')
    var citynumber = 0;
    var flag = 0;
    //fetching the location with the lat and lon obtained from the first fetch.
    function setDataLocation(data){
        var lat = data[0].lat
        var lon = data[0].lon
        var Url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon='+ lon +'&appid=1cbb0bb3c0dae31a0af54f06954be8f4&units=metric';
        fetch(Url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //giving the humidity, wind and temperature to each card body (6 in total)
            $('.card-body').each(function(i){
                $(this).children().eq(1).text("Temperature: " + data.list[i].main.temp + "°c");
                $(this).children().eq(2).text("Wind speed: " + data.list[i].wind.speed + "km/h");
                $(this).children().eq(3).text("Humidity: " + data.list[i].main.humidity + "%");

                var icondata = $('.iconweather');
                var weather = data.list[i].weather[0].main;
                //selecting the icon depending on the weather condition
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
                        icondata[i].src = './Assets/img/no-results.png'
                }
            })
        })
    }
    //function to create an object of current searches
    function createbutton(adjustText){
        var newElement =  $('<button>');
        newElement.addClass('bg-secondary rounded text-center text-white mb-2 col-12 border-0 recentcitysearch').text(adjustText);
        sendCurrentCity(adjustText);
        parentCities.prepend(newElement)
    }
    //getting the textarea input and tranforming it.
    btnsearch.on('click', function(e){
        e.preventDefault();
        //when starting the code the main container will show
        $('.startsearch').removeClass('hide')
        //if theres no data it will return you
        if(searcharea.val() == ''){
            alert('no data input');
            return;
        }

        var trimtext = searcharea.val().trim()
        var adjustText = trimtext.charAt(0).toUpperCase() + trimtext.slice(1).toLowerCase();
        createbutton(adjustText);
        //storing 4 elements on the localStorage
        if(citynumber < 4){
            localStorage.setItem(citynumber,adjustText)
            citynumber++;
        }else{
            citynumber = 0; 
        }
        //removing button when passing the condition
        if(flag > 2){
            parentCities.children().last().remove();
        }
        flag++;
    })
    //the first fetching where it determines the lat and lon and it sends it to the fetch above
    function sendCurrentCity(currentcity){
        var Url = 'https://api.openweathermap.org/geo/1.0/direct?q='+ currentcity + ',&limit=5&appid=1cbb0bb3c0dae31a0af54f06954be8f4';
        fetch(Url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if (data.length !== 0){
                $('#currentcity').text(currentcity + ' now');
                setDataLocation(data);
            }else{
                $('#currentcity').text('City not found');
                $('.card-body').each(function(){
                    //when theres no data it will clear the elements
                    $(this).children().eq(1).text('')
                    $(this).children().eq(2).text('')
                    $(this).children().eq(3).text('')
                })
            }
        })
    }
    //cloning the first day x4 times
    function cloneDays(){
        for(var i=2; i<6;i++){
            var clonedDay = daystoClone.clone();
            clonedDay.children().children('h6').text('Day ' + i);
            clonedDay.attr('id' , 'day-' + i).appendTo(dayscontainer);
        }
    }

    cloneDays();
    //when you click on the button of the local storage it will send the value to the first fetch
    //e target of delegate
    function currentCityTo(e){
        $('.startsearch').removeClass('hide')
        var btnclick = $(e.target);
        var  value = btnclick.html();
        sendCurrentCity(value);
    }
    //delegating to children
    parentCities.on('click','.recentcitysearch', currentCityTo)

    //getting the local storage info and creating a button for each
    function setLocalStorageInfo(){
        for(var i = 0; i < localStorage.length;i++){
            var setItem = localStorage.getItem(i)
            createbutton(setItem)
        }
    }
    setLocalStorageInfo();

});