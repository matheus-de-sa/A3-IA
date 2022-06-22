import BeloHorizonte from '../assets/data/BeloHorizonte.json'
import BomJardim from '../assets/data/BomJardim.json'
import Cacador from '../assets/data/Cacador.json'
import Chapeco from '../assets/data/Chapeco.json'
import Curitiba from '../assets/data/Curitiba.json'
import Floripa from '../assets/data/Floripa.json'
import FozIguacu from '../assets/data/FozIguacu.json'
import Maringa from '../assets/data/Maringa.json'
import PortoAlegre from '../assets/data/PortoAlegre.json'
import Rio from '../assets/data/Rio.json'
import SaoJoaquim from '../assets/data/SaoJoaquim.json'
import Vacaria from '../assets/data/Vacaria.json'
import Vitoria from '../assets/data/Vitoria.json'

const db = {
    BeloHorizonte,
    BomJardim,
    Cacador,
    Chapeco,
    Curitiba,
    Floripa,
    FozIguacu,
    Maringa,
    PortoAlegre,
    Rio,
    SaoJoaquim,
    Vacaria,
    Vitoria
}

function readFile(fileName) {
    let file = db[fileName]

    return file
}

export default readFile
