// Define the NotificationLog entity and its methods

// NotificationLog.mo
import Time "mo:base/Time";

public type NotificationLog = {
    logId: Text;
    visitorId: Text;
    message: Text;
    timestamp: Int;
};

public func createNotificationLog(visitorId: Text, message: Text): NotificationLog {
    return {
        logId = generateUniqueId();
        visitorId = visitorId;
        message = message;
        timestamp = Time.now();
    };
}

private func generateUniqueId(): Text {
    return Int.toText(Time.now());
}

>