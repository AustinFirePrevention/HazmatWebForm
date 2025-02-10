# Hazmat Repository

This repository contains the code and resources for managing hazardous materials. It includes tools for tracking, reporting, and updating information related to hazardous materials.

## Features

- Track hazardous materials
- Generate reports

## How to Update Fees

Fees can be modified in the `FeeProcessor.ts` file by updating the following arrays:

1. `FEES` array - Contains the fee amounts that correspond to quantity thresholds
   - Example: To increase all fees by $100, add 100 to each value in the array

2. Quantity threshold arrays:
   - `LIQUID_QUANTITIES` - For liquid materials
   - `GAS_QUANTITIES` - For gas materials
   - `SOLID_QUANTITIES` - For solid materials
   - `ESS_QUANTITIES` - For energy storage systems

   Example: To decrease the quantity threshold by 10 units, subtract 10 from the values in the respective array.

After updating the fees the website bust be built and deployed. (see below)

Current fee structure:
- Level 1: $130 
- Level 2: $260
- Level 3: $390
- Level 4: $520
- Level 5: $650

## How to Add Common Chemicals

Common chemicals can be added by updating the `commonChem.json` file located in the `commonchemicals` directory. Each chemical entry should include the following properties:

- `name`: A unique identifier for the chemical.
- `label`: The display name for the chemical.
- `label_es`: The display name in Spanish.
- `unit`: The unit of measurement (e.g., gallons, cubic_feet, pounds, kilowatt_hours).
- `health_hazard`: The health hazard rating (0-4).
- `fire_hazard`: The fire hazard rating (0-4).
- `instability_hazard`: The instability hazard rating (0-4).
- `minimumReportableAmount`: The minimum quantity required for reporting (optional, currently not used).

Example entry:
```json
{
    "name": "custom_chemical",
    "label": "Custom Chemical",
    "label_es": "",
    "unit": "gallons",
    "fire_hazard": "0",
    "health_hazard": "0",
    "instability_hazard": "0"
}
```

*Note: Common chemical translations are managed directly in the `commonChem.json` file, not in the translation files.*

## How Translations Work

Translations are managed using the `i18next` library. The translation files are located in the `src/locales` directory. Each language has its own JSON file containing key-value pairs for the translated strings.

### Updating Translations

To update translations for an existing language, follow these steps:

1. Open the corresponding JSON file in the `src/locales` directory (e.g., `en.json` for English).
2. Add or update the key-value pairs as needed.

Example:
```json
{
  "new_key": "New translation string"
}
```

### Adding a New Language

To add a new language, follow these steps:

1. Create a new JSON file in the `src/locales` directory with the language code as the filename (e.g., `es.json` for Spanish).
2. Add the key-value pairs for the translations.

Example:
```json
{
  "title": "Título en Español",
  "submit": "Enviar"
}
```

3. Update the `src/i18n.ts` file to include the new language.

Example:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

## Development

- Install dependencies:
  
  ```bash
  npm install
  ```

- Run Development Server

  ```bash
  npm run dev
  ```

Navigate to [http://127.0.0.1:8080/pages/AFDPreventionDevTeam/hazmat](http://127.0.0.1:8080/pages/AFDPreventionDevTeam/hazmat)

## Build and Deploy

This tool is currently deployed in [github pages](https://pages.github.com/).

It is currently deployed [here](https://github.austintexas.gov/pages/AFDPreventionDevTeam/hazmat/).

### To deploy your changes you must
1. Build the changes with `npm run build`. This command puts the built website into /docs folder. 
2. Commit the changes with `git commit -am "commit message here"`
3. Upload the changes to github with `git push`

Shortly after these commands are run the changes should be available at the website listed above.




