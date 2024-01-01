import React, { MouseEvent } from 'react'; 
import style from './card.module.css';
import { SvgCross } from '../../../Shared/Svg/svgCross';
import { Istates } from '../../../Types/types';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../../Context/taskContext';


export const Card = ({ id, name }: Istates) => {
    const navigate = useNavigate();
    const {removeTask} = useGlobalContext();

    return (
        <>
            <div className={style.card}>
                <div className={style.fillFieldTask} onClick={() => navigate(`/tasks/${id}`)}><span className={style.textCard}>{name}</span></div>
                <div className={style.crossButtonDispleyd}>
                    <button className={style.button} onClick={
                        (e: MouseEvent<HTMLButtonElement>) => {
                            removeTask(id); 
                            e.stopPropagation()}
                        }>
                        <SvgCross />
                    </button>
                </div>
            </div>
        </>
    )
}