import { Material } from './MaterialsContext';

export function verifyFormData(data: { materials: Material[] }) {
    const errors: string[] = [];

    data.materials.forEach((material, index) => {
        if (!material.name || typeof material.name !== 'string') {
            errors.push(`Material at index ${index} is missing a valid name.`);
        }
        if (!material.location || typeof material.location !== 'string') {
            errors.push(`Material at index ${index} is missing a valid location.`);
        }
        if (typeof material.health_hazard === 'undefined' || isNaN(Number(material.health_hazard)) || Number(material.health_hazard) < 0 || Number(material.health_hazard) > 4) {
            errors.push(`Material at index ${index} has an invalid health hazard rating.`);
        }
        if (typeof material.fire_hazard === 'undefined' || isNaN(Number(material.fire_hazard)) || Number(material.fire_hazard) < 0 || Number(material.fire_hazard) > 4) {
            errors.push(`Material at index ${index} has an invalid fire hazard rating.`);
        }
        if (typeof material.instability_hazard === 'undefined' || isNaN(Number(material.instability_hazard)) || Number(material.instability_hazard) < 0 || Number(material.instability_hazard) > 4) {
            errors.push(`Material at index ${index} has an invalid instability hazard rating.`);
        }
        if (!material.unit || !['gallons', 'cubic_feet', 'pounds', 'kilograms'].includes(material.unit)) {
            errors.push(`Material at index ${index} has an invalid unit.`);
        }
        if (typeof material.quantity === 'undefined' || isNaN(Number(material.quantity)) || Number(material.quantity) <= 0) {
            errors.push(`Material at index ${index} has an invalid quantity.`);
        }
    });

    return errors;
}
