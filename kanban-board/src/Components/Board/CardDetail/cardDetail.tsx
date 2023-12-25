import style from './cardDetail.module.css'
import { SvgCross } from '../../Shared/Svg/svgCross';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/taskContext';
import { Istates } from '../../Types/types';
import { IcardDetailProps } from '../../Types/types';



export const CardDetail = ({ onClick }: IcardDetailProps) => {
    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);

    const {getTaskById, updateTask} = useGlobalContext();
    const {cardId} = useParams();
    const [task, setTask] = useState<Istates>();
    
    useEffect(() => {
        if (cardId) {
            setTask(getTaskById(Number(cardId)))
        }
    }, [getTaskById, cardId])

    return (
        <div className={style.containerDetail}>
            <div className={style.windowDetail}>
                <div className={style.wrapperTextArea}>
                    {task && 
                        <>
                            <textarea className={style.name} value={task.name} data-testid="name-label-caption" onChange={(e) =>
                                setTask({
                                    ...task,
                                    name: e.target.value
                        })}
                            ></textarea>
                    
                            <textarea placeholder='This task has no description' className={style.description} value={task.description} onChange={(e) =>
                                setTask({
                                    ...task,
                                    description: e.target.value
                        })}
                            ></textarea>
                        </>}
                    <button className={style.buttonSave} onClick={() => {
                    updateTask(task);
                    navigateBack();
                }}>Save Card</button>
                </div>
                <div>
                    <button className={style.cross} onClick={navigateBack}>
                        <SvgCross />
                    </button>
                </div>
            </div>
        </div>
    )
}