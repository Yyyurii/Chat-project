import $ from 'jquery';

$(document).ready(function onDocumentReady() {
    var $textArea = $('textarea');
    var $messageBorder = $('.message-window__border');

    var $users = $('.users');

    var smsArray = []; // масив для збереження смс та передачу їх в localStorage
    // var data = JSON.parse(localStorage.getItem('items'));
    function getSms() {
        var logItem = localStorage.getItem('items');

        if (logItem) {
            var patern;
            patern = JSON.parse(logItem);
            console.log(logItem)
            console.log(patern);
        } if (patern) {
            // $messageBorder.prepend(patern);
            var first = getPattern('', patern[0]);
            var jqFirst = $(first);

            var second = getPattern('', patern[1]);
            var jqSecond = $(second);

            // for (var i = 0; i < first.length; i++) {
            //     first[i].after(second[i]);
            // }

            if (patern[0]) {
                $messageBorder.prepend(jqFirst);
                console.log(0)
            } 
            if (patern[1]) {
                $messageBorder.prepend(jqSecond);
                console.log(1)
            }

        }
    }


    // var idUsers = $('this').attr('id');
    // localStorage.setItem('idDarth', idUsers);


    // // localStorage.setItem ('Idelement', '#Chewbacca')        
    // function localActive() {
    //     if (localStorage.getItem('idDarth') !== null) {
    //         var idSomebody = localStorage.getItem('idDarth');
    //         var $Somebody = $('#' + idSomebody);
    //         console.log(idSomebody);
    //         $Somebody.addClass('active');
    //     } else {
    //         $users.eq(0).addClass('active');
    //     }
    // }
    // localActive();

    // Змінює фон при кліку та зберігає src фото
    var imageSrcOn;
    $users.on('click', function () {
        $(this).addClass('active');
        $users.not(this).removeClass('active');

        var $imgFound = $(this).find('.users-image');
        imageSrcOn = $imgFound.attr('src');
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

    // Створення шаблону контейнера для відправлення смс від мене та компаньйона
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
            imageSrc = imageSrcOn;
        }
        smsArray.push(imageSrc);

        return '<div class=' + container + '><div class=' + messageContainer + '><span class=' + messageText + '>' + value + '</span></div><img class=' + image + ' src=' + imageSrc + ' alt=""></div>';
    }
    getSms();
    // Відправляє смс 

    $('button').on('click', function () {
        var textareaVal = $textArea.val();
        var patern = getPattern('', textareaVal);
        var jqPatern = $(patern);

        if (textareaVal) {
            $messageBorder.prepend(jqPatern);
            $textArea.val('');
        }
        smsArray.push(textareaVal);
        localStorage.setItem('items', JSON.stringify(smsArray));
        console.log(smsArray);
    });





















});
