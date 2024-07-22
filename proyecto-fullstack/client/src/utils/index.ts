export function formatCurrency(value:number) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(value)
}

export function toBoolean(str:string) {
    return str.toLowerCase() === 'true'
}