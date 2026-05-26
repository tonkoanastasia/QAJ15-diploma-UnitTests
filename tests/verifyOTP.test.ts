import RegistrationForm from '../src/registrationForm';

describe('verifyOTP', () => {
  let form: RegistrationForm;

  beforeEach(() => {
    form = new RegistrationForm();
  });

  describe('positive cases', () => {
    test('return success for the correct OTP', () => {
      const sendResult = form.sendOTP(
        '+375291234567',
        'Mypass$1',
        'Mypass$1',
        'Ann'
      );

      const result = form.verifyOTP(String(sendResult.otp));

      expect(result).toEqual({
        success: true,
        message: 'Registration completed successfully.',
      });
    });

    test('accept the correct OTP with not trimmed spaces', () => {
      const sendResult = form.sendOTP(
        '+375291234567',
        'Mypass$1',
        'Mypass$1',
        'Ann'
      );

      const result = form.verifyOTP(`  ${sendResult.otp}  `);

      expect(result).toEqual({
        success: true,
        message: 'Registration completed successfully.',
      });
    });

    test('not allow OTP reuse after successful verification', () => {
      const sendResult = form.sendOTP(
        '+375291234567',
        'Mypass$1',
        'Mypass$1',
        'Ann'
      );

      form.verifyOTP(String(sendResult.otp));
      const secondAttempt = form.verifyOTP(String(sendResult.otp));

      expect(secondAttempt).toEqual({
        success: false,
        message: 'Incorrect OTP code.',
      });
    });
  });

  describe('negative cases', () => {
    test('return error for non-numeric OTP format', () => {
      const result = form.verifyOTP('azx113');

      expect(result).toEqual({
        success: false,
        message: 'Enter a valid 6-digit OTP code.',
      });
    });

    test('return error for OTP with wrong length', () => {
      const result = form.verifyOTP('125');

      expect(result).toEqual({
        success: false,
        message: 'Enter a valid 6-digit OTP code.',
      });
    });

    test('return error for incorrect OTP code', () => {
      form.sendOTP('+375291234567', 'Mypass$1', 'Mypass$1', 'Maks');

      const result = form.verifyOTP('000000');

      expect(result).toEqual({
        success: false,
        message: 'Incorrect OTP code.',
      });
    });

    test('return error if OTP is verified before generation', () => {
      const result = form.verifyOTP('000000');

      expect(result).toEqual({
        success: false,
        message: 'Incorrect OTP code.',
      });
    });
  });
});
