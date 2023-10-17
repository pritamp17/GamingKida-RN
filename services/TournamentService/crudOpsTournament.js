import { db } from '../Firebase/firebaseconfig';
import {Tournament, uploadImageToFirebase, getTournamentById} from './helper'
import {orgExists, isUserAdmin} from '../OrgService/helpers'
import {addCompetitionToOrg} from '../OrgService/crudOrg'

const MAX_Members_IN_COMPETETION = 100;

export const createCompetition = async (orgId, orgName, name, description, game, imageUrl, createdBy, scheduledAt, paid, fee, publicOrPrivate) => {
    try {
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
            requests: []
        };
        if(orgId == createdBy){
            console.info("competition created by individual user")
        }else {
            orgData = orgExists(orgName);
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
        const docRef = await db.collection('tournaments').add(newCompetition); // tournaments is the collection name in Firebase Firestore
        addCompetitionToOrg(orgName, docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: error.message };
    }
};

export const sendRequestToJoinCompetetion = async(userId, tournamentId) => {
    try {
        const tournamentData = getTournamentById(tournamentId);
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

export const acceptTournamentJoiningRequest = (orgName, UserId) => {

}