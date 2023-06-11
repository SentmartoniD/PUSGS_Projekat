class User {
    constructor(userId, username, email, firstName, lastName, dateOfBirth, address, userType, imageFile, password, approved, verified, articles, orders) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.userType = userType;
        this.imageFile = imageFile;
        this.password = password;
        this.approved = approved;
        this.verified = verified;
        this.articles = articles;
        this.orders = orders;
    }
}

export default User;