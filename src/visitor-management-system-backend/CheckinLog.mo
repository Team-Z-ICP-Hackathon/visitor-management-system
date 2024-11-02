<<<<<<< HEAD

actor CheckinLog {
    public func logCheckIn(visitorId: Text, verificationStatus: Text): async Text {
        // Logic to log the check-in status, e.g., saving to a database or storage
        return "Check-in logged for " # visitorId # " with status: " # verificationStatus;
    }
=======
// defines the CheckIn entity and the methods supporting the checkin process

import Time "mo:base/Time";

public type CheckInLog = {
    id: Text;
    visitorId: Text;
    timestamp: Int;
    status: Text; // Status of the check-in, e.g., "Checked In" or "Denied". Helps track the result of the check-in.
};

public func createCheckInLog(visitorId: Text, status: Text): CheckInLog {
    return {
        id = generateUniqueId();
        visitorId = visitorId;
        timestamp = Time.now();
        status = status;
    };
}


// Private helper function to generate a unique ID for each check-in log.
// Here, we use the current time to create a unique ID, converting it to text.

private func generateUniqueId(): Text {
    return Int.toText(Time.now());
>>>>>>> 6bd86a0d5276ed8c9b2ca3244e5f247549cf13fb
}
