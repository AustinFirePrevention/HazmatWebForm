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




