

function User(username, password, email, firstName, lastName, phone, role, date) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.role = role;
    this.email = email;
    this.date = date;

    this.setEmail = setEmail;
    this.getEmail = getEmail;
    this.setUsername = setUsername;
    this.getUsername = getUsername;
    this.setPassword = setPassword;
    this.getPassword = getPassword;
    this.setFirstName = setFirstName;
    this.getFirstName = getFirstName;
    this.setLastName = setLastName;
    this.getLastName = getLastName;
    this.setPhone = setPhone;
    this.getPhone = getPhone;
    this.setRole = setRole;
    this.getRole = getRole;
    this.setDateOfBirth = setDateOfBirth;
    this.getDateOfBirth = getDateOfBirth;


    function setUsername(username) {
        this.username = username;
    }

    function getUsername() {
        return this.username;
    }

    function setPassword(password) {
        this.password = password;
    }

    function getPassword() {
        return this.password;
    }

    function setFirstName(firstName) {
        this.firstName = firstName;
    }

    function getFirstName() {
        return this.firstName;
    }

    function setLastName(lastName) {
        this.lastName = lastName;
    }

    function getLastName() {
        return this.lastName;
    }

    function setPhone(phone) {
        this.phone = phone;
    }

    function getPhone() {
        return this.phone;
    }

    function setRole(role) {
        this.role = role;
    }

    function getRole() {
        return this.role;
    }

    function setDateOfBirth(date) {
        this.date = date;
    }

    function getDateOfBirth() {
        return this.date;
    }
    function setEmail(email) {
        this.email = email;
    }
    function getEmail() {
        return this.email;
    }
}
  
  

