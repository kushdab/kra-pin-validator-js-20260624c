# KRA PIN Validator JS

Utility library to validate Kenya Revenue Authority (KRA) PINs and Kenyan National ID numbers for onboarding flows.

## Installation

```bash
npm install kra-pin-validator-js-20260624c
```

## Usage

```javascript
const KRAValidator = require('./index');

// Validate KRA PIN
const isPinValid = KRAValidator.isValidPIN('A123456789Z'); 

// Validate National ID
const isIdValid = KRAValidator.isValidID('12345678'); 

// Check Entity Type
const type = KRAValidator.getEntityType('A123456789Z'); // returns 'Individual'

// Comprehensive Onboarding Check
const result = KRAValidator.validateOnboardingData({
    kraPin: 'A123456789Z',
    idNumber: '12345678'
});

if (result.isValid) {
    console.log('Onboarding data is valid for entity:', result.metadata.entityType);
} else {
    console.error('Validation errors:', result.errors);
}
```

## Rules Applied
- **KRA PIN**: 11 characters, starts with a letter (A-P), ends with a letter, 9 digits in between.
- **National ID**: 7 or 8 numeric digits.