import $ from 'jquery';

$(document).ready(function onDocumentReady() {

    var $users = $('.users');
    $users.eq(0).addClass('active'); 

    // Змінює фон при кліку 
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
    var $input = $('input');
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
    var $massageBorder = $('.massage-window__border');
    $('button').on('click', function () {
        var textareaVal = $textArea.val();
        var reverseMassage = textareaVal.split("").reverse().join("");

        if (textareaVal) {

            var myPattern = $('<div class="massage-window__I-am-container"><div class="massage-window__my-massage-container "><span class="massage-window__my-massage-text">' + textareaVal + '</span></div><img class="massage-window__my-image" src="images/myImage.png" alt=""></div>');
            var companionPatern = $('<div class="massage-window__companion-container"><img class="massage-window__companion-image" src="images/darthVader.png" alt=""><div class="massage-window__companion-massage-container"><span class="massage-window__companion-massage-text">'+ reverseMassage +'</span></div></div>');
            $massageBorder.prepend(myPattern);
            $massageBorder.prepend(companionPatern);
            $textArea.val('');
        }
    });





















});
