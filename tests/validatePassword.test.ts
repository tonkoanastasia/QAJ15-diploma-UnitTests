import RegistrationForm from '../src/registrationForm';

describe('validatePassword', () => {
  let form: RegistrationForm;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  describe('positive cases', () => {
    test('accept a valid password', () => {
      expect(form.validatePassword('Password!2')).toBe(null);
    });

    test('accept a valid password > 8 characters', () => {
      expect(form.validatePassword('PasswordLong!2')).toBe(null);
    });

    test('accept a valid password with multiple special characters', () => {
      expect(form.validatePassword('Password123!@')).toBe(null);
    });
  });

  describe('negative cases', () => {
    test('return error when password is empty', () => {
      expect(form.validatePassword('')).toBe(
        'Password must be at least 8 characters long.'
      );
    });

    test('return error when password is less than 8 characters', () => {
      expect(form.validatePassword('Qv3!')).toBe(
        'Password must be at least 8 characters long.'
      );
    });

    test('return error when password contains cyrillic characters', () => {
      expect(form.validatePassword('12Пароль12%')).toBe(
        'Password must use Latin characters only.'
      );
    });

    test('return error when password has no digit', () => {
      expect(form.validatePassword('Secret@#')).toBe(
        'Password must include at least one digit.'
      );
    });

    test('return error when password has no uppercase letter', () => {
      expect(form.validatePassword('secretpass1$')).toBe(
        'Password must include at least one uppercase letter.'
      );
    });

    test('should return error when password has no special character', () => {
      expect(form.validatePassword('Password1')).toBe(
        'Password must include at least one special character: !@#$%^&*.'
      );
    });
  });
});
