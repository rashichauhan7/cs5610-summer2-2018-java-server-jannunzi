(function () {
    var $usernameFld, $passwordFld;
    var $loginBtn;
    var userService = new UserServiceClient();
    window.alert = function(title, message) {
        var myElementToShow = $('#alert');
        myElementToShow.html(title + "</br>" + message)
            .css("border", "solid");
    }
    $(main);

    function main() {
        $loginBtn = $('#loginBtn');
        $loginBtn.click(login);
    }
    function login() {
        $usernameFld = $('#usernameFld').val();
        $passwordFld = $('#passwordFld').val();
        userService.login($usernameFld, $passwordFld)
            .then(function (response) {
                if (response.length != 0)
                    renderUser($usernameFld, $passwordFld);
                else {
                    userService.findUserByUsername($usernameFld)
                        .then(function (response) {
                            if(response.length == 0)
                            window.alert("This site says","Username does not exist");
                            else
                                window.alert("This site says","Password incorrect");
                            $('#alert').show();
                        });
                }
            });
    }
    function renderUser($usernameFld, $passwordFld) {
        if($usernameFld === "admin" && $passwordFld === "admin")
            window.location.href = "/jquery/components/admin/user-admin.template.client.html";
        else
            window.location.href = "/jquery/components/profile/profile.template.client.html";
    }
})();
