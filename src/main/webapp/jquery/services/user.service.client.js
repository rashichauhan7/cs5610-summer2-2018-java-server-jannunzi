function UserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.findUserByUsername = findUserByUsername;
    this.getProfile = getProfile;
    this.registerUser = registerUser;
    this.logout = logout;
    this.login = login;
    this.findUserByRole = findUserByRole;
    this.url = 'http://localhost:8080/api/user';
    this.register = 'http://localhost:8080/api/register';
    this.profile = 'http://localhost:8080/api/profile';
    this.loginurl = 'http://localhost:8080/api/login';
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
    function findUserByUsername(username)
    {
        return fetch(self.url + '?username=' + username)
            .then(function (response) {
                if(response!= null)
                return response.json();
                else
                    return null;
            });
    }

    function registerUser(user)
    {
        var userStr = JSON.stringify(user);
        return fetch(self.register,
            {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: userStr,
            credentials: 'include',

            });
    }

    function getProfile()
    {
        return fetch(self.profile,
            {
                credentials: 'include',
            })
            .then(function (response) {
                    return response.json();
                });
    }

    function login(username, password) {

        return fetch(self.loginurl,
            {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body:
                    JSON.stringify({
                        username: username,
                        password: password
                    }),
                credentials: 'include',

            }).then(function(response)
        {
            return response.json();
        });
    }

    function logout()
    {
        fetch('http://localhost:8080/api/logout', {
            method: 'post'
        });
    }

    function findUserByRole(role) {
        return fetch(self.url + '?role=' + role)
            .then(function (response) {
                if(response!= null)
                    return response.json();
                else
                    return null;
            });
    }
}

