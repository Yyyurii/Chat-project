import $ from 'jquery';

$(document).ready(function onDocumentReady() {
    
    var dataRow = [];
    var obj = {};

    var $textArea = $('textarea');
    var $messageBorder = $('.message-window__border');

    var $users = $('.users');

    var smsArray = []; // масив для збереження смс та передачу їх в localStorage

    function getSms() {
        var data = JSON.parse(localStorage.getItem('items'));
        var dataObj = JSON.parse(localStorage.getItem('objImage'));
        if ((data)) {
            for (var index = 0; index < data.length; index++)

                var saveMessages = getPattern('', data[index], dataObj.element);
            // var $pattern = $(saveMessages);
            $messageBorder.prepend(saveMessages);
            console.log('obj.element', obj.element)
        }
    }

    // Змінює фон при кліку та зберігає src фото
    var imageSrcOn;
    var idFound;
    $users.on('click', function () {
        $(this).addClass('active');
        $users.not(this).removeClass('active');

        var $imgFound = $(this).find('.users-image');
        imageSrcOn = $imgFound.attr('src');
        var idFound = $('.active').attr('id');
        
        dataRow.push(idFound); 
          
        $(dataRow).each(function (element, index) {
            element = dataRow;
            index = imageSrcOn;
            // console.log('index', index)
            obj[element] = index;
            console.log('obj in each', obj)
            localStorage.setItem('objImage', JSON.stringify(obj));
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

    // Створення шаблону контейнера для відправлення смс від мене та компаньйона
    var companionContainer = 'message-window__companion-container';
    var companionMessageContainer = 'message-window__companion-message-container';
    var companionMessageText = 'message-window__companion-message-text';
    var companionImage = 'message-window__companion-image';

    function getPattern(me, value, imageSrc) {
        var container, messageContainer, messageText, image; //imageSrc;
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


        return '<div class=' + container + '><div class=' + messageContainer + '><span class=' + messageText + '>' + value + '</span></div><img class=' + image + ' src=' + imageSrc + ' alt=""></div>';
    }

    // Відправляє смс 
    getSms();
    $('button').on('click', function () {
        var textareaVal = $textArea.val();
        var patern = getPattern('', textareaVal, imageSrcOn);
        var jqPatern = $(patern);

        if (textareaVal) {
            $messageBorder.prepend(jqPatern);
            $textArea.val('');
        }
        smsArray.push(textareaVal);
        localStorage.setItem('items', JSON.stringify(smsArray));
    });





















});
