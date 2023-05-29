import {GameType} from "@/types/gameType";
import React from "react";
import {ethers} from "ethers";

const turns = {
    0: "No turn",
    1: "User1 turn",
    2: "User2 turn",
}

const stages = {
    0: "Waiting for second player",
    1: "Round 1",
    2: "Round 2",
    3: "Round 3",
    4: "Finished",
}

export default function ViewBoard(
    {
        game, signer, resultsUser1, resultsUser2
    }:{
        game: GameType, signer: string, resultsUser1: string, resultsUser2: string,
    }
) {
    const round = stages[game.stage];
    const turn = turns[game.turn];
    const winner = game.winner === ethers.constants.AddressZero
        ? "No winner"
        : game.winner === game.user1 ? "User 1" : "User 2"


    return (
        <div>
            <div className={"w-75 h-100 m-auto mt-3"}>
                <h2 className={"text-center"}>Game {game.id} | {round} | {turn}</h2>
                <hr/>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col text-start"}>
                            <h4>USER 1</h4>
                        </div>
                        <div className={"col text-center"}>
                            <h4>Winner: {winner}</h4>
                        </div>
                        <div className={"col text-end"}>
                            <h4>USER 2</h4>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col text-start"}>
                            <p className={"text-muted"}>{game.user1}</p>
                        </div>
                        <div className={"col text-center"}>

                        </div>
                        <div className={"col text-end"}>
                            <p className={"text-muted"}>{game.user2}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col-3 text-start"}>
                            <h6 className={"mt-3"}>Bets: {game.betsUser1} MATIC</h6>
                            <h6 className={"mt-3"}>Results: {resultsUser1}</h6>
                        </div>
                        <div className={"col text-center"}>
                            <h6>BANK: {Number(game.betsUser1) + Number(game.betsUser2)} MATIC</h6>
                        </div>
                        <div className={"col-3 text-end"}>
                            <h6 className={"mt-3"}>Bets: {game.betsUser2} MATIC</h6>
                            <h6 className={"mt-3"}>Results: {resultsUser2}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}