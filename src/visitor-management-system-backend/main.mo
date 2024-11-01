// Will serve as the main entry point for the visitor management process


actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
