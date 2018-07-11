//IIFE
(function (){
	    var $usernameFld, $passwordFld;
	    var $removeBtn, $editBtn, $createBtn, $searchBtn, $updateBtn;
	    var $firstNameFld, $lastNameFld;
	    var $roleFld, $template, $email, $contact, $date ;
	    var userService = new UserServiceClient();
    window.alert = function(title, message) {
        var myElementToShow = $('#alert');
        myElementToShow.html(title + "</br>" + message)
            .css("border", "solid");
    }
	$(main);	
	function main()
	{
        $template = $('.template');
		$createBtn = $('#create');
		$searchBtn = $('#search');
		$updateBtn = $('#update');
		findAllUsers();
		$createBtn.click(createUser);
        $updateBtn.click(updateUser);
        $searchBtn.click(searchUser);
        $updateBtn.css("display","none");
	}
	    function createUser() {
            $('#alert').hide();
	    	$usernameFld = $('#usernameFld').val();
	    	if($usernameFld === ""){
                window.alert("The username field is empty");
                $('#alert').show();
            }
	    	else {
                $passwordFld = $('#passwordFld').val();
                $firstNameFld = $('#firstNameFld').val();
                $lastNameFld = $('#lastNameFld').val();
                $roleFld = $('#roleFld').val();
                $email = $('#emailFld').val();
                $contact = $('#contactFld').val();
                $date = $('#dateFld').val();
                var user = new User($usernameFld, $passwordFld, $email, $firstNameFld, $lastNameFld, $contact, $roleFld, $date);
                userService.findUserByUsername($usernameFld)
                    .then(function (result) {
                        if (result.length == 0)
                            userService
                                .createUser(user)
                                .then(findAllUsers);
                        else {
                            window.alert("This site says", "User with this username already exits");
                            $('#alert').show();
                        }
                    });

            }
	    }
	    function findAllUsers() {
	    	userService
	    	.findAllUsers()
	    	.then(renderUsers);
	    	}
	    function renderUsers(users)
        {
                $('.table tr.template').remove();
	    		for(var i=0; i<users.length; i++)
				{
					var user = users[i];
					var clone = $template.clone();
					clone.attr('id', user.id);
                    clone.find('#remove').click(deleteUser);
                    clone.find('#edit').click(editUser);
					clone.find('.username')
						.html(user.username);
					clone.find('.lastName')
                        .html(user.lastName);
					clone.find('.firstName')
                        .html(user.firstName);
					clone.find('.role')
                        .html(user.role);
                    clone.find('.email')
                        .html(user.email);
                    clone.find('.contact')
                        .html(user.phone);
                    clone.find('.date')
                        .html(user.date);
					$('#users-list').append(clone);
				}
				clearAllEntryFields();
        }

        function deleteUser(event)
        {
            $removeBtn = $(event.currentTarget);
            var parent = $removeBtn.parent()
                .parent()
                .parent();
            console.log(parent);
            var userId = parent
                        .attr('id');
            userService.deleteUser(userId)
                .then(findAllUsers);

        }

        function editUser()
        {
            $createBtn.css("display","none");
            $updateBtn.css("display","");
        	$editBtn = $(event.currentTarget);
            var parent = $editBtn.parent()
                .parent()
                .parent();
            console.log(parent);
            var userId = parent
                        .attr('id');
            userService.findUserById(userId)
                .then(renderUser);
        	
        }
	    function findUserById() { 
	    	return userService.findUserById(userId);
	    }

	    function clearAllEntryFields() {
            $('#usernameFld').val("");
            $('#passwordFld').val("");
           	$('#firstNameFld').val("");
            $('#lastNameFld').val("");
            $('#emailFld').val("");
            $('#roleFld').val("");
            $('#phoneFld').val("");
            $('#dateFld').val("");
        }

        function renderUser(user)
        {
            $('#usernameFld').val(user.username);
            $('#roleFld').val(user.role);
            $('#firstNameFld').val(user.firstName);
            $('#lastNameFld').val(user.lastName);
            $('#emailFld').val(user.email);
            $('#phoneFld').val(user.phone);
            $('#dateFld').val(format(user.date));
            $('.input-form').attr("id", user.id);
        }
    function format(inputDate) {
        var d = inputDate;
        if(d != null)
            d = d.substr(0, 10);
        return d;
    }
        function updateUser() {
            $createBtn.css("display","");
            $updateBtn.css("display","none");
            var parent = $updateBtn.parent()
                .parent()
                .parent();
            console.log(parent);
            var userId = parent
                .attr('id');
            var user =
                {
                    firstName: $('#firstNameFld').val(),
                    lastName: $('#lastNameFld').val(),
                    password: $('#passwordFld').val(),
                    role: $('#roleFld').val(),
                    email: $('#emailFld').val(),
                    phone:  $('#phoneFld').val(),
                    date:  $('#dateFld').val()
                };
            userService.updateUser(userId, user)
                .then(findAllUsers);
        }

        function searchUser()
		{
			$roleFld = $('#roleFld').val();
			userService.findUserByRole($roleFld)
				.then(renderUsers);
		}

})();
