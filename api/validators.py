from django.core.exceptions import ValidationError
# from django.utils.translation import gettext as _

class PasswordValidator:
    def __init__(self, length=4):
        self.length = length

    def validate(self, password, user=None):
        # Validate for consecutively repeating characters
        self._validate_repeating_characters(password)

        # Validate for consecutively increasing integers
        self._validate_increasing_integers(password)

        # Validate for consecutively decreasing integers
        self._validate_decreasing_integers(password)

    def _validate_repeating_characters(self, password):
        for character in password:
            if password.count(character) >= self.length:
                check_character = character * self.length
                if check_character in password:
                    raise ValidationError(
                        ("The password contains consecutively repeating characters (e.g., '1111' or 'aaaa'). Please choose a more secure password.")
                    )
        return True

    def _validate_increasing_integers(self, password):
        for i in range(len(password)):
            if password[i].isdigit():
                count = 1
                number = int(password[i])
                for j in range(i + 1, len(password)):
                    if password[j].isdigit() and int(password[j]) == number + 1:
                        count += 1
                        number += 1
                        if count >= self.length:
                            raise ValidationError(
                                ("The password contains consecutively increasing integers (e.g., '1234'). Please choose a more secure password.")
                            )
                    else:
                        break
        return True

    def _validate_decreasing_integers(self, password):
        for i in range(len(password)):
            if password[i].isdigit():
                count = 1
                number = int(password[i])
                for j in range(i + 1, len(password)):
                    if password[j].isdigit() and int(password[j]) == number - 1:
                        count += 1
                        number -= 1
                        if count >= self.length:
                            raise ValidationError(
                                ("The password contains consecutively decreasing integers (e.g., '4321'). Please choose a more secure password.")
                            )
                    else:
                        break
        return True

    def get_help_text(self):
        return (
            "Password must not contain consecutively repeating characters, consecutively increasing integers, or consecutively decreasing integers. E.g. 1111, 1234, or 4321."
        )
