
import Debug "mo:base/Debug";

actor Checkout {
  public query func checkout(image: Text, userId: Principal) : async Text {
    // Process the checkout, store user info, etc.
    Debug.print("User ID: " # userId.toText());
    Debug.print("Image: " # image);
    return "Checkout successful"; // Or any relevant success message
  }
}
