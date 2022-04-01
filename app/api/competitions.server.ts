import { Competition, FrontPageData, Score } from '~/models/competition.server'
import { prisma } from '../db.server';

export async function fetchCompetition(roundId: string): Promise<Competition> {
    try {
        const competition = await fetch(`https://discgolfmetrix.com/api.php?content=result&id=${roundId}`); 
        const result = await competition.json() as unknown as { Competition: Competition };
        return result.Competition; 

    } catch (error) {
        throw error; 
    }
}

function calculateHighScore(competitions: Competition[]): Score[]{
    const results = competitions.map(item => item.Results).flat();
    return results.reduce((acc, currentItem) => {
        const userIndex =  acc.findIndex(item => item.UserId === currentItem.UserID); 
        if(userIndex >= 0){
            acc[userIndex].Scores.push(currentItem); 
        }
        else {
            acc.push({ UserId: currentItem.UserID, Scores: [currentItem], UserName: currentItem.Name})
        }
        
        return acc; 
    }, [] as Score[])
}

export async function fetchCompetitions(): Promise<FrontPageData> {
    const rounds = await prisma.round.findMany()
    const promises = rounds.map(round => fetchCompetition(round.metrixId)); 
    try {
        const competitions = await Promise.all(promises); 
        return { competitions: competitions as unknown as Competition[], scores: calculateHighScore(competitions)};

    } catch (error) {
        throw error; 
    }
}