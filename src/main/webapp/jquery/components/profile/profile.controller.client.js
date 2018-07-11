(function()
{
var userService = new UserServiceClient();
    var $phone, $date, $email, $role;
    var $updateBtn, $logoutBtn;
    var $usernameFld;
    $(main);
    function main()
    {
        $updateBtn = $('#updateBtn');
        $logoutBtn = $('#logoutBtn');
        $updateBtn.click(updateProfile);
        $logoutBtn.click(logout);
        userService.getProfile()
            .then(function (user) {
                userService.findUserById(user.id)
                    .then(renderUser);
            });

    }

    function renderUser(user)
    {
        if(user.id != 0){
            $('#usernameFld').val(user.username);
            $('#phoneFld').val(user.phone);
            $('#dateFld').val(format(user.date));
            $('#roleFld').val(user.role);
            $('#emailFld').val(user.email);
        }
       else
           alert("user not currently logged in.")
    }
    function format(inputDate) {
            var d = inputDate;
            d = d.substr(0, 10);
            return d;
    }
    function updateProfile()
    {
        $usernameFld = $('#usernameFld').val();
        $role = $('#roleFld').val();
        $phone = $('#phoneFld').val();
        $date = $('#dateFld').val();
        $email = $('#emailFld').val();
        var newuser =
            {
                username: $usernameFld,
                role: $role,
                phone: $phone,
                email: $email,
                date: $date
            };
        userService.findUserByUsername($usernameFld)
            .then(function (user)
            {
                userService.updateUser(user[0].id, newuser);
            });
    }
    function logout()
    {
        userService.logout()
        window.location.href = "/jquery/components/login/login.template.client.html";
    }
})();