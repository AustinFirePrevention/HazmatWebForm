import { buildYup } from 'schema-to-yup';


/**
 * This is the schema pulled out of power automate.
 */
const schema = {
    "type": "object",
    "properties": {
        "abc_id": {
            "type": "string"
        },
        "abc_email": {
            "type": "string"
        },
        "application_type": {
            "type": "string"
        },
        "building_permit": {
            "type": "string"
        },
        "permit_number": {
            "type": "string"
        },
        "business_name": {
            "type": "string"
        },
        "street_address": {
            "type": "string"
        },
        "suite_no": {
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "zip": {
            "type": "string"
        },
        "main_phone_number": {
            "type": "string"
        },
        "email_address": {
            "type": "string"
        },
        "business_activity": {
            "type": "string"
        },
        "hours_of_operation": {
            "type": "string"
        },
        "number_of_ERT": {
            "type": "string"
        },
        "primary_contact_title": {
            "type": "string"
        },
        "primary_contact_name": {
            "type": "string"
        },
        "primary_contact_business_phone": {
            "type": "string"
        },
        "primary_contact_cell_phone": {
            "type": "string"
        },
        "primary_contact_email": {
            "type": "string"
        },
        "responsible_official_title": {
            "type": "string"
        },
        "responsible_official_name": {
            "type": "string"
        },
        "responsible_official_business_phone": {
            "type": "string"
        },
        "responsible_official_cell_phone": {
            "type": "string"
        },
        "responsible_official_email": {
            "type": "string"
        },
        "emergency_contact_name": {
            "type": "string"
        },
        "emergency_contact_business_phone": {
            "type": "string"
        },
        "emergency_contact_cell_phone": {
            "type": "string"
        },
        "emergency_contact_email": {
            "type": "string"
        },
        "is_third_party": {
            "type": "boolean"
        },
        "requesting_party_business_name": {
            "type": "string"
        },
        "requesting_party_name": {
            "type": "string"
        },
        "requesting_party_business_phone": {
            "type": "string"
        },
        "requesting_party_cell_phone": {
            "type": "string"
        },
        "requesting_party_email": {
            "type": "string"
        },
        "storage_map": {
            "type": "object",
            "properties": {
                "content": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                }
            }
        },
        "additional_files": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "content": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    }
                },
                "required": ["name"]
            }
        },
        "fees": {
            "type": "object",
            "properties": {
                "aggregateAmounts": {
                    "type": "object",
                    "properties": {
                        "healthLiquid": {
                            "type": "number"
                        },
                        "fireLiquid": {
                            "type": "number"
                        },
                        "instabilityLiquid": {
                            "type": "number"
                        },
                        "healthGas": {
                            "type": "number"
                        },
                        "fireGas": {
                            "type": "number"
                        },
                        "instabilityGas": {
                            "type": "number"
                        },
                        "healthSolid": {
                            "type": "number"
                        },
                        "fireSolid": {
                            "type": "number"
                        },
                        "instabilitySolid": {
                            "type": "number"
                        },
                        "ESS": {
                            "type": "number"
                        }
                    }
                },
                "fees": {
                    "type": "object",
                    "properties": {
                        "healthLiquid": {
                            "type": "number"
                        },
                        "fireLiquid": {
                            "type": "number"
                        },
                        "instabilityLiquid": {
                            "type": "number"
                        },
                        "healthGas": {
                            "type": "number"
                        },
                        "fireGas": {
                            "type": "number"
                        },
                        "instabilityGas": {
                            "type": "number"
                        },
                        "healthSolid": {
                            "type": "number"
                        },
                        "fireSolid": {
                            "type": "number"
                        },
                        "instabilitySolid": {
                            "type": "number"
                        },
                        "ESS": {
                            "type": "number"
                        }
                    }
                },
                "total": {
                    "type": "number"
                }
            }
        },
        "materials": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "unit": {
                        "type": "string"
                    },
                    "health_hazard": {
                        "type": "string"
                    },
                    "fire_hazard": {
                        "type": "string"
                    },
                    "instability_hazard": {
                        "type": "string"
                    },
                    "quantity": {
                        "type": "string"
                    },
                    "location": {
                        "type": "string"
                    }
                },
                "required": [
                    "id",
                    "name",
                    "unit",
                    "health_hazard",
                    "fire_hazard",
                    "instability_hazard",
                    "quantity",
                    "location"
                ]
            }
        }
    },
    "required": [
        "abc_id",
        "abc_email",
        "application_type",
        "business_name",
        "street_address",
        "city",
        "zip",
        "main_phone_number",
        "email_address",
        "primary_contact_name",
        "primary_contact_business_phone",
        "primary_contact_email",
        "responsible_official_name",
        "responsible_official_business_phone",
        "responsible_official_email",
        "business_activity",
        "hours_of_operation"
    ]
}

const yupSchema = buildYup(schema);

export default yupSchema;
