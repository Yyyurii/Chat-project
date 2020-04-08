import $ from 'jquery';

$(document).ready(function onDocumentReady() {

    var $users = $('.users');
    var $images = $('img');
    // $users.eq(0).addClass('active');

    
    localStorage.setItem ('Idelement', '#Chewbacca')        
    function localActive() {
        if (localStorage.getItem('Idelement') !== null) {
            var idChew = localStorage.getItem('Idelement');
            var $Chewy = $(idChew);
            $Chewy.addClass('active');
        } else {
            $users.eq(0).addClass('active');
        }
    }
    localActive();

    var imageSrcFunction;
    // Змінює фон при кліку та зберігає src фото
    $users.on('click', function () {
        $(this).addClass('active');
        $users.not(this).removeClass('active');

        $images.each(function (index, element) {
            var $element = $(element);
            var $parent = $element.closest('.users');
            if ($parent.hasClass('active')) {
                imageSrcFunction = $element.attr('src');
                console.log(imageSrcFunction);
            }
        });

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

    //////////////////////////////////////////////////////////
    var companionContainer = 'message-window__companion-container';
    var companionMessageContainer = 'message-window__companion-message-container';
    var companionMessageText = 'message-window__companion-message-text';
    var companionImage = 'message-window__companion-image';

    function getPattern(me, value) {
        var container, messageContainer, messageText, image, imageSrc;
        if (me) {
            container = 'message-window__I-am-container';
            messageContainer = 'message-window__my-message-container';
            messageText = 'message-window__my-message-text';
            image = 'message-window__my-image';
            imageSrc = 'images/myImage.png';
        } else {
            container = companionContainer;
            messageContainer = companionMessageContainer;
            messageText = companionMessageText;
            image = companionImage;
            imageSrc = imageSrcFunction;
        }
        return '<div class=' + container + '><div class=' + messageContainer + '><span class=' + messageText + '>' + value + '</span></div><img class=' + image + ' src=' + imageSrc + ' alt=""></div>';
    };
    ////////////////////////////////////////////////////

    // Відправляє смс 
    var $textArea = $('textarea');
    var $messageBorder = $('.message-window__border');
    $('button').on('click', function () {
        var textareaVal = $textArea.val();
        // var reverseMessage = textareaVal.split("").reverse().join("");
        var patern = getPattern('', textareaVal);
        var jqPatern = $(patern);

        if (textareaVal) {
            $messageBorder.prepend(jqPatern);
            $textArea.val('');
        }
    });



















});
