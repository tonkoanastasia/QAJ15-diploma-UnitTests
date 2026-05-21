import RegistrationForm from '../src/registrationForm';

describe('validateName', () => {
  let form: RegistrationForm;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  describe('positive cases', () => {
    test('accept a simple valid name', () => {
      expect(form.validateName('Kate')).toBe(null);
    });

    test('accept a double name devided with a space', () => {
      expect(form.validateName('Elly Mane')).toBe(null);
    });

    test('accept a double name devided with a hyphen', () => {
      expect(form.validateName('Anna-Maria')).toBe(null);
    });

    test('accept a name with an apostrophe', () => {
      expect(form.validateName("O'Jill")).toBe(null);
    });
  });

  describe('negative cases', () => {
    test('return error when name is empty', () => {
      expect(form.validateName('')).toBe('Name is required.');
    });

    test('return error when name is less than 2 characters', () => {
      expect(form.validateName('B')).toBe(
        'Name must be at least 2 characters long.'
      );
    });

    test('return error when name contains digits', () => {
      expect(form.validateName('Nastya123')).toBe(
        'Name can contain only Latin letters, spaces, hyphens, and apostrophes.'
      );
    });

    test('return error when name contains invalid special symbols', () => {
      expect(form.validateName('Jack*Kane')).toBe(
        'Name can contain only Latin letters, spaces, hyphens, and apostrophes.'
      );
    });
  });
});
