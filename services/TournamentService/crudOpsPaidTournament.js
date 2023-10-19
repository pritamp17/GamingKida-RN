import { db } from '../Firebase/firebaseconfig';
import {Tournament} from './helper'
import {orgExists, isUserAdmin, addCompetitionToOrg} from '../OrgService/index'

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