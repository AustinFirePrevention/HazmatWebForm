import { describe, it, expect } from 'vitest';
import { FeeProcessor, Material } from '../src/helpers/FeeProcessor';

describe('FeeProcessor', () => {
    it('No Materials should generate no fees', () => {
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

        const materials: Material[] = [];

        const result = FeeProcessor(materials);
        expect(result).toEqual(processor);
    });

    it('Should generate correctly 1', () => {
        const expected = {
            aggregateAmounts: {
                healthLiquid: 0,
                fireLiquid: 100,
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
                fireLiquid: 260,
                instabilityLiquid: 0,
                healthGas: 0,
                fireGas: 0,
                instabilityGas: 0,
                healthSolid: 0,
                fireSolid: 0,
                instabilitySolid: 0,
                ESS: 0,
            },
            total: 260,
        };

        const materials = [{
            health_hazard: "1",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "gallons",
            quantity: "100"
        }] as Material[];

        const result = FeeProcessor(materials);
        expect(result).toEqual(expected);
    });

    it('Should generate correctly 2', () => {
        const expected = {
            aggregateAmounts: {
                healthLiquid: 50,
                fireLiquid: 50,
                instabilityLiquid: 50,
                healthGas: 100,
                fireGas: 100,
                instabilityGas: 100,
                healthSolid: 50,
                fireSolid: 50,
                instabilitySolid: 50,
                ESS: 0,
            },
            fees: {
                healthLiquid: 130,
                fireLiquid: 130,
                instabilityLiquid: 130,
                healthGas: 130,
                fireGas: 130,
                instabilityGas: 130,
                healthSolid: 130,
                fireSolid: 130,
                instabilitySolid: 130,
                ESS: 0,
            },
            total: 1170,
        };

        const materials = [{
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "gallons",
            quantity: "50"
        }, {
            health_hazard: "1",
            fire_hazard: "2",
            instability_hazard: "1",
            unit: "gallons",
            quantity: "50"
        }, {
            health_hazard: "1",
            fire_hazard: "1",
            instability_hazard: "2",
            unit: "gallons",
            quantity: "50"
        }, {
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "cubic_feet",
            quantity: "100"
        }, {
            health_hazard: "1",
            fire_hazard: "2",
            instability_hazard: "1",
            unit: "cubic_feet",
            quantity: "100"
        }, {
            health_hazard: "1",
            fire_hazard: "1",
            instability_hazard: "2",
            unit: "cubic_feet",
            quantity: "100"
        }, {
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "pounds",
            quantity: "50"
        }, {
            health_hazard: "1",
            fire_hazard: "2",
            instability_hazard: "1",
            unit: "pounds",
            quantity: "50"
        }, {
            health_hazard: "1",
            fire_hazard: "1",
            instability_hazard: "2",
            unit: "pounds",
            quantity: "50"
        }] as Material[];

        const result = FeeProcessor(materials);
        expect(result).toEqual(expected);
    });

    it('Should generate correctly 3', () => {
        const expected = {
            aggregateAmounts: {
                healthLiquid: 300,
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
                healthLiquid: 260,
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
            total: 260,
        };

        const materials = [{
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "gallons",
            quantity: "100"
        }, {
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "gallons",
            quantity: "100"
        }, {
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "1",
            unit: "gallons",
            quantity: "100"
        }] as Material[];

        const result = FeeProcessor(materials);
        expect(result).toEqual(expected);
    });

    it('Should not need hazard ratings for ESS', () => {
        const expected = {
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
                ESS: 200,
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
                ESS: 130,
            },
            total: 130,
        };

        const materials = [{
            unit: "kilowatt_hours",
            quantity: "100"
        }, {
            health_hazard: "aoeu",
            fire_hazard: "aoeu",
            instability_hazard: "11516",
            unit: "kilowatt_hours",
            quantity: "100"
        }] as Material[];

        const result = FeeProcessor(materials);
        expect(result).toEqual(expected);
    });

    it('should throw an error for invalid material units', () => {
        const materials = [{
            health_hazard: "10",
            fire_hazard: "20",
            instability_hazard: "5",
            unit: "liters",
            quantity: "100"
        }] as unknown as Material[];

        expect(() => FeeProcessor(materials)).toThrowError('Invalid units: liters. Expected one of: gallons, cubic_feet, pounds, kilowatt_hours');
    });

    it('should throw an error for invalid material data', () => {
        const materials = [{
            health_hazard: "abc",
            fire_hazard: "20",
            instability_hazard: "5",
            unit: "gallons",
            quantity: "100"
        }] as Material[];

        expect(() => FeeProcessor(materials)).toThrowError('Invalid material data: conversion resulted in NaN');
    });
});
