let rootPassword = "40119";
let codeTime = 20;

var bodyContainer;
$(document).ready(() => {
    bodyContainer = $('#bodyContainer');
    buildPasswordPage();
})

var buildPasswordPage = function () {
    bodyContainer.empty();
    var passwordContent = $('<div></div>');
    passwordContent.append('<h1>Enter password to unlock code</h1>');
    passwordContent.append('<input type="password" id="password"></input>');
    var submitButton = $('<button>Enter</button>').click(function () {
        var inputString = $.trim($("#password").val());
        if (inputString === rootPassword) {
            passwordContent.fadeOut(250, function () {
                buildCodePage();
            })
        } else {
            alert("that aint it");
        }
    });
    passwordContent.append(submitButton);
    bodyContainer.append(passwordContent);
};

var buildCodePage = function () {
    bodyContainer.empty();
    var codeContent = $('<div></div>');
    codeContent.append('<h1>Attendance Link</h1>');
    codeContent.append('<input type="text" id="recitationLink"></input>');
    codeContent.append('<h1>Attendance Code</h1>');
    codeContent.append('<h1 id="recitationCode"></h1>');
    codeContent.append('<h3 id="codeTimer"></h3>');

    setInterval(function () {
            var dateTime = Math.trunc(Date.now() / 1000);
            if (dateTime % codeTime === 0) {
                $('#recitationCode').fadeOut(200, function () {
                    $('#recitationCode').empty();
                    $('#recitationCode').append(timeHash(dateTime));
                    $('#recitationCode').fadeIn(200);
                });
            }
            $('#codeTimer').empty();
            $('#codeTimer').append(codeTime - (dateTime % codeTime) + " seconds left");
        },
        1000);
    codeContent.append('<h3>Make sure to enter the code before you submit your form!</h3>');

    bodyContainer.append(codeContent);
    codeContent.fadeOut(0);
    codeContent.fadeIn(250);
}

// variation of knuth simple number hash
var timeHash = function (timeStamp) {
    var hashedTime = timeStamp % 10000;
    hashedTime = (hashedTime * (hashedTime + 3)) % 99999;
    hashedTime = Math.abs(hashedTime);
    return hashedTime.toString().padStart(5, "0");
}
