import style from './column.module.css';
import { Card } from './Card/card';
import { Istates } from '../../Types/types';
import { useGlobalContext } from '../../Context/taskContext';
import { useState } from 'react';
import React, { ChangeEvent } from 'react';


export const Column = ({ name, state }: Istates ) => {
    const [isNewTaskInputShown, setIsNewTaskInputShown] = useState<boolean>(false);
    const [inputCardName, setInputCardName] = useState<string>();

    const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState<boolean>(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string>();
   
    const {addTask, getTasksByState,  moveTask, getTasksByExcludedState, toggleDisabled} = useGlobalContext();
    
    const tasks = getTasksByState(state);
    const hasTask = tasks.length > 0;

    const onInputCard = (e: ChangeEvent<HTMLInputElement>) => {
        setInputCardName(e.target.value);
    }
    
    return (
        <div className={style.column}> 
            <div className={style.header}><h2 className={style.title}>{name}</h2></div>
            <div className={style.wrapper + ' ' + style.scroll}>
                <div className={style.body}>
                    {hasTask && 
                        tasks.map((task) => <Card key={task.id} id={task.id} name={task.name} state={task.state} />)
                        }
                    {isNewTaskInputShown &&  
                    <div>                                                             
                        <input className={style.input} onInput={onInputCard} />
                    </div>
                    }
                    {isNewTaskSelectShown &&
                    <select className={style.select} onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setSelectedTaskId(e.target.value)}
                    >
                        <option>Select task to add in "{name}"</option>
                        {getTasksByExcludedState(state)?.map((task) =>
                            <option key={task.id} value={task.id}>{task.name}</option>
                        )}
                    </select>
                    }
                </div>
            </div>
            <div className={style.footer}>
                {(!isNewTaskInputShown && !isNewTaskSelectShown) && 
                    <button className={style.buttonAdd} disabled={toggleDisabled(state)} onClick={() => 
                        {if(state === 'backlog'){
                            setIsNewTaskInputShown(true)
                        }else{
                            setIsNewTaskSelectShown(true)
                        }
                    }}>+ Add card</button>}  
                      
                {(isNewTaskInputShown || isNewTaskSelectShown) &&
                <button className={style.buttonSub} onClick={() => {
                    if (state === 'backlog' && inputCardName) {
                        setIsNewTaskInputShown(false);
                        addTask(inputCardName);                  //передаем аргумент название задачи
                        setInputCardName(undefined);
                    } else {
                        setIsNewTaskInputShown(false);
                        setIsNewTaskSelectShown(false);
                        moveTask(Number(selectedTaskId), state);   //передаем аргумент значение селекта как id и state
                    }
                    }}>Submit</button>}

                {(isNewTaskInputShown || isNewTaskSelectShown) && 
                <button className={style.buttonCancel} onClick={() =>
                        state === 'backlog'
                            ? setIsNewTaskInputShown(false)
                            : setIsNewTaskSelectShown(false)
                    }>Cancel</button>}
            </div>
        </div>
    )
}