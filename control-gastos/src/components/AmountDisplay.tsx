import { formatCurrency } from "../helpers"


type AmountDisplayProps = {
    label?:string
    amount:number
}

export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-500 font-thin">
        {label && `${label}: `}
        <span className="font-thin text-black dark:text-white">
            {formatCurrency(amount)}
        </span>
    </p>
    )
}
