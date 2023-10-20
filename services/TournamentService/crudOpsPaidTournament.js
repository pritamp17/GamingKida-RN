import { db } from '../Firebase/firebaseconfig';
import {Tournament} from './helper'
import {orgExists, isUserAdmin, addCompetitionToOrg, getpaidTournamentById} from '../OrgService/index'

const MAX_Members_IN_COMPETETION = 100;

export const createPaidCompetition = async (orgId, orgName, name, description, game, imageUrl, createdBy, scheduledAt, paid, fee, publicOrPrivate) => {
    try {

        if(orgId == createdBy){
            console.info("competition created by individual user")
        }else {
           const orgData = await orgExists(orgName);
            if(orgData){
                if(!isUserAdmin(createdBy, orgData)){
                    console.log(`You are Not admin of "${orgName}"`);
                    return { success: false, error: `You are Not admin of "${orgName}"`};
                }
            }else{
                console.log(`org with name "${orgName}" does not exist`);
                return { success: false, error: `org with name "${orgName}" does not exist`};
            }
        }

        const newCompetition = {
            orgId,
            orgName,
            name,
            description,
            game,
            image: imageUrl, // this is the URL from Firebase Cloud Storage
            createdBy,
            createdAt: new Date().toISOString(),
            scheduledAt,
            paid: true,
            fee,
            publicOrPrivate,
            memberIds: [],
            requests: [],
            payRequests: []
        };
        const docRef = await db.collection('tournaments').doc('paid').collection('ids').add(newCompetition); // tournaments is the collection name in Firebase Firestore
        addCompetitionToOrg(orgName, docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: error.message };
    }
};

export const acceptPaidTournamentJoiningRequest = async (tournamentId, userId, requestId) => {
    try {
        const tournamentData = await getpaidTournamentById(tournamentId);
        
        if(tournamentData){
            const orgData = await orgExists(tournamentData.orgName);
            
            if(tournamentData.createdBy === userId || isUserAdmin(userId, orgData)){

                if (tournamentData.requests && tournamentData.requests.includes(requestId)) {
                    
                    // Check members limit before processing the request
                    if (tournamentData.payRequests.length >= MAX_Members_IN_COMPETETION) {
                        return { success: false, error: "Maximum members limit reached." };
                    }

                    // Remove the requestId from requests
                    tournamentData.requests = tournamentData.requests.filter(reqId => reqId !== requestId);

                    // Add the requestId to members
                    tournamentData.members.push(requestId);
                    
                    // Update the document in the database
                    await db.collection('tournaments').doc('paid').collection('ids').doc(tournamentId).update({
                        requests: tournamentData.requests,
                        members: tournamentData.members
                    });

                    return { success: true, message: "Member added successfully" };

                } else {
                    return { success: false, error: "Request ID not found." };
                }

            } else {
                return { success: false, error: `You are not Admin of "${orgData.name}"` };
            }
        } else {
            return { success: false, error: "Tournament not found." };
        }
    } catch (error) {
        console.error("Error accepting tournament joining request: ", error);
        return { success: false, error: "An error occurred while processing your request." };
    }
};

export const sendPayNotificationsToMembers = async(tournamentId) => {
    try {
        const tournamentData = await getpaidTournamentById(tournamentId);
        if (tournamentData && tournamentData.memberIds && tournamentData.memberIds.length > 0) {
            // Define the message you want to send
            const message = {
                to: '', // will be filled in loop
                sound: 'default',
                title: 'Payment Reminder',
                body: 'Please complete your payment to enter the tournament.',
                data: { tournamentId: tournamentId }, // additional data you might need
            };

            // Loop through each member and send them a notification
            for (let memberId of tournamentData.memberIds) {
                // You would need to fetch the user's Expo push token 
                // (assuming each user has a token saved in your database)
                const token = await getUserPushToken(memberId); 
                if (token) {
                    message.to = token;
                    await sendExpoPushNotification(message);
                }
            }
        }
    } catch (error) {
        console.error("Error Sending Pay Notifications to members of tournament with id: ", tournamentId);
        return { success: false, error: "Error Sending Pay Notifications to members of tournament." };
    }
};

const sendExpoPushNotification = async (message) => {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
    const data = await response.json();
    return data;
};