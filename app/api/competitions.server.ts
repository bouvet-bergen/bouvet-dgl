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

async function calculateHighScore(competitions: Competition[]): Promise<Score[]>{
    const courses = await prisma.course.findMany();
    const results = competitions.map(item => item.Results.map(res => ({...res, CourseId: item.CourseID})) ).flat();
    
    return results.reduce((acc, currentItem) => {
        const course = courses.find(item => item.courseId === currentItem.CourseId);
        const rating = getRoundRating(course?.parRating ?? 0, course?.parScore?? 0, course?.ratingDiff?? 0, currentItem.Sum);
        const userIndex =  acc.findIndex(item => item.UserId === currentItem.UserID); 
        if(userIndex >= 0){
            acc[userIndex].Scores.push(currentItem); 
        }
        else {
            acc.push({ UserId: currentItem.UserID, Scores: [currentItem], UserName: currentItem.Name, Rating: rating})
        }
        console.log('acc', acc);
        return acc; 
    }, [] as Score[])
}

function getRoundRating(parRating: number, coursePar: number, courseDiff: number, score: number): number {
    return parRating - courseDiff * (score - coursePar);
}

export async function fetchCompetitions(): Promise<FrontPageData> {
    const rounds = await prisma.round.findMany()
    const promises = rounds.map(round => fetchCompetition(round.metrixId)); 
    try {
        const competitions = await Promise.all(promises); 
        return { competitions: competitions as unknown as Competition[], scores: await calculateHighScore(competitions)};

    } catch (error) {
        throw error; 
    }
}