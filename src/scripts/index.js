import $ from 'jquery';

$(document).ready (function onDocumentReady() {

// Змінює фон при кліку
$('.users').on('click', function(){
    $(this).css({'backgroundColor': '#8688F0', 'color': 'white'});
    $('.users').not(this).css({'backgroundColor': '', 'color': ''});
  });


$('input').on('input', function(){
    switch ($(this).val()) {
        case 'Chandler Bing':
            $('#Chandler Bing').show();
            $('.qw').hide();
        // default:
        //     $('.users').show();
    }
})
















}) ;
