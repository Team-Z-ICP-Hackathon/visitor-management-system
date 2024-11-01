// Defines the Visitor entity and its related methods

public type Visitor = {
    id: Text;
    firstName: Text;
    lastName: Text;
    phoneNumber: Text;
    email: Text;
    faceData: Blob;
};

public func createVisitor(id: Text, firstName: Text, lastName: Text, phoneNumber: Text, email: Text, faceData: Blob): Visitor {
    return {
        id = id;
        firstName = firstName;
        lastName = lastName;
        phoneNumber = phoneNumber;
        email = email;
        faceData = faceData;
    };
}
