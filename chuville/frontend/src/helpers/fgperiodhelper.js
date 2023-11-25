export function getPeriodTerm(fgperiod) {
    let period = ''
    switch (fgperiod) {
        case 1:
            period = 'Manhã'
            break
        case 2:
            period = 'Tarde'
            break
        case 3:
            period = 'Noite'
            break
        case 4:
            period = 'Madrugada'
            break
        default:
            break
    }

    return period
}