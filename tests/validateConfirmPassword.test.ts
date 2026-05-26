import RegistrationForm from '../src/registrationForm';

describe('validateConfirmPassword', () => {
  let form: RegistrationForm;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  describe('positive cases', () => {
    test('return null when passwords match', () => {
      expect(form.validateConfirmPassword('Password!2', 'Password!2')).toBe(null);
    });
  });

  describe('negative cases', () => {
    test('return error when confirm password is empty', () => {
      expect(form.validateConfirmPassword('Password!2!', '')).toBe(
        'Please confirm your password.'
      );
    });

    test('return error when passwords do not match', () => {
      expect(form.validateConfirmPassword('Password!2!', 'Password!4')).toBe(
        'Passwords do not match.'
      );
    });
  });
});
