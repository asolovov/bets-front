import {GameType} from "@/types/gameType";
import {ethers} from "ethers";
import React from "react";
import Link from "next/link";

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

const Game = ({game, signer, handleJoinGame}: {game: GameType, signer: string | null, handleJoinGame: Function}) => {
    const user1 = game.user1.substring(0, 4) + '...' + game.user1.substring(game.user1.length - 4, game.user1.length)
    const user2 = game.user2.substring(0, 4) + '...' + game.user2.substring(game.user2.length - 4, game.user2.length)
    const canJoin = game.user2 === ethers.constants.AddressZero && game.user1 !== signer;
    let winner = game.winner === ethers.constants.AddressZero ? "No winner yet" : game.winner
    winner = winner.substring(0, 4) + '...' + winner.substring(winner.length - 4, winner.length)

    return (
        <div className={"col"}>
            <div className={"card"}>
                <div className="card-body">
                    <h5 className="card-title"><Link href={`/${game.id}`}>Game ID: {game.id}</Link></h5>
                    <button className={"btn btn-warning"} disabled={!canJoin} onClick={() => handleJoinGame(game.id)}>Join game</button>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">User1: {user1} | <b>Bets: {game.betsUser1}MATIC</b></li>
                    <li className="list-group-item">User2: {user2} | <b>Bets: {game.betsUser2}MATIC</b></li>
                    <li className="list-group-item">Turn: {turns[game.turn]}</li>
                    <li className="list-group-item">Stage: {stages[game.stage]}</li>
                    <li className="list-group-item">Winner: {winner}</li>
                </ul>
            </div>
        </div>
    )
}

export default Game;