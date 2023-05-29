import {getContractWithoutSigner, getContractWithOwner, getContractWithSigner} from "@/heplers/ethersHelpers";
import {GameType} from "@/types/gameType";
import {ethers} from "ethers";

export const getAllGames = async () => {
    const contract = getContractWithoutSigner();

    if (contract) {
        return _getALlGames();
    }

    return [];
}

export const getMinBet = async () => {
    const contract = getContractWithoutSigner();

    if (contract) {
        try {
            const result = await contract.getMinBet();
            return {ok: true, bet: ethers.utils.formatEther(result)};
        } catch (error) {
            console.error(`Get min bet error: ${error}`);
        }
    }

    return {ok: false, bet: ""};
}

export const createGame = async () => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.startGame();
            await tx.wait();
            return {ok: true};
        } catch (error) {
            console.error(`Create new game error: ${error}`);
        }
    }

    return {ok: false};
}

export const getFullGame = async (id: number, owner: string) => {
    const contract = getContractWithOwner(owner);

    if (contract) {
        try {
            const [gameTX, resultsTX] = await contract.getFullGameInfo(id);
            const game: GameType = {
                id: id,
                user1: gameTX.user1,
                user2: gameTX.user2,
                betsUser1: ethers.utils.formatEther(gameTX.betsUser1),
                betsUser2: ethers.utils.formatEther(gameTX.betsUser2),
                throwing: gameTX.throwing,
                winner: gameTX.winner,
                stage: gameTX.stage,
                turn: gameTX.turn
            }

            console.log(resultsTX.user1)
            console.log(resultsTX.user2)

            return {ok: true, game: game, user1: resultsTX.user1, user2: resultsTX.user2}
        } catch (error) {
            console.error(`Get full game error: ${error}`);
        }
    }

    return {ok: false, game: null, user1: [], user2: []}
}

export const getGame = async (id: number) => {
    const contract = getContractWithoutSigner();

    if (contract) {
        try {
            const gameTX = await contract.getGame(id);
            const game: GameType = {
                id: id,
                user1: gameTX.user1,
                user2: gameTX.user2,
                betsUser1: ethers.utils.formatEther(gameTX.betsUser1),
                betsUser2: ethers.utils.formatEther(gameTX.betsUser2),
                throwing: gameTX.throwing,
                winner: gameTX.winner,
                stage: gameTX.stage,
                turn: gameTX.turn
            }

            return {ok: true, game: game};
        } catch (error) {
            console.error(`Get game error: ${error}`);
        }
    }

    return {ok: false, game: null};
}

export const getUserResults = async (id: number) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const results = await contract.seeResults(id);
            return {ok: true, result: results};
        } catch (error) {
            console.error(`Get user results error: ${error}`);
        }
    }

    return {ok: false, result: null};
}

export const joinGame = async (id: number) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.enterGame(id);
            await tx.wait();
            return {ok: true};
        } catch (error) {
            console.error(`Enter game error: ${error}`);
        }
    }

    return {ok: false};
}

export const throwDice = async (id: number) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.throwDice(id);
            await tx.wait();
            const results = await contract.seeResults(id);
            return {ok: true, result: results};
        } catch (error) {
            console.error(`Throw dice error: ${error}`);
        }
    }

    return {ok: false, result: null};
}

export const sendBet = async (id: number, value: number) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.bet(id, {value: ethers.utils.parseEther(value.toString())});
            await tx.wait();
            const gameTX = await contract.getGame(id);
            const game: GameType = {
                id: id,
                user1: gameTX.user1,
                user2: gameTX.user2,
                betsUser1: ethers.utils.formatEther(gameTX.betsUser1),
                betsUser2: ethers.utils.formatEther(gameTX.betsUser2),
                throwing: gameTX.throwing,
                winner: gameTX.winner,
                stage: gameTX.stage,
                turn: gameTX.turn
            }

            return {ok: true, game: game};
        } catch (error) {
            console.error(`Send bet error: ${error}`);
        }
    }

    return {ok: false, game: null};
}

export const pass = async (id: number) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.pass(id);
            await tx.wait();
            return {ok: true};
        } catch (error) {
            console.error(`Pass error: ${error}`);
        }
    }

    return {ok: false};
}

const _getALlGames = async () => {
    const contract = await getContractWithoutSigner();
    let games: GameType[] = [];

    if (contract) {
        const nextGameID = await contract.nextGameID();

        if (nextGameID) {
            for (let i = 1; i < nextGameID; i++) {
                const game = await contract.getGame(i);

                games.push({
                    id: i,
                    user1: game.user1,
                    user2: game.user2,
                    betsUser1: ethers.utils.formatEther(game.betsUser1),
                    betsUser2: ethers.utils.formatEther(game.betsUser2),
                    throwing: game.throwing,
                    winner: game.winner,
                    stage: game.stage,
                    turn: game.turn
                });
            }
        }
    }

    return games;
}