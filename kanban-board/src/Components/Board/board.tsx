import style from './board.module.css';
import { Column } from './Column/column';
import { useGlobalContext } from '../Context/taskContext';



export const Board = () => {

    const {states} = useGlobalContext();
   
    return (
        <div className={style.board}>
            {states.map(
            (state) =>
                <div className={style.column}><Column key={state.id} id={state.id} name={state.name} state={state.state} /></div>
            )}
        </div>
    )
}