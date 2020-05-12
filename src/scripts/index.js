import $ from 'jquery';

$(document).ready(function onDocumentReady() {
    let companionContainer = 'message-window__companion-container';
    let companionMessageContainer = 'message-window__companion-message-container';
    let companionMessageText = 'message-window__companion-message-text';
    let companionImage = 'message-window__companion-image';
    let imageSrcOn;
    let idFound;

    let dataRow = [];
    console.log('dataRow', dataRow);
    let obj = {};
    console.log('obj', obj)

    let $textArea = $('textarea');
    let $messageBorder = $('.message-window__border');
    let $users = $('.users');

    let smsArray = []; // масив для збереження смс та передачу їх в localStorage

    function getSms() {
        let data = JSON.parse(localStorage.getItem('smsText'));
        console.log('data', data);
        let dataObj = JSON.parse(localStorage.getItem('objImage'));
        console.log('dataObj', dataObj);

        if (data) {
            for (let index = 0; index < data.length ; index++) {
                let template = getPattern('', data[index], 'images/darthVader.png');
                let $template = $(template);
                $messageBorder.prepend($template);
            }
        }
    }

    // Змінює фон при кліку та зберігає src фото
 
    $users.on('click', function () {
        $(this).addClass('active');
        $users.not(this).removeClass('active');

        let $imgFound = $(this).find('.users-image');
        imageSrcOn = $imgFound.attr('src');
        idFound = $('.active').attr('id');

        dataRow.push(idFound);

        $(dataRow).each( (element, index) => {
            element = idFound;
            index = imageSrcOn;
            obj[element] = index;
            console.log('obj in each', obj);
            localStorage.setItem('objImage', JSON.stringify(obj));
        });
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

    function getPattern(me, value, imageSrc) {
        let container, messageContainer, messageText, image; //imageSrc;
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
        }
        return `<div class="${container}"><div class="${messageContainer}"><span class="${messageText}">"${value}"</span></div><img class="${image}"src="${imageSrc}"alt=""></div>`;
    }

    // Відправляє смс 
    $('button').on('click', () => {
        let textareaVal = $textArea.val();
        let patern = getPattern('', textareaVal, imageSrcOn);
        let jqPatern = $(patern);

        if (textareaVal) {
            $messageBorder.prepend(jqPatern);
            $textArea.val('');
        }
        smsArray.push(textareaVal);
        localStorage.setItem('smsText', JSON.stringify(smsArray));
    });

    getSms();



















});
