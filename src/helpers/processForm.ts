import { Schema } from 'yup';
import { ApplicationType } from '../components/PermitDetails';
import type { Material, ProcessedFile, Fees } from './types';

export interface FormProcessingOptions {
  isThirdParty: boolean;
  applicationType: ApplicationType;
  isSpreadsheetMode: boolean;
}

export interface ProcessedFiles {
  storage_map?: ProcessedFile;
  additional_files: ProcessedFile[];
}

export type ProcessedFormField = string | boolean | ProcessedFile | ProcessedFile[] | Material[] | Fees;

export interface ProcessedFormData {
  [key: string]: ProcessedFormField | undefined;
  storage_map?: ProcessedFile;
  additional_files: ProcessedFile[];
  materials: Material[];
  fees: Fees;
  is_third_party: boolean;
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      resolve(reader.result);
    } else {
      reject(new Error('Failed to convert file to base64'));
    }
  };
  reader.onerror = (err) => reject(err);
  reader.readAsDataURL(file);
});

export async function processFiles(files: {
  storage_map?: File;
  additional_files?: File[];
}): Promise<ProcessedFiles> {
  const processedFiles: ProcessedFiles = {
    additional_files: []
  };

  if (files.storage_map) {
    processedFiles.storage_map = {
      content: await toBase64(files.storage_map),
      name: files.storage_map.name
    };
  }

  if (files.additional_files && files.additional_files.length > 0) {
    processedFiles.additional_files = await Promise.all(
      files.additional_files.map(async (file) => ({
        content: await toBase64(file),
        name: file.name
      }))
    );
  }

  return processedFiles;
}

function convertFormDataValue(value: FormDataEntryValue): string {
  if (typeof value === 'string') {
    return value;
  }
  // For File objects or other types, convert to string
  return String(value);
}

export async function processForm(
  formElement: HTMLFormElement,
  files: {
    storage_map?: File;
    additional_files?: File[];
  },
  materials: Material[],
  options: FormProcessingOptions,
  calculateFees: (type: ApplicationType) => Fees,
  validationSchema: Schema<ProcessedFormData>
): Promise<ProcessedFormData> {
  const formData = new FormData(formElement);

  // Remove material fields from form data
  const keysToDelete: string[] = [];
  formData.forEach((_, key) => {
    if (key.startsWith('material_')) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => formData.delete(key));

  // Convert FormData to plain object
  const data = {} as ProcessedFormData;
  formData.forEach((value, key) => {
    data[key] = convertFormDataValue(value);
  });

  // Add calculated fees
  data.fees = calculateFees(options.applicationType);

  // Process files
  const processedFiles = await processFiles(files);
  data.storage_map = processedFiles.storage_map;
  data.additional_files = processedFiles.additional_files;

  // Add form options
  data.is_third_party = options.isThirdParty;

  // Handle materials based on application type
  data.materials = options.applicationType === 'renewal_no_change' ? [] : materials;

  // Validate the complete form data
  return await validationSchema.validate(data) as ProcessedFormData;
}
