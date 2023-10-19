import { db } from '../Firebase/firebaseconfig';

class Tournament {
    constructor(orgId, orgName,name, game, description, image, createdBy, createdAt, scheduledAt, paid, fee, publicOrPrivate, memberIds = [], requests = [], payRequests = []) {
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
        this.payRequests = this.payRequests
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

export {Tournament};