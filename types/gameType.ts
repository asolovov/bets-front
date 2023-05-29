export interface GameType {
    id: number,
    user1: string,
    user2: string,
    betsUser1: string,
    betsUser2: string,
    throwing: boolean,
    winner: string,
    stage: Stage,
    turn: Turn,
}

export enum Stage {
    INIT,ROUND1, ROUND2, ROUND3, FINISHED
}

export enum Turn {
    NO_TURN,USER1, USER2
}