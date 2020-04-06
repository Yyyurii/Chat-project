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
     // i am
    //  var myContainer = 'message-window__I-am-container';
    //  var myMessageContainer = 'message-window__my-message-container';
    //  var myMessageText = 'message-window__my-message-text';
    //  var myImage = 'message-window__my-image';
    //  var myImageSrc = 'images/myImage.png';
     // companion 
     var companionContainer = 'message-window__companion-container';
     var companionMessageContainer = 'message-window__companion-message-container';
     var companionMessageText = 'message-window__companion-message-text';
     var companionImage = 'message-window__companion-image';
     var companionImageSrc = 'images/darthVader.png';
 
     function getPattern (me, value) {
         var container;
         if(me === 'mine') {
            container = 'message-window__I-am-container';
             var messageContainer = 'message-window__my-message-container';
             var messageText = 'message-window__my-message-text';
             var image = 'message-window__my-image';
             var imageSrc = 'images/myImage.png';
         } else if (me === 'companion'){
             container = companionContainer;
             var messageContainer = companionMessageContainer;
             var messageText = companionMessageText;
             var image = companionImage;
             var imageSrc = companionImageSrc;
         } else {
            container = companionContainer;
            var messageContainer = companionMessageContainer;
            var messageText = companionMessageText;
            var image = companionImage;
            var imageSrc = 'images/harryPotter.png';
         }
 
         return '<div class='+ container +'><div class='+ messageContainer +'><span class='+ messageText +'>' + value + '</span></div><img class='+ image +' src='+ imageSrc +' alt=""></div>';
     };
    ////////////////////////////////////////////////////

    // Відправляє смс 
    var $textArea = $('textarea');
    var $messageBorder = $('.message-window__border');
    $('button').on('click', function () {
        var textareaVal = $textArea.val();
        // var reverseMessage = textareaVal.split("").reverse().join("");
        var patern = getPattern('companion', textareaVal);
        var jqPatern = $(patern);

        if (textareaVal) {
            $messageBorder.prepend(jqPatern);
            $textArea.val('');
        }

        localStorage.setItem('jqPatern', JSON.stringify(jqPatern));
        var b = localStorage.getItem('jqPatern');
        b = JSON.parse(b);
        console.log(b);
        
    });


   
















});
