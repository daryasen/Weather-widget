import style from './layout.module.css';
import { TchildrenProps } from '../Types/types';


export const Layout = ({ children }: TchildrenProps) => {

    return (
        <div className={style.layout}>
            { children}
        </div>
    )
}