import styles from "./NumberInput.module.scss";
import MinusIcon from "public/img/svg/minus.svg";
import PlusIcon from "public/img/svg/plus.svg";
import Image from "next/image";


type NumberInputProps = {
    value: number,
    handleChange: (value: number) => void,
}

export default function NumberInput (props: NumberInputProps) {
    const {value, handleChange} = props;
    const handlePlus = () => {
        handleChange(value + 1);
    }

    const handleMinus = () => {
        handleChange(value - 1);
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(Number(e.target.value));
    }

    return <div className={styles.NumberInput}>
        <button onClick={handleMinus}><Image src={MinusIcon} alt={"-"} fill={true}/></button>
        <input type={"number"} value={value} onInput={handleInput}/>
        <button onClick={handlePlus}><Image src={PlusIcon} alt={"+"} fill={true}/></button>
    </div>
}