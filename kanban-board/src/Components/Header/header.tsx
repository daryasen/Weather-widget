import style from './header.module.css';
import { UserAvatr } from '../Shared/Svg/userAvatar';
import { Rectangle } from '../Shared/Svg/rectangle';
import { ArrowDown } from '../Shared/Svg/arrowDown';
import { ArrowUp } from  '../Shared/Svg/arrowUp';
import { useState } from 'react';

export const Header = () => {
    const [isMenuShown, setIsMenuShown] = useState(true);
    
    return (
        <header className={style.header}>
            <div className={style.positionLogoUserBar}>
                <h1 className={style.sizeLogo}>Awesome Kanban Board</h1>
                <div className={style.userIcon} onClick={() => setIsMenuShown(!isMenuShown)}>
                    <UserAvatr />
                        {!isMenuShown ? 
                        <ArrowUp /> : <ArrowDown />
                        }

                        {!isMenuShown && 
                        <div className={style.wrapperMenu}>
                            <Rectangle />
                                <div className={style.menu}>
                                <div className={style.item_1}>Profile</div>
                                <div className={style.item_2}>Log Out</div>
                            </div>
                        </div>
                        }
                </div>
            </div>
        </header>
    )
}