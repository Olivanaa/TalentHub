export function FormatDate(dateString, showCurrentAs = 'Atual') {
    if (!dateString) return ''
    if (dateString === 'Atual') return showCurrentAs

    const [year, month] = dateString.split('-')
    const monthNames = {
        '01': 'jan', '02': 'fev', '03': 'mar', '04': 'abr',
        '05': 'mai', '06': 'jun', '07': 'jul', '08': 'ago',
        '09': 'set', '10': 'out', '11': 'nov', '12': 'dez'
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
    
    if (year === currentYear.toString() && month === currentMonth) {
        return showCurrentAs
    }

    return `${monthNames[month]}-${year}`
}