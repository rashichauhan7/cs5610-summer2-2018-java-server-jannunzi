(function()
{
	var $usernameFld, $passwordFld, $verifyPasswordFld;
    var userService = new UserServiceClient();
    window.alert = function(title, message) {
        var myElementToShow = $('#alert');
        myElementToShow.html(title + "</br>" + message)
                    .css("border", "solid");
    }
    $(main);
    function main() {
        var $registerBtn = $('#registerBtn');
        $registerBtn.click(register);
    }
	function register()
	{
		$usernameFld  = $('#usernameFld').val();
		$passwordFld = $('#passwordFld').val();
		$verifyPasswordFld = $('#verifyPasswordFld').val();
		if($passwordFld != $verifyPasswordFld)
		    window.alert("This site says", "Passwords don't match");
		else {
            $('#alert').hide();
            var user = {
                username: $usernameFld,
                password: $passwordFld
            };
            userService.findUserByUsername($usernameFld)
                .then(function (result) {
                    if(!$.isArray(result) ||  !result.length )
                        userService.registerUser(user)
                            .then(renderUser);
                    else
                    {
                        window.alert("This site says", "User with this name already exits. Please try another.");
                        $('#alert').show();
                    }

                });
        }
        function renderUser() {
		    window.location.href = "/jquery/components/profile/profile.template.client.html";
        }
	}
	})();