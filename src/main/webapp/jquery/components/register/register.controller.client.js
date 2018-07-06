(function()
{
	var $usernameFld, $passwordFld, $verifyPasswordFld;
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
		else
        {
            $('#alert').hide();
            var user = {
                username: $usernameFld,
                password: $passwordFld
            }
            var userStr = JSON.stringify(user);
            var url = '/api/register';
            fetch(url,  {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: userStr
            });

        }
	}
	})();