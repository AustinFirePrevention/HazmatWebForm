import { describe, it, expect } from 'vitest';
import validationSchema from '../src/helpers/validationSchema';
import type { ProcessedFormData } from '../src/helpers/processForm';

describe('Validation Schema', () => {
  describe('Required Fields', () => {
    it('accepts valid data with all required fields', async () => {
      const validData: Partial<ProcessedFormData> = {
        abc_id: 'ABC123',
        abc_email: 'test@example.com',
        application_type: 'new_permit',
        business_name: 'Test Business',
        street_address: '123 Test St',
        city: 'Test City',
        zip: '12345',
        main_phone_number: '555-555-5555',
        email_address: 'business@example.com',
        primary_contact_name: 'John Doe',
        primary_contact_business_phone: '555-555-5556',
        primary_contact_email: 'contact@example.com',
        responsible_official_name: 'Jane Smith',
        responsible_official_business_phone: '555-555-5557',
        responsible_official_email: 'official@example.com'
      };

      const validated = await validationSchema.validate(validData);
      expect(validated).toMatchObject(validData);
    });

    it('rejects data missing required fields', async () => {
      const invalidData: Partial<ProcessedFormData> = {
        business_name: 'Test Business',
        street_address: '123 Test St'
      };

      await expect(validationSchema.validate(invalidData))
        .rejects
        .toThrow();
    });

    it('accepts data with all required fields and optional fields', async () => {
      const fullData: Partial<ProcessedFormData> = {
        // Required fields
        abc_id: 'ABC123',
        abc_email: 'test@example.com',
        application_type: 'new_permit',
        business_name: 'Test Business',
        street_address: '123 Test St',
        city: 'Test City',
        zip: '12345',
        main_phone_number: '555-555-5555',
        email_address: 'business@example.com',
        primary_contact_name: 'John Doe',
        primary_contact_business_phone: '555-555-5556',
        primary_contact_email: 'contact@example.com',
        responsible_official_name: 'Jane Smith',
        responsible_official_business_phone: '555-555-5557',
        responsible_official_email: 'official@example.com',
        // Optional fields
        suite_no: '100',
        business_activity: 'Retail',
        hours_of_operation: '9-5 M-F',
        primary_contact_cell_phone: '555-555-5558',
        responsible_official_cell_phone: '555-555-5559',
        emergency_contact_name: 'Bob Wilson',
        emergency_contact_business_phone: '555-555-5560',
        emergency_contact_cell_phone: '555-555-5561',
        emergency_contact_email: 'emergency@example.com',
        building_permit: 'BP123',
        permit_number: 'P789'
      };

      const validated = await validationSchema.validate(fullData);
      expect(validated).toMatchObject(fullData);
    });
  });

  describe('Data Types', () => {
    const baseValidData: Partial<ProcessedFormData> = {
      abc_id: 'ABC123',
      abc_email: 'test@example.com',
      application_type: 'new_permit',
      business_name: 'Test Business',
      street_address: '123 Test St',
      city: 'Test City',
      zip: '12345',
      main_phone_number: '555-555-5555',
      email_address: 'business@example.com',
      primary_contact_name: 'John Doe',
      primary_contact_business_phone: '555-555-5556',
      primary_contact_email: 'contact@example.com',
      responsible_official_name: 'Jane Smith',
      responsible_official_business_phone: '555-555-5557',
      responsible_official_email: 'official@example.com'
    };

    it('validates string fields correctly', async () => {
      const testData = {
        ...baseValidData,
        abc_id: { invalid: "object" }  // Should be string, not an object
      };
      await expect(validationSchema.validate(testData))
        .rejects
        .toThrow();
    });

    it('validates boolean fields correctly', async () => {
      const testData = {
        ...baseValidData,
        is_third_party: 'not-a-boolean'
      };
      await expect(validationSchema.validate(testData))
        .rejects
        .toThrow(/must be a `boolean` type/);
    });
  });

  describe('Nested Objects', () => {
    const baseValidData: Partial<ProcessedFormData> = {
      abc_id: 'ABC123',
      abc_email: 'test@example.com',
      application_type: 'new_permit',
      business_name: 'Test Business',
      street_address: '123 Test St',
      city: 'Test City',
      zip: '12345',
      main_phone_number: '555-555-5555',
      email_address: 'business@example.com',
      primary_contact_name: 'John Doe',
      primary_contact_business_phone: '555-555-5556',
      primary_contact_email: 'contact@example.com',
      responsible_official_name: 'Jane Smith',
      responsible_official_business_phone: '555-555-5557',
      responsible_official_email: 'official@example.com'
    };

    it('validates storage map object correctly', async () => {
      const testData = {
        ...baseValidData,
        storage_map: {
          content: 'base64content',
          name: 'map.pdf'
        }
      };

      const validated = await validationSchema.validate(testData);
      expect(validated.storage_map).toEqual(testData.storage_map);
    });

    it('validates fees object structure', async () => {
      const testData = {
        ...baseValidData,
        fees: {
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
        }
      };

      const validated = await validationSchema.validate(testData);
      expect(validated.fees).toEqual(testData.fees);
    });

    it('rejects malformed fees object', async () => {
      const testData = {
        ...baseValidData,
        fees: {
          aggregateAmounts: {
            healthLiquid: "not-a-number" // Should be number
          }
        }
      };

      await expect(validationSchema.validate(testData))
        .rejects
        .toThrow();
    });
  });

  describe('Array Validation', () => {
    const baseValidData: Partial<ProcessedFormData> = {
      abc_id: 'ABC123',
      abc_email: 'test@example.com',
      application_type: 'new_permit',
      business_name: 'Test Business',
      street_address: '123 Test St',
      city: 'Test City',
      zip: '12345',
      main_phone_number: '555-555-5555',
      email_address: 'business@example.com',
      primary_contact_name: 'John Doe',
      primary_contact_business_phone: '555-555-5556',
      primary_contact_email: 'contact@example.com',
      responsible_official_name: 'Jane Smith',
      responsible_official_business_phone: '555-555-5557',
      responsible_official_email: 'official@example.com'
    };

    it('validates materials array correctly', async () => {
      const testData = {
        ...baseValidData,
        materials: [
          {
            id: 1,
            name: "Test Material",
            unit: "gallons",
            health_hazard: "2",
            fire_hazard: "1",
            instability_hazard: "0",
            quantity: "100",
            location: "Building A"
          }
        ]
      };

      const validated = await validationSchema.validate(testData);
      expect(validated.materials).toEqual(testData.materials);
    });

    it('rejects invalid material objects', async () => {
      const testData = {
        ...baseValidData,
        materials: [
          {
            id: 1,
            name: "Test Material",
            // Missing required fields
          }
        ]
      };

      await expect(validationSchema.validate(testData))
        .rejects
        .toThrow();
    });

    it('validates additional files array correctly', async () => {
      const testData = {
        ...baseValidData,
        additional_files: [
          {
            content: 'base64content1',
            name: 'file1.pdf'
          },
          {
            content: 'base64content2',
            name: 'file2.pdf'
          }
        ]
      };

      const validated = await validationSchema.validate(testData);
      expect(validated.additional_files).toEqual(testData.additional_files);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values for optional fields', async () => {
      const testData = {
        abc_id: 'ABC123',
        abc_email: 'test@example.com',
        application_type: 'new_permit',
        business_name: 'Test Business',
        street_address: '123 Test St',
        city: 'Test City',
        zip: '12345',
        main_phone_number: '555-555-5555',
        email_address: 'business@example.com',
        primary_contact_name: 'John Doe',
        primary_contact_business_phone: '555-555-5556',
        primary_contact_email: 'contact@example.com',
        responsible_official_name: 'Jane Smith',
        responsible_official_business_phone: '555-555-5557',
        responsible_official_email: 'official@example.com',
        suite_no: '',
        building_permit: '',
        permit_number: ''
      };

      const validated = await validationSchema.validate(testData);
      expect(validated).toMatchObject(testData);
    });

    it('handles empty arrays', async () => {
      const testData = {
        abc_id: 'ABC123',
        abc_email: 'test@example.com',
        application_type: 'new_permit',
        business_name: 'Test Business',
        street_address: '123 Test St',
        city: 'Test City',
        zip: '12345',
        main_phone_number: '555-555-5555',
        email_address: 'business@example.com',
        primary_contact_name: 'John Doe',
        primary_contact_business_phone: '555-555-5556',
        primary_contact_email: 'contact@example.com',
        responsible_official_name: 'Jane Smith',
        responsible_official_business_phone: '555-555-5557',
        responsible_official_email: 'official@example.com',
        materials: [],
        additional_files: []
      };

      const validated = await validationSchema.validate(testData);
      expect(validated).toMatchObject(testData);
    });

    it('rejects null values for required fields', async () => {
      const testData = {
        abc_id: 'ABC123',
        abc_email: null, // Should be string
        application_type: 'new_permit',
        business_name: 'Test Business',
        street_address: '123 Test St',
        city: 'Test City',
        zip: '12345',
        main_phone_number: '555-555-5555',
        email_address: 'business@example.com',
        primary_contact_name: 'John Doe',
        primary_contact_business_phone: '555-555-5556',
        primary_contact_email: 'contact@example.com',
        responsible_official_name: 'Jane Smith',
        responsible_official_business_phone: '555-555-5557',
        responsible_official_email: 'official@example.com'
      };

      await expect(validationSchema.validate(testData))
        .rejects
        .toThrow();
    });
  });
});
