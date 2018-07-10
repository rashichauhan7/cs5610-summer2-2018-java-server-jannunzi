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
                    renderUser();
                else {
                    window.alert("This site says", "User with this name already exits. Please try another.");
                    $('#alert').show();
                }
            });
    }
    function renderUser() {
        window.location.href = "/jquery/components/profile/profile.template.client.html";
    }
})();
