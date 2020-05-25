export const capitalize = (word: string) => {
    const firstLetter = word[0]
    return firstLetter.toUpperCase() + word.substr(1)
}

export const decimalToPercent = (num: number) => {
    return (num * 100).toPrecision(2) + "%"
}

export const snakeCase = (name: string) => {
    return name
        .split(" ")
        .map((s) => s.toLowerCase())
        .join("_")
}
