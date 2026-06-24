/**
 * kra-pin-validator-js-20260624c
 * Professional Utility library for Kenya Revenue Authority (KRA) PIN and National ID validation.
 */

const KRA_PIN_REGEX = /^[A-P]\d{9}[A-Z]$/i;
const NATIONAL_ID_REGEX = /^\d{7,8}$/;

/**
 * Main Validator Object
 */
const KRAValidator = {
  /**
   * Validates the format of a Kenya Revenue Authority PIN.
   * A standard KRA PIN starts with A, P, or M, followed by 9 digits, and ends with a letter.
   * @param {string} pin - The KRA PIN to validate.
   * @returns {boolean} True if valid format.
   */
  isValidPIN: function (pin) {
    if (typeof pin !== 'string') return false;
    const cleaned = pin.trim().toUpperCase();
    if (cleaned.length !== 11) return false;
    return KRA_PIN_REGEX.test(cleaned);
  },

  /**
   * Identifies the entity type based on the PIN prefix.
   * 'A' is for Individuals, 'P' is for Non-Individuals (Companies).
   * @param {string} pin - The KRA PIN.
   * @returns {string} 'Individual', 'Non-Individual', or 'Unknown'.
   */
  getEntityType: function (pin) {
    if (!this.isValidPIN(pin)) return 'Unknown';
    const firstChar = pin.trim().toUpperCase().charAt(0);
    if (firstChar === 'A') return 'Individual';
    if (firstChar === 'P') return 'Non-Individual';
    return 'Other';
  },

  /**
   * Validates a Kenyan National ID number.
   * Kenyan ID numbers are typically 7 or 8 digits long.
   * @param {string|number} id - The ID number to validate.
   * @returns {boolean} True if valid.
   */
  isValidID: function (id) {
    if (id === null || id === undefined) return false;
    const strId = id.toString().trim();
    if (!NATIONAL_ID_REGEX.test(strId)) return false;
    
    const numericId = parseInt(strId, 10);
    return numericId > 0 && numericId < 100000000;
  },

  /**
   * Sanitize a string by removing whitespace and converting to uppercase.
   * @param {string} input
   * @returns {string}
   */
  sanitizeInput: function (input) {
    return typeof input === 'string' ? input.trim().toUpperCase() : '';
  },

  /**
   * Validates an entire onboarding data object.
   * @param {Object} data - { kraPin, idNumber }
   * @returns {Object} Result object with status and specific error messages.
   */
  validateOnboardingData: function (data) {
    const results = {
      isValid: true,
      errors: {},
      metadata: {}
    };

    if (!this.isValidPIN(data.kraPin)) {
      results.isValid = false;
      results.errors.kraPin = 'Invalid KRA PIN format. Expected 11 characters (e.g., A123456789X).';
    } else {
      results.metadata.entityType = this.getEntityType(data.kraPin);
    }

    if (!this.isValidID(data.idNumber)) {
      results.isValid = false;
      results.errors.idNumber = 'Invalid National ID number. Expected 7 to 8 digits.';
    }

    return results;
  }
};

// Simple internal test check if run directly
if (require.main === module) {
  console.log('Testing KRA Validator...');
  console.log('Valid Individual PIN (A001234567A):', KRAValidator.isValidPIN('A001234567A'));
  console.log('Valid ID (12345678):', KRAValidator.isValidID('12345678'));
  console.log('Onboarding Check:', KRAValidator.validateOnboardingData({ 
    kraPin: 'A123456789Z', 
    idNumber: '33445566' 
  }));
}

module.exports = KRAValidator;