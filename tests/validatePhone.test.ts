import RegistrationForm from '../src/registrationForm';

describe('validatePhone', () => {
  let form: RegistrationForm;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  describe('positive cases', () => {
    test('accept a valid 10-digit phone number', () => {
      expect(form.validatePhone('1234567890')).toBe(null);
    });

    test('accept a valid phone number with plus at the beginning', () => {
      expect(form.validatePhone('+375291234567')).toBe(null);
    });

    test('accept a phone number with maximum allowed length', () => {
      expect(form.validatePhone('123456789012345')).toBe(null);
    });
  });

  describe('negative cases', () => {
    test('return error when phone number is empty', () => {
      expect(form.validatePhone('')).toBe('Phone number is required.');
    });

    test('return error when phone number is too short', () => {
      expect(form.validatePhone('54321')).toBe(
        'Phone number must be at least 10 characters long.'
      );
    });

    test('return error when phone number contains letters', () => {
      expect(form.validatePhone('54354as25b')).toBe(
        'Enter a valid phone number using only digits and an optional + at the beginning.'
      );
    });

    test('return error when phone number is too long', () => {
      expect(form.validatePhone('12345676543215362515361626')).toBe(
        'Phone number must be no more than 15 characters long.'
      );
    });

    test('return error when plus sign is not at the beginning', () => {
      expect(form.validatePhone('1234+567890')).toBe(
        'Enter a valid phone number using only digits and an optional + at the beginning.'
      );
    });
  });
});
