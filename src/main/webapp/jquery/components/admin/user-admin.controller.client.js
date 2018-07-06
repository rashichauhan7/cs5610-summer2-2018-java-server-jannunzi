//IIFE
(function (){
	    var $usernameFld, $passwordFld;
	    var $removeBtn, $editBtn, $createBtn, $searchBtn, $updateBtn;
	    var $firstNameFld, $lastNameFld;
	    var $roleFld, $tbody;
	    //var userService = new AdminUserServiceClient();
	$(main);	
	function main()
	{
		
		
		$removeBtn = $('#remove');
		$editBtn = $('#edit');
		$createBtn = $('#create');
		$searchBtn = $('#search');
		$updateBtn = $('#update');
	
		$createBtn.click(createUser);
	}
	    function createUser() {
	    	$usernameFld = $('#usernameFld').val();
			$passwordFld = $('#passwordFld').val();
			$firstNameFld = $('#firstNameFld').val();
			$lastNameFld = $('#lastNameFld').val();
			$roleFld = $('#roleFld').val();
			
	    	var user;
	    }
	    function findAllUsers() {
	    	
	    }
	    function findUserById() { 
	    	
	    }
})();
