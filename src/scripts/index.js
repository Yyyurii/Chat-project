import $ from 'jquery';

$(document).ready(function onDocumentReady() {

    // Змінює фон при кліку
    $('.users').on('click', function () {
        $(this).css({ 'backgroundColor': '#8688F0', 'color': 'white' });
        $('.users').not(this).css({ 'backgroundColor': '', 'color': '' });
    });

    // Нумерація юзерів
    $('.users-name').each(function (i) {
        var number = i + 1 + '. ';
        $(this).prepend(number);
    });

    // Search
    $('input').on('input', function () {
        var $inptuVal = $('input').val();
        console.log($('input').val());
        $('.users-name').each(function (index, element) {
            var $element = $(element);
            var $elementName = $element.text(); // names of users
            var $parent = $element.closest('.users');
            if ($elementName.includes($inptuVal)) {
                $parent.show();
            } else {
                $parent.hide();
            }

        });
    });

    // Відправляє смс 

    // var myMassage = $('.massage-window__my-massage-text');
    // var myMassageText = myMassage.text();
    // console.log(myMassageText);
   
    // $('textarea').on('textarea', function () {
    //     var $inptuVal = $('textarea').val();
    //     console.log($('textarea').text());
    // });
    
    // myMassageText.each(function(){
    //     (this).html($textAreaVal);
    // });



















  




});
