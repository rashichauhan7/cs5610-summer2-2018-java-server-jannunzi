(function()
{
var userService = new UserServiceClient();
    var $phone, $date, $email, $role;
    var $updateBtn, $logoutBtn;
    var $usernameFld;
    var $firstNameFld, $lastNameFld;
    $(main);
    function main()
    {
        $updateBtn = $('#updateBtn');
        $logoutBtn = $('#logoutBtn');
        $updateBtn.click(updateProfile);
        $logoutBtn.click(logout);
        userService.getProfile()
            .then(renderUser);
    }

    function renderUser(user)
    {
        if(user.id != 0){
            $('#usernameFld').val(user.username);
            $('#phoneFld').val(user.phone);
            $('#dateFld').val(user.date);
            $('#roleFld').val(user.role);
            $('#email').val(user.email);
        }
       else
           alert("user not currently logged in.")
    }
    function updateProfile()
    {
        $usernameFld = $('#usernameFld').val();
        $firstNameFld = $('#firstNameFld').val();
        $lastNameFld = $('#lastNameFld').val();
        $role = $('#roleFld').val();
        $phone = $('#phoneFld').val();
        $date = $('#dateFld').val();
        $email = $('#emailFld').val();
        var newuser =
            {
                username: $usernameFld,
                firstName: $firstNameFld,
                lastName: $lastNameFld,
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