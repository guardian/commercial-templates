
export function formatPrice(price) {
    return `<span>£${price.toFixed(2)}</span>`;
}

export function formatDuration(duration) {
    return `${duration} night${duration > 1 ? 's' : ''}`;
}
