import React, { useState } from 'react';

export default function LoginScreen({ navigate }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('otp', { email, context: 'login' });
    }, 900);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: '32px',
    }}>

      {/* Top Header with Logo */}
      <div style={{ padding: '48px 24px 0', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.25rem', color: '#111111', lineHeight: 1 }}>✦</span>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#111111',
            fontFamily: 'Inter, -apple-system, sans-serif',
            letterSpacing: '-0.02em',
          }}>
            nexus
          </span>
        </div>
      </div>

      {/* Hero Welcome Text — Centered */}
      <div style={{
        padding: '36px 24px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 2,
      }}>
        <h1 style={{
          fontSize: '2.35rem',
          fontWeight: 800,
          color: '#141414',
          letterSpacing: '-0.035em',
          lineHeight: 1.15,
          marginBottom: '14px',
          fontFamily: 'Inter, -apple-system, sans-serif',
        }}>
          Welcome Back
        </h1>
        <p style={{
          fontSize: '14.5px',
          color: '#584D60',
          lineHeight: 1.6,
          maxWidth: '315px',
          fontFamily: 'Inter, -apple-system, sans-serif',
          fontWeight: 400,
        }}>
          Log in to access your security center, manage your system configurations, and continue protecting your data.
        </p>
      </div>

      {/* Main Frosted Glass Card */}
      <div style={{
        margin: '0 20px',
        background: 'rgba(255, 255, 255, 0.32)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1.5px solid rgba(255, 255, 255, 0.78)',
        borderRadius: '26px',
        padding: '24px 20px 20px',
        boxShadow: '0 12px 40px rgba(240, 140, 170, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
        zIndex: 2,
      }}>

        {/* Email or Username Input */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8F8298',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            <UserIcon />
          </div>
          <input
            type="text"
            placeholder="Email or Username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              height: '52px',
              padding: '0 16px 0 48px',
              background: 'rgba(255, 255, 255, 0.48)',
              border: '1px solid rgba(255, 255, 255, 0.65)',
              borderRadius: '16px',
              color: '#141414',
              fontSize: '15px',
              fontFamily: 'Inter, -apple-system, sans-serif',
              outline: 'none',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onFocus={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.75)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.95)';
              e.target.style.boxShadow = '0 0 0 3px rgba(240, 140, 170, 0.18)';
            }}
            onBlur={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.48)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.65)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <div style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8F8298',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            <LockIcon />
          </div>
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              height: '52px',
              padding: '0 48px 0 48px',
              background: 'rgba(255, 255, 255, 0.48)',
              border: '1px solid rgba(255, 255, 255, 0.65)',
              borderRadius: '16px',
              color: '#141414',
              fontSize: '15px',
              fontFamily: 'Inter, -apple-system, sans-serif',
              outline: 'none',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onFocus={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.75)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.95)';
              e.target.style.boxShadow = '0 0 0 3px rgba(240, 140, 170, 0.18)';
            }}
            onBlur={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.48)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.65)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8F8298',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
          >
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div style={{ textAlign: 'right', marginBottom: '18px' }}>
          <button
            type="button"
            onClick={() => navigate('forgot')}
            style={{
              background: 'none',
              border: 'none',
              color: '#3D314A',
              fontSize: '13.5px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              padding: 0,
            }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Log In Button — Solid Black Rounded Rectangle */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            height: '52px',
            background: '#141414',
            border: 'none',
            borderRadius: '16px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, -apple-system, sans-serif',
            boxShadow: '0 4px 18px rgba(20, 10, 30, 0.25)',
            letterSpacing: '-0.01em',
            transition: 'all 0.2s ease',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {loading ? 'Signing in...' : 'Log In'}
        </button>

        {/* Divider: "Or continue with" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 4px 4px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(180, 150, 170, 0.3)' }} />
          <span style={{
            fontSize: '13px',
            color: '#8F8298',
            fontFamily: 'Inter, -apple-system, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            Or continue with
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(180, 150, 170, 0.3)' }} />
        </div>
      </div>

      {/* Google Sign-in Button — Outside Card */}
      <div style={{ padding: '16px 20px 0', zIndex: 2 }}>
        <button
          type="button"
          onClick={() => navigate('home')}
          style={{
            width: '100%',
            height: '52px',
            background: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            borderRadius: '16px',
            color: '#1E1B24',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, -apple-system, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 20px rgba(180, 140, 170, 0.12)',
            letterSpacing: '-0.01em',
            transition: 'all 0.2s ease',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      {/* Sign up footer link */}
      <p style={{
        textAlign: 'center',
        marginTop: '22px',
        fontSize: '14px',
        color: '#584D60',
        fontFamily: 'Inter, -apple-system, sans-serif',
        zIndex: 2,
      }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('signup')}
          style={{
            background: 'none',
            border: 'none',
            color: '#141414',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontSize: '14px',
          }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

/* ── Precise SVG Outline Icons ────────────────────────────── */
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
