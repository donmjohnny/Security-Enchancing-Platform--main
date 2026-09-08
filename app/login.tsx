import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import Svg, { Path, Defs, RadialGradient, Stop, Rect, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastOpacity = new Animated.Value(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleLogin = () => {
    showToast('Logging into Nexus...');
    // Add actual logic here, for example:
    // setTimeout(() => router.replace('/'), 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Background Mesh */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="gradCoral" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#ff8a7a" stopOpacity="1" />
              <Stop offset="50%" stopColor="#ff6b6b" stopOpacity="1" />
              <Stop offset="80%" stopColor="#ff6b6b" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="gradMagenta" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#f472b6" stopOpacity="1" />
              <Stop offset="45%" stopColor="#ec4899" stopOpacity="1" />
              <Stop offset="70%" stopColor="#db2777" stopOpacity="1" />
              <Stop offset="80%" stopColor="#db2777" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="gradBlue" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#a5b4fc" stopOpacity="1" />
              <Stop offset="50%" stopColor="#93c5fd" stopOpacity="1" />
              <Stop offset="80%" stopColor="#93c5fd" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="gradTop" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#fdf2f8" stopOpacity="1" />
              <Stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          
          <Rect width="100%" height="100%" fill="#ffffff" />
          
          {/* aura-top */}
          <Circle cx="50%" cy="0" r={250} fill="url(#gradTop)" opacity={0.75} />
          {/* aura-magenta */}
          <Circle cx="100%" cy="35%" r={240} fill="url(#gradMagenta)" opacity={0.7} />
          {/* aura-coral */}
          <Circle cx="5%" cy="85%" r={225} fill="url(#gradCoral)" opacity={0.65} />
          {/* aura-blue */}
          <Circle cx="30%" cy="105%" r={200} fill="url(#gradBlue)" opacity={0.55} />
        </Svg>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.appViewport}>
          {/* Brand Header */}
          <View style={styles.brandHeader}>
            <Svg viewBox="0 0 24 24" style={styles.sparkleIcon}>
              <Path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#0b1014" />
            </Svg>
            <Text style={styles.brandText}>nexus</Text>
          </View>

          <View style={styles.contentWrapper}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Text style={styles.titleText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>
                Log in to access your security center, manage your system configurations, and continue protecting your data.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.glassCardWrapper}>
              {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
              ) : (
                 <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.7)' }]} />
              )}
              
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.55)', 'rgba(255, 255, 255, 0.3)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.glassCardGradient}
              />
              
              <View style={styles.glassCardContent}>
                {/* Email Input */}
                <View style={[styles.inputWrapper, isEmailFocused && styles.inputWrapperFocused]}>
                  <Feather name="user" size={20} color="#71717a" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Email or Username"
                    placeholderTextColor="#71717a"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </View>

                {/* Password Input */}
                <View style={[styles.inputWrapper, isPasswordFocused && styles.inputWrapperFocused]}>
                  <Feather name="lock" size={20} color="#71717a" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    placeholderTextColor="#71717a"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.togglePwd}>
                    <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#71717a" />
                  </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <View style={styles.forgotPassword}>
                  <TouchableOpacity onPress={() => showToast('Forgot password clicked')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
                  <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>
              </View>
            </View>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton} onPress={() => showToast('Google login initiated')} activeOpacity={0.8}>
              <Svg width="22" height="22" viewBox="0 0 24 24" style={styles.googleIcon}>
                <Path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <Path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <Path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <Path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </Svg>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Toast Notification */}
      <Animated.View 
        style={[
          styles.toast, 
          { 
            opacity: toastOpacity, 
            transform: [{ 
              translateY: toastOpacity.interpolate({ 
                inputRange: [0, 1], 
                outputRange: [20, 0] 
              }) 
            }] 
          }
        ]}
        pointerEvents="none"
      >
        <Text style={styles.toastText}>{toastMessage}</Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appViewport: {
    width: '100%',
    maxWidth: 400,
    minHeight: height,
    paddingHorizontal: 20,
    paddingVertical: 48,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 6,
    gap: 8,
    marginTop: 4,
    marginBottom: 40,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b1014',
    letterSpacing: -0.5,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#09090b',
    letterSpacing: -0.8,
    lineHeight: 38,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14.5,
    color: '#3f3f46',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 10,
    maxWidth: 330,
    fontWeight: '400',
  },
  glassCardWrapper: {
    borderRadius: 26,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  glassCardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  glassCardContent: {
    padding: 22,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  inputWrapperFocused: {
    borderColor: 'rgba(24, 24, 27, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputField: {
    flex: 1,
    fontSize: 15.5,
    color: '#09090b',
    fontWeight: '400',
    height: '100%',
  },
  togglePwd: {
    padding: 4,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 18,
    marginTop: -2,
  },
  forgotPasswordText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#3f3f46',
  },
  loginButton: {
    backgroundColor: '#161616',
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 18,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16.5,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12.5,
    color: '#71717a',
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27272a',
  },
  toast: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  toastText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});
