export function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function file_format(cardName: string) {
    const fileName = cardName
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toLowerCase();

    return `spire_assets/cards/${fileName}.webp`;
}