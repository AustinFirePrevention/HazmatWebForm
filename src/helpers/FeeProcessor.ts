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

import { useState } from "react"
import { ApplicationType } from "../components/PermitDetails"
import { useMaterials } from "./MaterialsContext"
import { Unit } from "./types"


const FEES = [130, 260, 390, 520, 650]

const LIQUID_QUANTITIES = [1, 55, 550, 2750, 5000]
const GAS_QUANTITIES = [100, 200, 2000, 10000, 20000]
const SOLID_QUANTITIES = [1, 250, 2500, 12500, 250000]
const ESS_QUANTITIES = [1, 250, 2500, 125000, 250000]



/**
 * Calculate the fee for one hazard type.
 * @param {hazardType} hazardType - The type of hazard.
 * @param {number} quantity - The quantity of the material.
 * @returns {number} - The calculated fee.
 */
function hazardFee(hazardType: hazardType, quantity: number) {
    let fee = 0;

    const quantities = hazardType.includes('Liquid') ? LIQUID_QUANTITIES :
        hazardType.includes('Gas') ? GAS_QUANTITIES :
        hazardType.includes('Solid') ? SOLID_QUANTITIES :
        hazardType === 'ESS' ? ESS_QUANTITIES : null;

    if (!quantities) {
        throw new Error(`Invalid hazard type: "${hazardType}"`);
    }

    for (let i = 0; i < quantities.length; i++) {
        if (quantity >= quantities[i]) {
            fee = FEES[i];
        }
    }
    return fee;
}

type hazardCategories = "health" | "fire" | "instability";

/**
 * Determine the current hazard type based on health, fire, and instability values.
 * @param {number} health - The health hazard value.
 * @param {number} fire - The fire hazard value.
 * @param {number} instability - The instability hazard value.
 * @returns {hazardCategories} - The current hazard type.
 */
function getCurrentHazardType(health: number, fire: number, instability: number): hazardCategories {
    if (fire >= health && fire >= instability) {
        return "fire";
    } else if (health >= instability) {
        return "health";
    } else {
        return "instability";
    }
}


export type Material = {
    health_hazard: string,
    fire_hazard: string,
    instability_hazard: string,
    unit: Unit,
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

/**
 * Convert and verify the material data.
 * @param {Material} material - The material data.
 * @returns {ConvertedMaterial} - The converted and verified material data.
 * @throws Will throw an error if the units are invalid or if the conversion results in NaN.
 */
function convertAndVerifyMaterial(material: Material): ConvertedMaterial {
    const units = material.unit;
    const health_hazard = parseInt(material.health_hazard);
    const fire_hazard = parseInt(material.fire_hazard);
    const instability_hazard = parseInt(material.instability_hazard);
    const quantity = parseFloat(material.quantity);

    const state =
        units === "gallons" ? "liquid" :
            units === "cubic_feet" ? "gas" :
                units === "pounds" ? "solid" :
                    units === "kilowatt_hours" ? "ESS" : null;

    if (!state) {
        throw new Error(`Invalid units: ${units}. Expected one of: gallons, cubic_feet, pounds, kilowatt_hours`);
    }

    if (isNaN(health_hazard) || isNaN(fire_hazard) || isNaN(instability_hazard) || isNaN(quantity)) {
        if (state !== "ESS") {
            throw new Error("Invalid material data: conversion resulted in NaN");
        }
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

/**
 * Process the fees for the given materials.
 * @param {Material[]} materials - The list of materials.
 * @returns {FeeAggregate} - The processed fee aggregate.
 */
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

    });

    Object.entries(processor.aggregateAmounts).forEach(([key, quantity]) => {

        processor.fees[key as hazardType] = hazardFee(key as hazardType, quantity);
    });

    processor.total = Object.values(processor.fees).reduce((acc, fee) => acc + fee, 0);

    return processor;
}

/**
 * Get the key for the hazard type and state.
 * @param {hazardCategories} hazardType - The hazard type.
 * @param {ValidStates} state - The state of the material.
 * @returns {hazardType} - The key for the hazard type and state.
 */
function getKey(hazardType: hazardCategories, state: ValidStates) {
    return state === "ESS" ? "ESS" : `${hazardType}${state.charAt(0).toUpperCase() + state.slice(1)}` as hazardType;
}

export type FeeAggregate = {
    aggregateAmounts: {
        healthLiquid: number,
        fireLiquid: number,
        instabilityLiquid: number,
        healthGas: number,
        fireGas: number,
        instabilityGas: number,
        healthSolid: number,
        fireSolid: number,
        instabilitySolid: number,
        ESS: number,
    },
    fees: {
        healthLiquid: number,
        fireLiquid: number,
        instabilityLiquid: number,
        healthGas: number,
        fireGas: number,
        instabilityGas: number,
        healthSolid: number,
        fireSolid: number,
        instabilitySolid: number,
        ESS: number,
    },
    total: number,
}

/**
 * Custom hook to use fees in a component.
 * @returns {{ fees: FeeAggregate, calculateFees: (applicationType: ApplicationType) => FeeAggregate }} - The fees and a function to calculate fees.
 */
export function useFees(): { fees: FeeAggregate, calculateFees: (applicationType: ApplicationType) => (FeeAggregate) } {
    const defaultFees = {
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
    const [fees, setFees] = useState(defaultFees);
    const { materials } = useMaterials();


    const calculateFees = (applicationType: ApplicationType) => {

        const calculatedFees = applicationType === 'renewal_no_change' ? defaultFees : FeeProcessor(materials as Required<Material>[]);
        setFees(calculatedFees);
        return calculatedFees;
    }

    return { fees, calculateFees };
}