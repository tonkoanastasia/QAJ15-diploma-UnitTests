interface Result {
  success: boolean;
  errors?: string[];
  otp?: number;
  message?: string;
}

class RegistrationForm {
  private errors: string[] = [];
  private generatedOTP: number | null = null;

  validatePhone(phone: string): string | null {
    const trimmed = phone.trim();

    if (!trimmed) return 'Phone number is required.';
    if (trimmed.length < 10)
      return 'Phone number must be at least 10 characters long.';
    if (!/^\+?\d+$/.test(trimmed)) {
      return 'Enter a valid phone number using only digits and an optional + at the beginning.';
    }
    if (trimmed.length > 15)
      return 'Phone number must be no more than 15 characters long.';

    return null;
  }

  validatePassword(password: string): string | null {
    if (!password || password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (/[а-яё]/i.test(password)) {
      return 'Password must use Latin characters only.';
    }

    if (!/\d/.test(password)) {
      return 'Password must include at least one digit.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must include at least one special character: !@#$%^&*.';
    }

    return null;
  }

  validateConfirmPassword(password: string, confirm: string): string | null {
    if (!confirm) return 'Please confirm your password.';

    return password === confirm ? null : 'Passwords do not match.';
  }

  validateName(name: string): string | null {
    const trimmed = name.trim();

    if (!trimmed) return 'Name is required.';
    if (trimmed.length < 2) return 'Name must be at least 2 characters long.';

    if (!/^[A-Za-z][A-Za-z'-]*( [A-Za-z][A-Za-z'-]*)*$/.test(trimmed)) {
      return 'Name can contain only Latin letters, spaces, hyphens, and apostrophes.';
    }

    return null;
  }

  private generateCode(): number {
    this.generatedOTP = Math.floor(100000 + Math.random() * 900000);
    console.log(`SMS Code: ${this.generatedOTP}`);
    return this.generatedOTP;
  }

  sendOTP(
    phone: string,
    password: string,
    confirmPassword: string,
    name: string
  ): Result {
    this.errors = [];

    const phoneErr = this.validatePhone(phone);
    const passErr = this.validatePassword(password);
    const confirmErr = this.validateConfirmPassword(password, confirmPassword);
    const nameErr = this.validateName(name);

    if (phoneErr) this.errors.push(phoneErr);
    if (passErr) this.errors.push(passErr);
    if (confirmErr) this.errors.push(confirmErr);
    if (nameErr) this.errors.push(nameErr);

    if (this.errors.length > 0) {
      return { success: false, errors: [...this.errors] };
    }

    const otp = this.generateCode();
    return { success: true, otp };
  }

  verifyOTP(userCode: string): Result {
    const trimmedCode = userCode.trim();

    if (!/^\d{6}$/.test(trimmedCode)) {
      return { success: false, message: 'Enter a valid 6-digit OTP code.' };
    }

    const codeNum = parseInt(trimmedCode, 10);

    if (codeNum !== this.generatedOTP) {
      return { success: false, message: 'Incorrect OTP code.' };
    }

    this.generatedOTP = null;
    return { success: true, message: 'Registration completed successfully.' };
  }
}

export default RegistrationForm;
