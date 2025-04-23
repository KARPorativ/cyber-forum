export function convertDate(dateString: string) {
    const [year, month, day] = dateString.split('T')[0].split('-');

    return `${day}.${month}.${year}`;
}