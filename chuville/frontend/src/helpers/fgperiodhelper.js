export function getPeriodTerm(fgperiod) {
    let period = '';
    switch (fgperiod) {
        case 0:
            period = 'Manhã';
            break;
        case 1:
            period = 'Tarde';
            break;
        case 2:
            period = 'Noite';
            break
        case 3:
            period = 'Madrugada';
            break
        default:
            break;
    }

    return period;
};