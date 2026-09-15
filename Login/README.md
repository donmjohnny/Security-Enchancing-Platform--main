# Login Module — Nexus Security Platform

This module implements the complete authentication flow for the Nexus Security Platform.

## Screens Included

1. **`LoginScreen.jsx`**: User login with email/username, password, Google OAuth trigger, and links to registration and password recovery.
2. **`SignUpScreen.jsx`**: User onboarding registration form with terms acceptance and validation.
3. **`OTPScreen.jsx`**: 6-digit numeric verification code entry with auto-focus, paste handling, and resend countdown.
4. **`ForgotPasswordScreen.jsx`**: Recovery email submission screen.
5. **`ResetPasswordScreen.jsx`**: New password entry and confirmation screen.

## Usage

```jsx
import LoginFlow, { 
  LoginScreen, 
  SignUpScreen, 
  OTPScreen, 
  ForgotPasswordScreen, 
  ResetPasswordScreen 
} from './Login';

// Render the standalone flow
<LoginFlow onLoginSuccess={(data) => console.log('Logged in:', data)} />
```
