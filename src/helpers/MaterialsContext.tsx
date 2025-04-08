/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, SetStateAction,Dispatch} from "react";
import { Unit } from './types';
import { Material } from "./types";
import { useMaterialsState } from "./useMaterialsState";

export type CommonChemical = {
    name: string,
    label: string,
    label_es?: string,
    unit: Unit,
    health_hazard: string,
    fire_hazard: string,
    instability_hazard: string,
    minimumReportableAmount: string
    isDefaultChemical?: boolean
    conversionNote?: string
    conversionNoteEs?: string
}

export type PartialMaterial = Partial<Omit<Material, 'id'>> & Required<Pick<Material, 'id'>> & { isDefaultChemical?: boolean} & { conversionNote?: string} & { conversionNoteEs?: string}

export const MaterialsContext = createContext({
    materials: [] as Array<PartialMaterial>,
    setMaterials:  (() => {}) as Dispatch<SetStateAction<PartialMaterial[]>>,
    collapsedMaterials: [] as boolean[],
    setCollapsedMaterials: (_: boolean[]) => { },
    toggleCollapseState: (_: number, __?: boolean) => { },
    removeMaterial: (_: number) => { },
    appendMaterial: (_: CommonChemical) => { },
    uncollapseIncompleteMaterialsAndThrow: () => [] as Material[]
});

export function MaterialsProvider({ children }: { children: React.ReactNode }) {
    
  const context = useMaterialsState()

    return (
        <MaterialsContext.Provider value={context}>
            {children}
        </MaterialsContext.Provider>
    );
}