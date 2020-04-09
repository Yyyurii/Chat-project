import $ from 'jquery';

$(document).ready(function onDocumentReady() {

    var object = {
        'Chewbacka': 'img.png',
        'Darth_Vader': 'img2'
    };
    console.log(object.Chewbacka);
    var asd = 'Darth_Vader';

    var $textArea = $('textarea');
    var $messageBorder = $('.message-window__border');

    var $users = $('.users');

    var smsArray = []; // масив для збереження смс та передачу їх в localStorage
    var imageArray = [];
    function getSms() {
        var data = JSON.parse(localStorage.getItem('items'));
        var dataImg = JSON.parse(localStorage.getItem('imgSrc'));
        console.log('data', data)
        console.log('dataImg', dataImg)
        if ((data) && (dataImg)) {
            for (var index = 0; index < data.length; index++)

                var saveMessages = getPattern('', data[index], object[asd]);
                // var $pattern = $(saveMessages);
                $messageBorder.prepend(saveMessages);
                
                
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
        imageArray.push(imageSrcOn);
        localStorage.setItem('imgSrc', JSON.stringify(imageArray));
        console.log('imageArray', imageArray)
        
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
        var container, messageContainer, messageText, image;  //imageSrc;
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
        console.log('smsArray in the end', smsArray)
    });





















});
