import {useEffect, useState} from "react";

import InputCurrency from "../InputCurrency/InputCurrency";
import "./Converter.css"


const convertCurrency = (amount, exchangeableRate, resultRate) => {
        return amount / resultRate * exchangeableRate
}

const currencySigns = ["USD", "BYN", "EUR", "PLN", "RUB", "UAH"]


const Converter = () => {
    const [currencyAmountAndType, setCurrencyAmountAndType] = useState({
        type: "USD",
        amount: 100
    });
    const [currency, setCurrency] = useState();

    useEffect(() => {
            const getCurrencyRate = async () => {
                    const data = await fetch('https://cdn.cur.su/api/cbr.json');
                    const result = await data.json();

                    setCurrency(currencySigns.reduce((target, value) => {
                        target[value] = result["rates"][value];
                        return target;
                    } ,{}))

            }
            getCurrencyRate().catch(console.error)

        },
        [])



    const currencyAmounts = {};
    for (let type of currencySigns){
        if(currencyAmountAndType.type === type){
            currencyAmounts[type] = currencyAmountAndType.amount
        }
        else{
            if (currency === undefined){
                currencyAmounts[type] = "";
                continue;
            }
            currencyAmounts[type] = convertCurrency(currencyAmountAndType.amount, currency[type], currency[currencyAmountAndType.type])
        }

    }

    return <div className= "converter">
        <InputCurrency type = "USD" amount={currencyAmounts["USD"]} onCurrencyChange={currencyAmountAndType =>{ setCurrencyAmountAndType(currencyAmountAndType)}}/>
        <InputCurrency type = "BYN" amount={currencyAmounts["BYN"]} onCurrencyChange={currencyAmountAndType =>{ setCurrencyAmountAndType(currencyAmountAndType)}}/>
        <InputCurrency type = "RUB" amount={currencyAmounts["RUB"]} onCurrencyChange={currencyAmountAndType =>{ setCurrencyAmountAndType(currencyAmountAndType)}}/>
        <InputCurrency type = "EUR" amount={currencyAmounts["EUR"]} onCurrencyChange={currencyAmountAndType =>{ setCurrencyAmountAndType(currencyAmountAndType)}}/>
        <InputCurrency type = "PLN" amount={currencyAmounts["PLN"]} onCurrencyChange={currencyAmountAndType =>{ setCurrencyAmountAndType(currencyAmountAndType)}}/>
        <InputCurrency type = "UAH" amount={currencyAmounts["UAH"]} onCurrencyChange={currencyAmountAndType =>{ setCurrencyAmountAndType(currencyAmountAndType)}}/>
    </div>
}

export default Converter;