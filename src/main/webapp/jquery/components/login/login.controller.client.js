(function () {
    var $usernameFld, $passwordFld;
    var $loginBtn;
    var userService = new UserServiceClient();
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
                            window.alert("Username does not exist");
                            else
                                window.alert("Password incorrect");
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
