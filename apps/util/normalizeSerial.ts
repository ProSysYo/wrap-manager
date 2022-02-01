export function normalizeSerial(serial: string) {
    const characterNumber = serial.slice(0, 2)
    const number = serial.slice(2, 6)
    let character: string | null = null
    if (characterNumber==="11") character = "А"
    if (characterNumber==="12") character = "Б"
    if (characterNumber==="13") character = "В"
    if (characterNumber==="14") character = "Г"
    if (characterNumber==="15") character = "Д"
    if (characterNumber==="16") character = "Е"
    if (characterNumber==="17") character = "Ж"
    if (characterNumber==="18") character = "З"
    if (characterNumber==="19") character = "И"
    if (characterNumber==="21") character = "К"
    if (characterNumber==="22") character = "Л"
    if (characterNumber==="23") character = "М"
    if (characterNumber==="24") character = "Н"
    if (characterNumber==="25") character = "О"
    if (characterNumber==="26") character = "П"
    if (characterNumber==="27") character = "Р"
    if (characterNumber==="28") character = "С"
    if (characterNumber==="29") character = "Т"
    if (characterNumber==="30") character = "У"
    if (characterNumber==="31") character = "Ф"
    if (characterNumber==="32") character = "Х"
    if (characterNumber==="33") character = "Ц"
    if (characterNumber==="34") character = "Ч"
    if (characterNumber==="35") character = "Ш"
    if (characterNumber==="38") character = "Ы"
    if (characterNumber==="40") character = "Э"
    if (characterNumber==="41") character = "Ю"
    if (characterNumber==="42") character = "Я"
        
    return character + number
}