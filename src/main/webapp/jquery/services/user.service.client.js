function UserService() {
  this.login = login;

  function login() { }
}
function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'http://localhost:8080/api/user';
    var self = this;
    
    
    function createUser(user) {
    	var userStr = JSON.stringify(user);
    	  return fetch(self.url,  {
              method : 'post',
              headers : {
                  'Content-Type' : 'application/json'
              },
              body: userStr
          });
    }
    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            });
    }
    function deleteUser(userId)
    {
        return fetch(self.url + '/' + userId, {
            method: 'delete'
            })
            .then(function (response){
                return response;
            });
    }

    function findUserById(userId) {
        return fetch(self.url + '/' + userId)
        .then(function (response) {
            return response.json();
        });

    }

    function updateUser(userId, user) {
        var userStr = JSON.stringify(user);
        return fetch(self.url + '/' + userId, {
            method: 'put',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: userStr
        })
            .then(function (response){
                return response;
            });

    }
}

