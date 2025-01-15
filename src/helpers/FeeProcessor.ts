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
import * as Sentry from '@sentry/react'


const FEES = [130, 260, 390, 520, 650]

const LIQUID_QUANTITIES = [1, 55, 550, 2750, 5000]
const GAS_QUANTITIES = [100, 200, 2000, 10000, 20000]
const SOLID_QUANTITIES = [1, 250, 2500, 12500, 250000]
const ESS_QUANTITIES = [1, 250, 2500, 125000, 250000]



function hazardFee(hazardType: hazardType, quantity: number) {
    let fee = 0;

    const feeSchedule =
        hazardType === "healthLiquid" ? LIQUID_QUANTITIES :
            hazardType === "fireLiquid" ? LIQUID_QUANTITIES :
                hazardType === "instabilityLiquid" ? LIQUID_QUANTITIES :
                    hazardType === "healthGas" ? GAS_QUANTITIES :
                        hazardType === "fireGas" ? GAS_QUANTITIES :
                            hazardType === "instabilityGas" ? GAS_QUANTITIES :
                                hazardType === "healthSolid" ? SOLID_QUANTITIES :
                                    hazardType === "fireSolid" ? SOLID_QUANTITIES :
                                        hazardType === "instabilitySolid" ? SOLID_QUANTITIES :
                                            hazardType === "ESS" ? ESS_QUANTITIES : null;

    if (!feeSchedule) {
        throw new Error(`Invalid hazard type: "${hazardType}"`);
    }

    for (let i = 0; i < feeSchedule.length; i++) {
        if (quantity >= feeSchedule[i]) {
            fee = FEES[i];
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

export type Unit = "gallons" | "cubic_feet" | "pounds" | "kilowatt_hours";

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
        Sentry.setContext('fees', calculatedFees);
        setFees(calculatedFees);
        return calculatedFees;
    }

    return { fees, calculateFees };
}