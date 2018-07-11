(function () {

    var $email, $username;
    var userService = new UserServiceClient();
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
        var password = user[0].password;
        $email =  $('#email').val();

        fetch('http://localhost:8080/api/forgotpassword',
            {
                method : 'post',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({ email : $email, password : password})
            }).then(success, failure);
    }
    function success()
    {
        window.alert("Password sent to requested email address");
    }
    function failure()
    {
        window.alert("Unable to send email");
    }
})();