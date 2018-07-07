//IIFE
(function (){
	    var $usernameFld, $passwordFld;
	    var $removeBtn, $editBtn, $createBtn, $searchBtn, $updateBtn;
	    var $firstNameFld, $lastNameFld;
	    var $roleFld, $template ;
	    var userService = new UserServiceClient();
	$(main);	
	function main()
	{
        $template = $('.template');
		$createBtn = $('#create');
		$searchBtn = $('#search');
		$updateBtn = $('#update');
		findAllUsers();
		$createBtn.click(createUser);

	}
	    function createUser() {
	    	$usernameFld = $('#usernameFld').val();
			$passwordFld = $('#passwordFld').val();
			$firstNameFld = $('#firstNameFld').val();
			$lastNameFld = $('#lastNameFld').val();
			$roleFld = $('#roleFld').val();
			
	    	var user = {
	    			username: $usernameFld,
					password: $passwordFld,
					firstName: $firstNameFld,
					lastName: $lastNameFld,
					role: $roleFld
	    	};

                userService
                .createUser(user)
                    .then(findAllUsers());
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
					$('#users-list').append(clone);
				}
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

        }
	    function findUserById() { 
	    	
	    }
})();
