import Layout from "@/components/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {getContractWithoutSigner, getSignerAddress} from "@/heplers/ethersHelpers";
import {
    getFullGame,
    getGame,
    getMinBet,
    getUserResults,
    pass,
    sendBet,
    throwDice
} from "@/heplers/contractHelpers";
import {GameType} from "@/types/gameType";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
import ActiveBord from "@/components/games/ActiveBord";
import {GetServerSideProps} from "next";
import ViewBoard from "@/components/games/ViewBoard";

export default function Game({data}: {data: Data}) {
    const [id, setID] = useState(data.id);
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(false);
    const [signerAddress, setSignerAddress] = useState<string | null>("");
    const [game, setGame] = useState<GameType | null>(null);
    const [userRes, setUserRes] = useState<string[] | null>([]);
    const [user1res, setUser1res] = useState<string[]>([]);
    const [user2res, setUser2res] = useState<string[]>([]);
    const [minBet, setMinBet] = useState("");
    const router = useRouter();

    useEffect(() => {
        const contract = getContractWithoutSigner();
        contract.on("ChangeGameStage", () => {
            console.log("event!")
            setLoading(true);
            getGame(id).then(r => setGame(r.game)).then(() => setLoading(false));
        })
        return () => {
            contract.removeAllListeners();
        }
    }, [setLoading, getGame])

    useEffect(() => {
        setLoading(true);
        getMinBet().then(r => setMinBet(r.bet));
        getSignerAddress().then(r => setSignerAddress(r));
        getUserResults(id).then(r => setUserRes(r.result));
        getFullGame(id, data.owner).then(r => {
            setGame(r.game)
            setUser1res(r.user1)
            setUser2res(r.user2)
        }).then(() => setLoading(false));
    }, [setLoading, setSignerAddress, getUserResults, getGame, getMinBet])

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    const handlePass = async () => {
        setLoading(true);

        const result = await pass(id);

        if (result.ok) {
            await router.push(`/${id}`)
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const handleThrow = async () => {
        setLoading(true);

        const result = await throwDice(id);

        if (result.ok) {
            setUserRes(result.result);
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const handleBet =  async (amount: number) => {
        if (amount === null || Number.isNaN(amount)) {
            setAlertType("warning");
            setAlertText("Please use number format for example 1 or 0.1");
            setIsAlert(true);
            return
        }

        if (amount === 0) {
            setAlertType("warning");
            setAlertText("Bet cannot be 0!");
            setIsAlert(true);
            return
        }

        if (amount < Number(minBet)) {
            setAlertType("warning");
            setAlertText(`Bet cannot be less than min bet ${minBet}!`);
            setIsAlert(true);
            return
        }

        setLoading(true);

        const result = await sendBet(id, amount);

        if (result.ok) {
            setGame(result.game);
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const CurrentBoard = ()  => {
        if (game) {
            if (userRes !== null && game.stage !== 4) {
                return (
                    <ActiveBord
                        game={game}
                        results={userRes}
                        minBet={minBet}
                        signer={signerAddress ? signerAddress : ""}
                        throwD={handleThrow}
                        sendBet={handleBet}
                        pass={handlePass}
                    />
                )
            }

            if (game.stage === 4) {
                return (
                    <ViewBoard
                        game={game}
                        signer={signerAddress ? signerAddress : ""}
                        resultsUser1={user1res.toString()}
                        resultsUser2={user2res.toString()}
                    />
                )
            }
        }
        return null
    }

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item active"><Link className={"link-light"} href="/">ALl games</Link></li>
            <li className="breadcrumb-item active">Game {id}</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
                {game && userRes !== null ?
                    <CurrentBoard/>
                    : null
                }
            </Layout>
        </>

    )
}

type Data = {
    id: number
    owner: string
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const query = await context.query.gameID;
    let id: number;

    if (Number.isNaN(Number(query))) {
        id = 0
    } else {
        id = Number(query);
    }

    let owner = process.env.OWNER;
    owner = owner ? owner : "";

    return {
        props: {
            data: {
                id: id,
                owner: owner,
            },
        },
    }
}
