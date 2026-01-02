import { useState } from "react";
import { CommonChemical, PartialMaterial } from "./MaterialsContext";
import { Material } from "./types";

export class IncompleteMaterialsError extends Error {
    constructor() {
        super('Incomplete materials');
        this.name = 'IncompleteMaterials';
    }
}

export function useMaterialsState() {
    const [materials, setMaterials] = useState([] as Array<PartialMaterial>);
    const [collapsedMaterials, setCollapsedMaterials] = useState<boolean[]>([]);

    const toggleCollapseState = (index: number, forceOpen?: boolean) => {
        setCollapsedMaterials(collapsedMaterials.map((isCollapsed, i) => i === index ? (forceOpen !== undefined ? !forceOpen : !isCollapsed) : isCollapsed));
    };

    const removeMaterial = (id: number) => {
        setMaterials(materials.filter(material => material.id !== id));
        setCollapsedMaterials(collapsedMaterials.filter((_, i) => i !== materials.findIndex(material => material.id === id)));
    };

    const appendMaterial = (material: CommonChemical) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { minimumReportableAmount, name, label, ...mat } = material;
        setMaterials([...materials, { id: Date.now(), ...{ name: label, ...mat } }]);
        setCollapsedMaterials(Array(collapsedMaterials.length).fill(true).concat(false));
    };

    const getIncompleteFieldsCount = (material: PartialMaterial) => {
        const requiredFields: (keyof Material)[] = ['name', 'location', 'health_hazard', 'fire_hazard', 'instability_hazard'];
        const missingFields = requiredFields.filter(field => !material[field]).length;
        const quantityMissing = !material.quantity || material.quantity === "0" ? 1 : 0;
        return missingFields + quantityMissing;
    };

    const getIncorrectHazardValuesCount = (material: PartialMaterial) => {
        let incorrectCount = 0;
        const hazardFields: (keyof Material)[] = ['health_hazard', 'fire_hazard', 'instability_hazard'];
        hazardFields.forEach(field => {
            const value = material[field];
            if (value === undefined || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 4) {
                incorrectCount += 1;
            }
        });
        return incorrectCount;
    };


    const uncollapseIncompleteMaterialsAndThrow = () => {
        materials.forEach((material, index) => {
            if (getIncompleteFieldsCount(material) > 0) {
                toggleCollapseState(index, true);
            }
            if (getIncorrectHazardValuesCount(material) > 0) {
                toggleCollapseState(index, true);
            }
        });
        if (materials.some(mat => getIncompleteFieldsCount(mat)+getIncorrectHazardValuesCount(mat) > 0)) {
            throw new IncompleteMaterialsError();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return materials.map(({isDefaultChemical, conversionNote, ...m})=>(m)) as Material[]
    };

    return { materials, setMaterials, collapsedMaterials, setCollapsedMaterials, toggleCollapseState, removeMaterial, appendMaterial, uncollapseIncompleteMaterialsAndThrow }
}