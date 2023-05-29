import React, {useEffect, useState} from "react";
import {getSignerAddress} from "@/heplers/ethersHelpers";
import Loading from "@/components/Loading";
import Layout from "@/components/Layout";
import Alert from "@/components/Alert";
import {GameType} from "@/types/gameType";
import {createGame, getAllGames, joinGame} from "@/heplers/contractHelpers";
import Games from "@/components/games/Games";
import {useRouter} from "next/router";

export default function Home() {
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(false);
    const [signerAddress, setSignerAddress] = useState<string | null>("");
    const [allGames, setAllGames] = useState<GameType[] | []>([]);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        getSignerAddress().then(r => setSignerAddress(r));
        getAllGames().then(r => setAllGames(r)).then(() => setLoading(false));
    }, [setLoading, setSignerAddress])

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    const handleNewGame = async () => {
        setLoading(true);

        const res = await createGame();

        if (res.ok) {
            getAllGames().then(r => setAllGames(r)).then(() => setLoading(false));
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const handleJoinGame = async (id: number) => {
        setLoading(true);

        const res = await joinGame(id);

        if (res.ok) {
            getAllGames().then(r => setAllGames(r)).then(() => setLoading(false));
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }


        setLoading(false);
    }

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">All Games</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
                <h2 className={"mt-3"}>All Games</h2>
                <div className="d-grid gap-2 d-md-block">
                    <button className={"btn btn-success m-1"} onClick={() => handleNewGame()}>New game</button>
                </div>
                <Games games={allGames} loading={loading} signer={signerAddress} handleJoinGame={handleJoinGame}/>
            </Layout>
        </>
    )
}
