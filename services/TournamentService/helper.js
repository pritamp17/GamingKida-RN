import { db } from '../Firebase/firebaseconfig';

class Tournament {
    constructor(orgId, orgName,name, game, description, image, createdBy, createdAt, scheduledAt, paid, fee, publicOrPrivate, memberIds = [], requests = [], payRequests = [], start, isCompleted) {
        this.orgId = orgId;                    // ID of the organization (or userId if created by an individual user)
        this.orgName = orgName                 // orgName is same as createdBy for individual user
        this.name = name;                      // Name of the tournament
        this.game = game;                      // Name of the game for the tournament
        this.description = description;        // Description of the tournament
        this.image = image;                    // Image associated with the tournament
        this.createdBy = createdBy;            // Admin or superAdmin who created the tournament
        this.createdAt = createdAt;            // Date when the tournament was created
        this.scheduledAt = scheduledAt;        // Date when the tournament is scheduled
        this.paid = paid;                      // Boolean indicating if the tournament is paid
        this.fee = fee;                        // Fee for the tournament (only if it's a paid tournament)
        this.publicOrPrivate = publicOrPrivate; // Indicates if the tournament is public or private /// Only for orgs
        this.memberIds = memberIds;            // List of members (users) of the tournament
        this.requests = requests;              // List of join requests for the tournament (especially for private tournaments)
        this.payRequests = payRequests         // transcation id of the payments made
        this.start = start
        this.isCompleted = this.isCompleted 
    }
}

export const uploadImageToFirebase = async (image) => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('tournamentImages/' + image.name); // unique name
    await imageRef.put(image);
    return await imageRef.getDownloadURL(); // get URL of uploaded image
};

export const getUnpaidTournamentById = async (id) => {
    try {
        const tournamentDoc = await db.collection('tournaments').doc('unpaid').collection('ids').doc(id).get();
        if (!tournamentDoc.exists) return null;
        return { tournament: tournamentDoc.data() };
    } catch (error) {
        console.error('Error retrieving tournament: ', error);
        return null;
    }
}


export const getPaidTournamentById = async (id) => {
    try {
        const tournamentDoc = await db.collection('tournaments').doc('paid').collection('ids').doc(id).get();
        if (!tournamentDoc.exists) return null;
        return { tournament: tournamentDoc.data() };
    } catch (error) {
        console.error('Error retrieving tournament: ', error);
        return null;
    }
}


export const sendRequestToJoinCompetetion = async (userId, tournamentId, paid) => {
    try {
        let tournamentData;
        let type;
        if(paid){
            tournamentData = await getPaidTournamentById(tournamentId);
            type = 'paid';
        }else{
            tournamentData = await getUnpaidTournamentById(tournamentId);
            type = 'unpaid';
        }
        const orgData = await orgExists(tournamentData.orgName);
        if(tournamentData.publicOrPrivate){
            if(!orgData.memberIds.includes(userId)){
                return {success: false, error: `"${tournamentData.name}" is private competetion and you are not member of "${orgData.name}"`};
            }
        }
        
        if(tournamentData && !tournamentData.requests.includes(userId)){
             await db.collection('tournaments').doc(type).collection('ids').doc(tournamentId).update({
                requests: [...tournamentData.requests, userId]
            });
        }else{
            return {success: false, error: `User has sent request already for joining "${tournamentData.name}" ` };
        }
        return {success: true, error: `Request sent for Joining "${tournamentData.name}" ` };
    } catch (error) {
        console.error(`error in sending joining request to tournament with ID "${tournamentId}"`);
        return {success: false, error: error.message };
    }
}

export const addTransxIdToTournamnet = async (id, transxId, transxRef, userId) => {
    try {
        const transcId = transxId + '+' + transxRef;
        const tournamentData = await getPaidTournamentById(id);
        if(tournamentData && !tournamentData.payRequests.includes(transxIs)){
            await db.collection('tournaments').doc('paid').collection('ids').doc(id).update({
                payRequests: [...tournamentData.payRequests, transcId],
                memberIds: [...tournamentData.memberIds, userId]
            })
            return {success: true, error: `Payrequest "${transxId}" successfull in "${tournamentData.name}"` };
        }else{
            return {success: false, error: `Payrequest "${transxId}" already present in "${tournamentData.name}"` };
        }
    } catch (error) {
        return {success: false, error: `Failed to update PayRequests "${id}" ` };
    }
}

export const startTournament = async (id, paid) => {
    try {
        const isPaid = paid == true ? 'paid' : 'unpaid';
        let tournamentData;
         if(paid) {
            tournamentData = getPaidTournamentById(id);
        }else{
            tournamentData = getUnpaidTournamentById(id);
        } 
        if(tournamentData.start != tournamentData.createdAt){
        await db.collection('tournaments').doc(isPaid).collection('ids').doc(id).update({
           start: new Date().toISOString()
        });
        return {success: true, error: `tournamnet with Id "${id}" started successfully` };
    }else{
        return {success: false, error: `tournamnet with Id "${id}" already started` };
    }
    } catch (error) {
        console.log(error.message)
        return {success: false, error: error.message };
    }
}

export const competetionStatus = async(id, paid) => {
    try {
        // start >= current + 1 hrs --> completed --> isCompleted true
        // start < current + 1---- --> live 
        const isPaid = paid == true ? 'paid' : 'unpaid';
        let tournamentData;
         if(paid) {
            tournamentData = getPaidTournamentById(id);
        }else{
            tournamentData = getUnpaidTournamentById(id);
        } 
        if(tournamentData.isCompleted){}
        if(tournamentData.start != tournamentData.createdAt){
        await db.collection('tournaments').doc(isPaid).collection('ids').doc(id).update({
           start: new Date().toISOString()
        });
        return {success: true, error: `tournamnet with Id "${id}" started successfully` };
    }else{
        return {success: false, error: `tournamnet with Id "${id}" already started` };
    }
    } catch (error) {
        
    }
}

export {Tournament};