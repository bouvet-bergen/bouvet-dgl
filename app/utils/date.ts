export function formatDate(date: string): string{
    const newDate = new Date(date); 
    return new Intl.DateTimeFormat('no-NB').format(newDate); 
}