import fs from 'fs'
import BomJardim from '../assets/data/BomJardim.json'
import Curitiba from '../assets/data/Curitiba.json'
import Floripa from '../assets/data/Floripa.json'
import PortoAlegre from '../assets/data/PortoAlegre.json'

const db = {
    BomJardim,
    Curitiba,
    Floripa,
    PortoAlegre
}

function readFile(fileName) {

    let file = db[fileName]

    return file
}

export default readFile
