import {GameType} from "@/types/gameType";
import Game from "@/components/games/Game";

const Games = ({games, loading, signer, handleJoinGame}: {games: GameType[] | [], loading: boolean, handleJoinGame: Function, signer: string | null}) => {
    return (
        <div className={"row row-cols-2 mt-3 mb-5 g-4"}>
            {games.length > 0
                ?
                <>
                {games.map(game =>
                    <Game game={game} signer={signer} handleJoinGame={handleJoinGame} key={game.id}/>
                )}
                </>
                : loading ? null : <h4 className={"w-100"}>No games found...</h4>
            }
        </div>
    )
}

export default Games;