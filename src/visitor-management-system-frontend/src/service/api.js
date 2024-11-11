
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../declarations/CheckinLog'; 

const agent = new HttpAgent();
const checkinLogActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: 'bd3sg-teaaa-aaaaa-qaaba-cai', // Your backend canister ID
});

export const registerVisitor = async (visitorData) => {
    try {
        await checkinLogActor.registerVisitor(
            visitorData.fullName,
            visitorData.email,
            visitorData.idNumber,
            visitorData.phoneNumber,
            visitorData.visitLocation,
            visitorData.checkInTime
        );
        console.log('Visitor registered successfully');
    } catch (error) {
        console.error('Error registering visitor:', error);
    }
};

export const checkoutVisitor = async (idNumber) => {
    try {
        await checkinLogActor.checkoutVisitor(idNumber);
        console.log('Visitor checked out successfully');
    } catch (error) {
        console.error('Error checking out visitor:', error);
    }
};
