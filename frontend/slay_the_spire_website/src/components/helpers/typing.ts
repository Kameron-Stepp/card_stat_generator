export type Character = {
    name: string,
    color: string,
    src: string
}


export type Run = {
    won: number,
    floor_reached: number,
    run_time_seconds: number,
    ascension: number
}

export type RunHistoryProps = {
    runs: Run[],
}

export type Card = {
    card_name: string,
    times_picked: number,
    times_skipped: number,
    deck_wins: number,
    deck_losses: number
}

export type RunData = {
    wins: number,
    losses: number,
    runs: number,
    avg_time: number,
}

export const DISPLAY_OPTION = Object.freeze({
    GENERAL: "General",
    ENEMIES: "Enemies",
    CARD_DETAILS: "Card Details",
    RUN_DETAILS: "Run Details"
})