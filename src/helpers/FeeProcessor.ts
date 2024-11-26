/**  UPDATING FEES!
 * 
 * Below you can update the fees by modifying the arrays below.
 * 
 * The fees array below determines the fees when a certain quantity is reached set by the {state}_FEES arrays.
 * 
 * EXAMPLE: 
 *  I want to increase the fees by 100 for each state. I would add 100 to each value in the FEES array.
 * 
 * EXAMPLE:
 * I want to decrease the quantity required to reach the next fee by 10 for each state. 
 * I would subtract 10 from each value in the {state}_FEES arrays.
 * 
 * 
*/

const FEES = [130, 260, 390, 520, 650]

const LIQUID_FEES = [1, 55, 550, 2750, 5000]
const GAS_FEES = [100, 200, 2000, 10000, 20000]
const SOLID_FEES = [1, 250, 2500, 12500, 250000]
const ESS_FEES = [1, 250, 2500, 125000, 250000]



function hazardFee(state: ValidStates, quantity: number) {
    let feeSchedule;
    let fee = 0;

    switch (state) {
        case "liquid":
            feeSchedule = LIQUID_FEES;
            break;
        case "gas":
            feeSchedule = GAS_FEES;
            break;
        case "solid":
            feeSchedule = SOLID_FEES;
            break;
        case "ESS":
            feeSchedule = ESS_FEES;
            break;
        default:
            throw new Error("state is malformed");
    }

    for (let i = 0; i < feeSchedule.length; i++) {
        if (quantity >= feeSchedule[i]) {
            fee = FEES[i];
            break;
        }
    }

    return fee;
}

type hazardCategories = "health" | "fire" | "instability";

function getCurrentHazardType(health: number, fire: number, instability: number): hazardCategories {
    if (fire >= health && fire >= instability) {
        return "fire";
    } else if (health >= instability) {
        return "health";
    } else {
        return "instability";
    }
}

type Material = {
    health_hazard: string,
    fire_hazard: string,
    instability_hazard: string,
    units: "gallons" | "cubic_feet" | "pounds" | "kilowatt_hours",
    quantity: string
}

type ConvertedMaterial = {
    health_hazard: number,
    fire_hazard: number,
    instability_hazard: number,
    quantity: number,
    state: ValidStates
}

type ValidStates = "liquid" | "gas" | "solid" | "ESS";

function convertAndVerifyMaterial(material: Material): ConvertedMaterial {
    const units = material.units;
    const health_hazard = parseInt(material.health_hazard);
    const fire_hazard = parseInt(material.fire_hazard);
    const instability_hazard = parseInt(material.instability_hazard);
    const quantity = parseFloat(material.quantity);

    const state =
        units === "gallons" ? "liquid" :
            units === "cubic_feet" ? "gas" :
                units === "pounds" ? "solid" :
                    units === "kilowatt_hours" ? "ESS" :
                        null;

    if (!state) {
        throw new Error(`Invalid units: ${units}. Expected one of: gallons, cubic_feet, pounds, kilowatt_hours`);
    }

    if (isNaN(health_hazard) || isNaN(fire_hazard) || isNaN(instability_hazard) || isNaN(quantity)) {
        throw new Error("Invalid material data: conversion resulted in NaN");
    }

    return {
        health_hazard,
        fire_hazard,
        instability_hazard,
        quantity,
        state
    };
}

type hazardType = "healthLiquid" | "fireLiquid" | "instabilityLiquid" | "healthGas" | "fireGas" | "instabilityGas" | "healthSolid" | "fireSolid" | "instabilitySolid" | "ESS";

export function FeeProcessor(materials: Material[]) {
    const processor = {
        aggregateAmounts: {
            healthLiquid: 0,
            fireLiquid: 0,
            instabilityLiquid: 0,
            healthGas: 0,
            fireGas: 0,
            instabilityGas: 0,
            healthSolid: 0,
            fireSolid: 0,
            instabilitySolid: 0,
            ESS: 0,
        },
        fees: {
            healthLiquid: 0,
            fireLiquid: 0,
            instabilityLiquid: 0,
            healthGas: 0,
            fireGas: 0,
            instabilityGas: 0,
            healthSolid: 0,
            fireSolid: 0,
            instabilitySolid: 0,
            ESS: 0,
        },
        total: 0,
    };

    materials.forEach(material => {
        const { health_hazard, fire_hazard, instability_hazard, quantity, state } = convertAndVerifyMaterial(material);

        const hazardType = getCurrentHazardType(health_hazard, fire_hazard, instability_hazard);
        const key = getKey(hazardType, state);
        processor.aggregateAmounts[key] += quantity;
        processor.fees[key] += hazardFee(state, quantity);
    });

    processor.total = Object.values(processor.fees).reduce((acc, fee) => acc + fee, 0);


    return processor;
}

function getKey(hazardType: hazardCategories, state: ValidStates) {
    return `${hazardType}${state.charAt(0).toUpperCase() + state.slice(1)}` as hazardType;
}