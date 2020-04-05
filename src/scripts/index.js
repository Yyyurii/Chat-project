import $ from 'jquery';

$(document).ready(function onDocumentReady() {

    // Змінює фон при кліку
    var $users = $('.users');
    $users.on('click', function () {
        $(this).addClass('active');
        $users.not(this).removeClass('active');
    });

    // Нумерація юзерів
    var $usersNames = $('.users-name');
    $usersNames.each(function (i) {
        var number = i + 1 + '. ';
        $(this).prepend(number);
    });

    // Search
    var $input =  $('input');
    $input.on('input', function () {
        var $inptuVal = $input.val();
        console.log($input.val());
        $usersNames.each(function (index, element) {
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
    var $textArea = $('textarea');
    $textArea.change('input', function () {
        var $textareaVal = $textArea.val();
        console.log($textArea.val());
        $('button').on('click', function () {
            var pattern = $('<div class="massage-window__I-am-container"><div class="massage-window__my-massage-container "><span class="massage-window__my-massage-text">' + $textareaVal + '</span></div><img class="massage-window__my-image" src="images/myImage.png" alt=""></div>');
            $('.massage-window__border').append(pattern);
            $textArea.val('');            
        });

    });





















});
