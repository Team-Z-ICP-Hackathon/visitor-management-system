
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Time "mo:base/Time"; // Import the Time module

actor VisitorManagementSystem {
  stable var users: [UserProfile] = [];
  stable var checkInOutLogs: [CheckInOutLog] = [];
  stable var admins: [Principal] = [Principal.fromText("admin-principal-id")]; // List of admin Principals

  public shared ({caller = _}) func registerVisitor(name: Text, email: Text, imageData: Blob) : async Text {
    let newVisitor: UserProfile = {
      id = caller;
      name = name;
      email = email;
      imageData = imageData;
      checkoutHistory = [];
    };
    users := Array.append<UserProfile>(users, [newVisitor]);
    return "Visitor registered successfully";
  };

  public shared ({caller = _}) func checkIn(image: Blob) : async Text {
    let userId = recognizeUser(image);
    switch (userId) {
      case (?id) {
        recordCheckIn(id);
        return "Check-in successful";
      };
      case _ {
        return "User not recognized";
      };
    };
  };

  public shared ({caller = _}) func checkOut(image: Blob) : async Text {
    let userId = recognizeUser(image);
    switch (userId) {
      case (?id) {
        recordCheckOut(id);
        return "Check-out successful";
      };
      case _ {
        return "User not recognized";
      };
    };
  };

  public shared ({caller}) func getCheckInOutLogs() : async [CheckInOutLog] {
    if (isAdmin(caller)) {
      return checkInOutLogs;
    } else {
      return [];
    }
  };

  public shared ({caller}) func getRegisteredVisitors() : async [UserProfile] {
    if (isAdmin(caller)) {
      return users;
    } else {
      return [];
    }
  };

  func recognizeUser(_image: Blob) : ?Principal {
    // Dummy implementation for recognizing users
    ?Principal.fromText("some-user-principal-id")
  };

  func recordCheckIn(userId: Principal) {
    let now = Time.now();
    let log = {
      userId = userId;
      checkInTime = ?now;
      checkOutTime = null;
    };
    checkInOutLogs := Array.append<CheckInOutLog>(checkInOutLogs, [log]);
  };

  func recordCheckOut(userId: Principal) {
    let now = Time.now();
    for (log in checkInOutLogs.vals()) {
      if (log.userId == userId and log.checkOutTime == null) {
        log.checkOutTime := ?now;
      }
    };
  };

  func isAdmin(userId: Principal) : Bool {
    admins.contains(userId)
  };

  type UserProfile = {
    id: Principal;
    name: Text;
    email: Text;
    imageData: Blob;
    checkoutHistory: [CheckoutRecord];
  };

  type CheckoutRecord = {
    date: Time.Time;
    details: Text;
  };

  type CheckInOutLog = {
    userId: Principal;
    checkInTime: ?Time.Time;
    checkOutTime: ?Time.Time;
  };
}
