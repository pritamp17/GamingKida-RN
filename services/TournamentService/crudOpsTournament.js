import { db } from '../Firebase/firebaseconfig';
import {Tournament, getUnpaidTournamentById} from './helper'
import {orgExists, isUserAdmin, addCompetitionToOrg} from '../OrgService/index'

const MAX_Members_IN_COMPETETION = 100;

export const createCompetition = async (orgId, orgName, name, description, game, imageUrl, createdBy, scheduledAt, paid, fee, publicOrPrivate,) => {
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
            paid: false,
            fee: 0,
            publicOrPrivate,
            memberIds: [],
            requests: [],
            payRequests: [],
            start: new Date().toISOString(),
            isCompleted: false
        };
        const docRef = await db.collection('tournaments').doc('unpaid').collection('ids').add(newCompetition); // tournaments is the collection name in Firebase Firestore
        addCompetitionToOrg(orgName, docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: error.message };
    }
};


export const acceptTournamentJoiningRequest = async (tournamentId, userId, requestId) => {
    try {
        const tournamentData = await getUnpaidTournamentById(tournamentId);
        
        if(tournamentData){
            const orgData = await orgExists(tournamentData.orgName);
            
            if(tournamentData.createdBy === userId || isUserAdmin(userId, orgData)){

                if (tournamentData.requests && tournamentData.requests.includes(requestId)) {
                    
                    // Check members limit before processing the request
                    if (tournamentData.members.length >= MAX_Members_IN_COMPETETION) {
                        return { success: false, error: "Maximum members limit reached." };
                    }

                    // Remove the requestId from requests
                    tournamentData.requests = tournamentData.requests.filter(reqId => reqId !== requestId);

                    // Add the requestId to members
                    tournamentData.members.push(requestId);
                    
                    // Update the document in the database
                    await db.collection('tournaments').doc('unpaid').collection('ids').doc(tournamentId).update({
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