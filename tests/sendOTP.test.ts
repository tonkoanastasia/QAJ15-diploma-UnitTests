import RegistrationForm from '../src/registrationForm';

describe('sendOTP', () => {
  let form: RegistrationForm;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  describe('positive cases', () => {
    test('return success true for valid input', () => {
      const result = form.sendOTP(
        '+375291234567',
        'Password!2',
        'Password!2',
        'Raymond Burn'
      );

      expect(result.success).toBe(true);
      expect(result.errors).toBeUndefined();
      expect(result.otp).toBeDefined();
    });

    test('return a 6-digit OTP on success', () => {
      const result = form.sendOTP(
        '+375291234567',
        'Password!2',
        'Password!2',
        'Raymond Burn'
      );

      expect(result.otp).toBeGreaterThanOrEqual(100000);
      expect(result.otp).toBeLessThanOrEqual(999999);
    });

    test('log generated OTP to console on success', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      form.sendOTP('+375291234567', 'Password!2', 'Password!2', 'Raymond Burn');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy.mock.calls[0][0]).toMatch(/SMS Code: \d{6}/);

      consoleSpy.mockRestore();
    });
  });

  describe('negative cases', () => {
    test('return success false when input data is invalid', () => {
      const result = form.sendOTP('', '1233', '4526', '');

      expect(result.success).toBe(false);
      expect(result.otp).toBeUndefined();
      expect(result.errors).toBeDefined();
    });

    test('return aggregated errors for multiple invalid fields', () => {
      const result = form.sendOTP('', '123', '456', '');

      expect(result.errors).toEqual([
        'Phone number is required.',
        'Password must be at least 8 characters long.',
        'Passwords do not match.',
        'Name is required.',
      ]);
    });

    test('no OTP log to console when validation fails', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      form.sendOTP('', '123', '456', '');

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
