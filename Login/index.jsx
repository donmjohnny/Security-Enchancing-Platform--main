import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import OTPScreen from './OTPScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ResetPasswordScreen from './ResetPasswordScreen';

export {
  LoginScreen,
  SignUpScreen,
  OTPScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
};

/**
 * Unified Login & Authentication Flow Controller
 * Handles routing between Login, Sign Up, OTP Verification, and Password Reset screens.
 */
export default function LoginFlow({ onLoginSuccess, initialScreen = 'login' }) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [screenData, setScreenData] = useState({});

  const navigate = (screen, data = {}) => {
    setScreenData(data);
    if (screen === 'home') {
      if (onLoginSuccess) {
        onLoginSuccess(data);
      } else {
        setCurrentScreen('login');
      }
    } else {
      setCurrentScreen(screen);
    }
  };

  switch (currentScreen) {
    case 'signup':
      return <SignUpScreen navigate={navigate} />;
    case 'otp':
      return <OTPScreen navigate={navigate} data={screenData} />;
    case 'forgot':
      return <ForgotPasswordScreen navigate={navigate} />;
    case 'reset':
      return <ResetPasswordScreen navigate={navigate} data={screenData} />;
    case 'login':
    default:
      return <LoginScreen navigate={navigate} />;
  }
}
