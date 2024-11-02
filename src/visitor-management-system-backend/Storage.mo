// Defines centralized data storage and helper methods

import HashMap "mo:base/HashMap";
import Trie "mo:base/Trie";
import Visitor "Visitor";
import CheckInLog "CheckInLog";
import NotificationLog "NotificationLog";

public stable var visitors: HashMap.Text<Visitor.Visitor> = HashMap.Text<Visitor.Visitor>();
public stable var checkInLogs: Trie.Trie<Text, CheckInLog.CheckInLog> = Trie.empty<Text, CheckInLog.CheckInLog>();
public stable var notificationLogs: Array<NotificationLog.NotificationLog> = Array.empty<NotificationLog.NotificationLog>();
