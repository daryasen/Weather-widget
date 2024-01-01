import style from './footer.module.css';
import { useGlobalContext } from '../Context/taskContext';


export const Footer = () => {
    const {getActiveTaskCount, getFinishedTaskCount} = useGlobalContext();

    return (
        <footer className={style.footer}>
            <div className={style.areaInfo}>
                <div className={style.tasksCount}>
                    <div>Active tasks: {getActiveTaskCount()}</div>
                    <div>Finished tasks: {getFinishedTaskCount()}</div>
                </div>
                <div>Kanban board by Andrei, 2023</div>
            </div>
        </footer>
    )
}