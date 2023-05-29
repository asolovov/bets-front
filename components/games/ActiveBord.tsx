import {GameType} from "@/types/gameType";
import React, {useState} from "react";
import Dice from "@/components/games/Dice";

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

export default function ActiveBord(
    {
        game, signer, results, minBet, throwD, sendBet, pass
    }:{
        game: GameType, signer: string, minBet: string, results: string[], throwD: Function, sendBet: Function, pass: Function
    }) {
    const [bet, setBet] = useState(0);
    const playersBets = game.user1 === signer ? game.betsUser1 : game.betsUser2;
    const opponentsBets = game.user1 === signer ? game.betsUser2 : game.betsUser1
    const playersTurn = (game.user1 === signer && game.turn === 1) || (game.user2 === signer && game.turn === 2);
    const opponentsAddress = game.user1 === signer ? game.user2 : game.user1;
    const canBet = !game.throwing && playersTurn;
    const canThrow = game.throwing && playersTurn;
    const round = stages[game.stage];
    const lastDice = results.length === 0 ? 0 : Number(results.slice(-1));
    let action = "";

    if (playersTurn && game.throwing) {
        action = "THROW DICE"
    }

    if (playersTurn && !game.throwing) {
        action = "MAKE BET"
    }

    if (!playersTurn) {
        action = "WAIT"
    }

    return (
        <div>
            <div className={"w-75 h-100 m-auto mt-3"}>
                <h2 className={"text-center"}>Game {game.id} | {round} | {playersTurn ? "Your turn" : "Opponents turn"}</h2>
                <hr/>
                <div className={"container"}>
                    <div className={"row text-center"}>
                        <div className={"col row"}>
                            <button
                                className={"btn btn-lg btn-warning col m-1"}
                                disabled={!canBet}
                                onClick={() => sendBet(bet)}>BET</button>
                            <input className={"form-control col m-1"} disabled={!canBet} placeholder={minBet} onChange={
                                (e) => setBet(Number(e.target.value))
                            } />
                        </div>
                        <div className={"col"}>
                            <button className={"btn btn-lg btn-success"} disabled={!canThrow} onClick={() => throwD()}>THROW</button>
                        </div>
                        <div className={"col"}>
                            <button className={"btn btn-lg btn-danger"} disabled={!canBet} onClick={() => pass()}>PASS</button>
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col text-start"}>
                            <h4>YOU</h4>
                        </div>
                        <div className={"col text-center"}>
                            <h4>{action}</h4>
                        </div>
                        <div className={"col text-end"}>
                            <h4>OPPONENT</h4>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col text-start"}>
                            <p className={"text-muted"}>{signer}</p>
                        </div>
                        <div className={"col text-center"}>

                        </div>
                        <div className={"col text-end"}>
                            <p className={"text-muted"}>{opponentsAddress}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col-3 text-start"}>
                            {playersTurn ? <h5 className={"mt-3"}><b>Your turn!</b></h5> : <h5 className={"mt-3"}><b>Wait...</b></h5>}
                            <h6 className={"mt-3"}>Bets: {playersBets} MATIC</h6>
                            <h6 className={"mt-3"}>Results: {results.toString()}</h6>
                        </div>
                        <div className={"col text-center"}>
                            <Dice value={lastDice}/>
                        </div>
                        <div className={"col-3 text-end"}>
                            {playersTurn ? <h5 className={"mt-3"}><b>Waiting...</b></h5> : <h5 className={"mt-3"}><b>Opponents turn</b></h5>}
                            <h6 className={"mt-3"}>Bets: {opponentsBets} MATIC</h6>
                            <h6 className={"mt-3"}>Results: unknown</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
