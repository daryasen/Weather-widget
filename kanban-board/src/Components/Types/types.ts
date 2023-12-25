import { ReactNode } from "react";


export type TchildrenProps = {
    children: ReactNode;
}

export interface IcardDetailProps {
    onClick?: () => void,
}
 
export interface Istates {
    id: number,
    name?: string,
    state: string,
    description?: string,
}

export interface ImainDatas {
    states: Istates[],
    addTask: (name: string | undefined) => void,
    getTasksByState: (state: string) => Istates[],                    
    removeTask: (id: number) => void,
    moveTask: (id: number, state: string) => void,
    getTasksByExcludedState: (state: string) => Istates[] | undefined,
    updateTask: (item: Istates | undefined) => void,
    getActiveTaskCount: () => number,
    getFinishedTaskCount: () => number,
    getTaskById: (id: number) => Istates | undefined,
    toggleDisabled: (state: string) => boolean | undefined
}
