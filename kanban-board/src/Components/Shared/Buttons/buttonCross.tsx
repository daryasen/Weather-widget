import style from './buttonCross.module.css';
import { TchildrenProps } from '../../Types/types';


export const ButtonCross = ({ children }: TchildrenProps) => {

    return (
        <button className={style.button}>
            { children }
        </button>
    )
}