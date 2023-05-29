import styled from "styled-components";
import {
    BsFillDice1Fill,
    BsFillDice2Fill,
    BsFillDice3Fill,
    BsFillDice4Fill,
    BsFillDice5Fill,
    BsFillDice6Fill
} from "react-icons/bs";
import {GiPerspectiveDiceSixFacesRandom} from "react-icons/gi";

export default function Dice({value}: {value: number}) {
    switch (value) {
        case 1:
            return <Dice1/>
        case 2:
            return <Dice2/>
        case 3:
            return <Dice3/>
        case 4:
            return <Dice4/>
        case 5:
            return <Dice5/>
        case 6:
            return <Dice6/>
        default:
            return <Dice0/>
    }
}

const Dice0 = styled(GiPerspectiveDiceSixFacesRandom)`
  color: blueviolet;
  font-size: 100px;
`

const Dice1 = styled(BsFillDice1Fill)`
  color: blueviolet;
  font-size: 100px;
`

const Dice2 = styled(BsFillDice2Fill)`
  color: blueviolet;
  font-size: 100px;
`

const Dice3 = styled(BsFillDice3Fill)`
  color: blueviolet;
  font-size: 100px;
`

const Dice4 = styled(BsFillDice4Fill)`
  color: blueviolet;
  font-size: 100px;
`

const Dice5 = styled(BsFillDice5Fill)`
  color: blueviolet;
  font-size: 100px;
`

const Dice6 = styled(BsFillDice6Fill)`
  color: blueviolet;
  font-size: 100px;
`