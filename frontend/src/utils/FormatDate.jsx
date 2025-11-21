export function FormatDate(dateString) {
    if (!dateString) return ''
    
    const [year, month] = dateString.split('-')
    const monthNames = {
        '01': 'jan', '02': 'fev', '03': 'mar', '04': 'abr',
        '05': 'mai', '06': 'jun', '07': 'jul', '08': 'ago',
        '09': 'set', '10': 'out', '11': 'nov', '12': 'dez'
    };
    
    return `${monthNames[month]}-${year}`
}