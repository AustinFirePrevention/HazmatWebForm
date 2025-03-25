import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processForm, FormProcessingOptions, ProcessedFormData } from '../src/helpers/processForm';
import type { Material, ProcessedFile, Fees } from '../src/helpers/types';
import type { Schema } from 'yup';

// Mock validation schema
const mockValidationSchema = {
  validate: vi.fn().mockImplementation((data) => Promise.resolve(data))
} as unknown as Schema<ProcessedFormData>;

// Mock calculateFees function
const mockCalculateFees = vi.fn().mockReturnValue({
  aggregateAmounts: {
    healthLiquid: 100,
    fireLiquid: 200,
    instabilityLiquid: 300,
    healthGas: 0,
    fireGas: 0,
    instabilityGas: 0,
    healthSolid: 0,
    fireSolid: 0,
    instabilitySolid: 0,
    ESS: 0
  },
  fees: {
    healthLiquid: 130,
    fireLiquid: 260,
    instabilityLiquid: 390,
    healthGas: 0,
    fireGas: 0,
    instabilityGas: 0,
    healthSolid: 0,
    fireSolid: 0,
    instabilitySolid: 0,
    ESS: 0
  },
  total: 780
});

// Test Data
const mockMaterial: Material = {
  id: 1,
  name: "Test Material",
  unit: "gallons",
  health_hazard: "2",
  fire_hazard: "1",
  instability_hazard: "0",
  quantity: "100",
  location: "Building A"
};

const createMockFile = (name: string, type: string, content = 'test-content') => {
  return new File([content], name, { type });
};

const createFormData = (data: Record<string, string>) => {
  const form = document.createElement('form');
  Object.entries(data).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  return form;
};

// Type guard functions
function isProcessedFile(value: unknown): value is ProcessedFile {
  return !!value && typeof value === 'object' && 'name' in value && 'content' in value;
}

function isFees(value: unknown): value is Fees {
  return !!value && typeof value === 'object' && 'total' in value;
}

describe('processForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Form Processing', () => {
    it('processes basic form data correctly', async () => {
      const formElement = createFormData({
        business_name: 'Test Business',
        address: '123 Test St',
        city: 'Test City',
        state: 'TX',
        zip: '12345'
      });

      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        {},
        [],
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      expect(result.business_name).toBe('Test Business');
      expect(result.zip).toBe('12345');
      expect(mockValidationSchema.validate).toHaveBeenCalled();
    });

    it('handles empty form data', async () => {
      const formElement = createFormData({});
      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        {},
        [],
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      expect(result.fees).toBeDefined();
      expect(result.materials).toEqual([]);
    });

    it('removes material fields from form data', async () => {
      // Create form with both material and non-material fields
      const formElement = createFormData({
        business_name: 'Test Business',
        'material_0_name': 'Material 1',
        'material_0_quantity': '100',
        city: 'Test City',
        'material_1_name': 'Material 2',
        'material_1_quantity': '200'
      });

      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      // Mock validator to capture the processed data
      const validateSpy = vi.fn().mockImplementation(data => data);
      const spySchema = {
        validate: validateSpy
      } as unknown as Schema<ProcessedFormData>;

      // Process the form
      const result = await processForm(
        formElement,
        {},
        [],
        options,
        mockCalculateFees,
        spySchema
      );

      // Check that non-material fields are preserved
      expect(result.business_name).toBe('Test Business');
      expect(result.city).toBe('Test City');
      
      // Verify material fields are removed
      expect(result).not.toHaveProperty('material_0_name');
      expect(result).not.toHaveProperty('material_0_quantity');
      expect(result).not.toHaveProperty('material_1_name');
      expect(result).not.toHaveProperty('material_1_quantity');
    });

    it('only removes fields with exact material_ prefix', async () => {
      // Create form with various material-related field names
      const formElement = createFormData({
        business_name: 'Test Business',
        'material_0_name': 'Should Remove',
        'materials_info': 'Should Keep',
        'non_material_field': 'Should Keep',
        'material': 'Should Keep',
      });

      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      // Mock validator to capture the processed data
      const validateSpy = vi.fn().mockImplementation(data => data);
      const spySchema = {
        validate: validateSpy
      } as unknown as Schema<ProcessedFormData>;

      // Process the form
      const result = await processForm(
        formElement,
        {},
        [],
        options,
        mockCalculateFees,
        spySchema
      );
      
      // Check that only exact material_ prefixed fields are removed
      expect(result).not.toHaveProperty('material_0_name');
      expect(result.materials_info).toBe('Should Keep');
      expect(result.non_material_field).toBe('Should Keep');
      expect(result.material).toBe('Should Keep');
    });
  });

  describe('File Processing', () => {
    it('processes storage map file', async () => {
      const formElement = createFormData({});
      const storageMapFile = createMockFile('map.pdf', 'application/pdf');
      
      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        { storage_map: storageMapFile },
        [],
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      // Check if storage_map exists and is the right type
      const processedStorageMap = result.storage_map;
      expect(processedStorageMap).toBeDefined();

      if (!processedStorageMap || !isProcessedFile(processedStorageMap)) {
        throw new Error('Expected storage_map to be a processed file');
      }

      expect(processedStorageMap.name).toBe('map.pdf');
      expect(processedStorageMap.content).toBeDefined();
    });

    it('processes multiple additional files', async () => {
      const formElement = createFormData({});
      const additionalFiles = [
        createMockFile('doc1.pdf', 'application/pdf'),
        createMockFile('doc2.pdf', 'application/pdf')
      ];
      
      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        { additional_files: additionalFiles },
        [],
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      if (!Array.isArray(result.additional_files)) {
        throw new Error('Expected additional_files to be an array');
      }

      expect(result.additional_files).toHaveLength(2);
      expect(result.additional_files[0].name).toBe('doc1.pdf');
      expect(result.additional_files[1].name).toBe('doc2.pdf');
    });
  });

  describe('Material Processing', () => {
    it('includes materials for new permit', async () => {
      const formElement = createFormData({});
      const materials = [mockMaterial];
      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        {},
        materials,
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      if (!Array.isArray(result.materials)) {
        throw new Error('Expected materials to be an array');
      }

      expect(result.materials).toEqual(materials);
    });

    it('excludes materials for renewal with no change', async () => {
      const formElement = createFormData({});
      const materials = [mockMaterial];
      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'renewal_no_change',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        {},
        materials,
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      if (!Array.isArray(result.materials)) {
        throw new Error('Expected materials to be an array');
      }

      expect(result.materials).toEqual([]);
    });
  });

  describe('Fee Processing', () => {
    it('includes calculated fees', async () => {
      const formElement = createFormData({});
      const options: FormProcessingOptions = {
        isThirdParty: false,
        applicationType: 'new_permit',
        isSpreadsheetMode: false
      };

      const result = await processForm(
        formElement,
        {},
        [],
        options,
        mockCalculateFees,
        mockValidationSchema
      );

      if (!isFees(result.fees)) {
        throw new Error('Expected fees to be a Fees object');
      }

      expect(mockCalculateFees).toHaveBeenCalledWith('new_permit');
      expect(result.fees).toBeDefined();
      expect(result.fees.total).toBe(780);
    });
  });
});
