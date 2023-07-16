$(document).ready(function() {

    var btnsearch = $('#searchbtn');
    var recentsearch = $('.container-aside');
    var searcharea = $('.textarea');

    btnsearch.on('click', function(e){
        e.preventDefault();
        var newelement = $('div');
        if(!searcharea){
            alert('not data input');
            return;
        }
        newelement.addClass('bg-secondary rounded text-center text-white mb-2').text(searcharea);
        newelement.appendTo(recentsearch)
    })
    
});