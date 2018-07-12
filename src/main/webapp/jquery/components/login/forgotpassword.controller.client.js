(function () {

    var $email, $username;
    var userService = new UserServiceClient();
    window.alert = function(title, message) {
        var myElementToShow = $('#alert');
        myElementToShow.html(title + "</br>" + message)
            .css("border", "solid");
    }
    $(main);
    function main() {
        var $reset = $('.send');
        $reset.click(getUser);
    }

    function getUser()
    {
        $username = $('#username').val();
        userService.findUserByUsername($username)
            .then(sendEmail);
    }
    function sendEmail(user) {
        if(user.length == 0)
            window.alert("This site says","Please enter a valid username");
        else {
            var password = user[0].password;
            $email = $('#email').val();
            if (validateEmail($email)) {
                fetch('/api/forgotpassword',
                    {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({email: $email, password: password})
                    }).then(success, failure);
            }
            else
                window.alert("This site says","Please enter a valid email address");
        }
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }


    function success()
    {
        window.alert("This site says","Password sent to requested email address");
    }
    function failure()
    {
        window.alert("This site says","Unable to send email");
    }
})();