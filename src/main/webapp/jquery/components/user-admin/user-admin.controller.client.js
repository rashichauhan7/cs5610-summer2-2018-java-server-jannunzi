//IIFE
(function (){
	jQuery(main);	
	function main()
	{
		var h1 = $('#title');
		h1.css('color', 'red')
		.html("User");
		
		var tr = $('.template');
		
		
		var users = [ {username: 'bob'},
			 {username: 'boby'}];
		
		var tbody = $('tbody');
		
		for(var i = 0; i < users.length; i++)
			{
			var user = users[i];
			var clone = tr.clone();
			clone.find('.username').html(user.username);
			tbody.append(clone);
			}
	}
})();
