const priceSpacer = (price) => {
    return price?.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
}

export default priceSpacer