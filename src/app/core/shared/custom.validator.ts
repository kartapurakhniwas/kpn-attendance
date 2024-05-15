import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
  // Space Validation
  static cannotStartWithSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string)?.indexOf(" ") == 0) {
      return { cannotStartWithSpace: true };
    }
    return null;
  }

  // Phone Number Validation
  static phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string)?.match("^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$")) {
      return { phoneNumberValidator: true };
    }
    return null;
  }
}
