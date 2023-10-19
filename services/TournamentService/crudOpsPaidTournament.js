import { db } from '../Firebase/firebaseconfig';
import {Tournament, getUnpaidTournamentById} from './helper'
import {orgExists, isUserAdmin, addCompetitionToOrg} from '../OrgService/index'

const MAX_Members_IN_COMPETETION = 100;

export const createPaidCompetetion = () => {
    
}