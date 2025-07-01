import isEmpty from "is-empty"

/** 
 * Calculate Liquidity Price
 */
export const calculateLiquidityPrice = ({ price, leverage, maintMargin, type }) => {
    try {
        let liqPrice = 0
        if (type == "long") {
            liqPrice = parseFloat(price) - ((parseFloat(price) * (parseFloat(maintMargin) / 100)) / parseFloat(leverage))
        } else {
            liqPrice = parseFloat(price) + ((parseFloat(price) * (parseFloat(maintMargin) / 100)) / parseFloat(leverage))
        }
        return liqPrice
    } catch (err) {
        console.log(err, "liqPrice__err")
        return 0
    }
}


export const MarginOrderCost = ({ price, quantity, leverage, side }) => {
    try {
        let orderCost = 0
        if (side == 'long') {
            orderCost = parseFloat(quantity) * parseFloat(price) / leverage
        } else if (side == 'short') {
            orderCost = parseFloat(quantity) / leverage
        }
        return orderCost
    } catch (err) {
        console.log(err, 'OrderCost__err')
        return 0
    }
}

export const DerivativeOrderCost = ({ price, quantity, leverage }) => {
    try {
        let orderCost = parseFloat(quantity) * parseFloat(price) / leverage
        return orderCost
    } catch (err) {
        console.log(err, 'OrderCost__err')
        return 0
    }
}


export const getPorfitCalculation = (entryPrice, closePrice, quantity, positionSide) => {
    try {
        let profit = 0
        if (positionSide == 'short') {
            profit = (parseFloat(entryPrice) - parseFloat(closePrice)) * quantity
        } else {
            profit = (parseFloat(closePrice) - parseFloat(entryPrice)) * quantity
        }
        return profit
    } catch (err) {
        console.log("getPorfitCalculation_err", err)
        return 0
    }
}

export const ConvertingAmount = (base, convert, amount, priceConversion) => {
    try {
        let convertAmount = 0
        let convertData = priceConversion.find((val) => (val.firstCurrency == base && val.secondCurrency == convert))
        console.log(convertData, 'ConvertingAmount')
        if (isEmpty(convertData)) {
            convertData = priceConversion.find((val) => (val.secondCurrency == base && val.firstCurrency == convert))
            convertAmount = (1 / parseFloat(convertData.price)) * parseFloat(amount)
            return convertAmount
        }
        convertAmount = parseFloat(convertData.price) * parseFloat(amount)
        return convertAmount
    } catch (err) {
        console.log(err, 'PriceConversion__err')
        return amount
    }
}



export const toCutOff = (value, decimal = 6) => {
    try {
        // console.log("toCutOfftoCutOff",value, decimal);
        value = parseFloat(value)
        decimal = parseFloat(decimal)
        const factor = Math.pow(10, decimal);
        const result = Math.floor(value * factor) / factor;
        console.log('toCutOff', result)
        if (result == 0) {
            return Number(result).toPrecision(decimal + 1)
        }
        return result
    } catch (err) {
        console.log(err, 'CutOf__err')
        return value
    }
}