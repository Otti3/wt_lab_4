import './InputCurrency.css'

const InputCurrency = ({amount, onCurrencyChange, type}) => {
    return <div className="currency">
        <span className="currency-type">{type}</span>
        <input className="currency__input"
            type="number"
            value = {amount}
            onChange={e => onCurrencyChange({
                amount: e.target.value,
                type
            })}/>
    </div>
}

export default InputCurrency;

