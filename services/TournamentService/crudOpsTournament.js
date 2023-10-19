import { db } from '../Firebase/firebaseconfig';
import {Tournament, getTournamentById} from './helper'
import {orgExists, isUserAdmin, addCompetitionToOrg} from '../OrgService/index'

const MAX_Members_IN_COMPETETION = 100;

export const createCompetition = async (orgId, orgName, name, description, game, imageUrl, createdBy, scheduledAt, paid, fee, publicOrPrivate) => {
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
            paid,
            fee,
            publicOrPrivate,
            memberIds: [],
            requests: [],
            payRequests: []
        };
        const docRef = await db.collection('tournaments').add(newCompetition); // tournaments is the collection name in Firebase Firestore
        addCompetitionToOrg(orgName, docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: error.message };
    }
};

export const sendRequestToJoinCompetetion = async (userId, tournamentId) => {
    try {
        const tournamentData = await getTournamentById(tournamentId);
        const orgData = await orgExists(tournamentData.orgName);
        if(tournamentData.publicOrPrivate){
            if(!orgData.memberIds.includes(userId)){
                return {success: false, error: `"${tournamentData.name}" is private competetion and you are not member of "${orgData.name}"`};
            }
        }
        
        if(tournamentData && !tournamentData.requests.includes(userId)){
            await db.collection('tournaments').doc(orgData.id).update({
                requests: [...tournamentData.requests, userId]
            });
        }else{
            return {success: false, error: `User has sent request already for joining "${tournamentData.name}" ` };
        }  
    } catch (error) {
        console.error(`error in sending joining request to tournament with ID "${tournamentId}"`);
        return {success: false, error: error.message };
    }
}

export const acceptTournamentJoiningRequest = async (tournamentId, userId, requestId) => {
    try {
        const tournamentData = await getTournamentById(tournamentId);
        
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
                    await db.collection('tournaments').doc(tournamentId).update({
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