(function()
{
var userService = new UserServiceClient();
    var $phone, $date, $email, $role;
    var $updateBtn, $logoutBtn;
    var $usernameFld, $firstNameFld, $lastNameFld;
    window.alert = function(title, message) {
        var myElementToShow = $('#alert');
        myElementToShow.html(title + "</br>" + message)
            .css("border", "solid");
    }
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
            $('#firstNameFld').val(user.firstName);
            $('#lastNameFld').val(user.lastName);
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
            if(d != null)
            d = d.substr(0, 10);
            return d;
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
                window.alert("This site says", "User updated");
            });
    }
    function logout()
    {
        userService.logout()
        window.location.href = "/jquery/components/login/login.template.client.html";
    }
})();