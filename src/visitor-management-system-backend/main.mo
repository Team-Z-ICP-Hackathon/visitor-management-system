
import Debug "mo:base/Debug";

<<<<<<< HEAD
actor Checkout {
  public query func checkout(image: Text, userId: Principal) : async Text {
    // Process the checkout, store user info, etc.
    Debug.print("User ID: " # userId.toText());
    Debug.print("Image: " # image);
    return "Checkout successful"; // Or any relevant success message
  }
}
=======
// VisitorManagement.mo
import Visitor "Visitor";
import CheckInLog "CheckInLog";
import NotificationLog "NotificationLog";
import Storage "Storage";

// Functions to register visitor, check-in, and send notifications

public func registerVisitor(id: Text, firstName: Text, lastName: Text, phoneNumber: Text, email: Text, faceData: Blob): async Bool {
    let visitor = Visitor.createVisitor(id, firstName, lastName, phoneNumber, email, faceData);
    Storage.visitors.put(id, visitor);
    return true;
}

public func checkInVisitor(visitorId: Text): async Bool {
    let log = CheckInLog.createCheckInLog(visitorId, "Checked In");
    Storage.checkInLogs.put(log.id, log);
    // Additional logic for notifying host
    return true;
}

public func logNotification(visitorId: Text, message: Text): async Bool {
    let notification = NotificationLog.createNotificationLog(visitorId, message);
    Array.append(Storage.notificationLogs, notification);
    return true;
}

>>>>>>> 6bd86a0d5276ed8c9b2ca3244e5f247549cf13fb
