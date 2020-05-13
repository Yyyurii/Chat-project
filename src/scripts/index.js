import $ from 'jquery';

$(document).ready(function onDocumentReady() {
    let companionContainer = 'message-window__companion-container';
    let companionMessageContainer = 'message-window__companion-message-container';
    let companionMessageText = 'message-window__companion-message-text';
    let companionImage = 'message-window__companion-image';
    let imageSrcOn;
    let patern;

    let dataRow = [];

    let $textArea = $('textarea');
    let $messageBorder = $('.message-window__border');
    let $users = $('.users');

    function getSms() {
        let data = JSON.parse(localStorage.getItem('localSms'));
        console.log('data', data)
        let jqData = $(data);

        for (let index = 0; index < data.length; index++) {
            $messageBorder.prepend(jqData[index]);
        };
    };

    // Змінює фон при кліку та зберігає src фото

    $users.on('click', function () {
        $(this).addClass('active');
        $users.not(this).removeClass('active');

        let $imgFound = $(this).find('.users-image');
        imageSrcOn = $imgFound.attr('src');

    });

    // Нумерація юзерів
    let $usersNames = $('.users-name');
    // $usersNames.each(function (i) {
    //     var number = i + 1 + '. ';
    //     $(this).prepend(number);
    // });

    // Search 
    let $input = $('input');
    $input.on('input', () => {
        let $inptuVal = $input.val();

        $usersNames.each(function (index, element) {
            let $element = $(element);
            let $elementName = $element.text(); // names of users
            let $parent = $element.closest('.users');
            if ($elementName.includes($inptuVal)) {
                $parent.show();
            } else {
                $parent.hide();
            }

        });
    });

    // Створення шаблону контейнера для відправлення смс від мене та компаньйона

    function getPattern(me, value) {
        let container, messageContainer, messageText, image, imageSrc;
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

        return `<div class="${container}"><div class="${messageContainer}"><span class="${messageText}">"${value}"</span></div><img class="${image}"src="${imageSrc}"alt=""></div>`;
    }

    // Відправляє смс 
    $('button').on('click', () => {
        let textareaVal = $textArea.val();
        patern = getPattern('', textareaVal);
        let jqPatern = $(patern);
        dataRow.push(patern);
        localStorage.setItem('localSms', JSON.stringify(dataRow));
        
        if (textareaVal) {
            $messageBorder.prepend(jqPatern);
            $textArea.val('');
        }
    });

    getSms();



















});
