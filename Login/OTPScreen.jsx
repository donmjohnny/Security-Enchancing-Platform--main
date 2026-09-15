import React, { useState, useEffect, useRef } from 'react';

const NX_BG = 'linear-gradient(160deg, #FFDDE8 0%, #F5B8CB 30%, #E89BB4 55%, #D4A0C8 78%, #C8A8D8 100%)';

export default function OTPScreen({ navigate, data = {} }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleKey = (idx, e) => {
    if (e.key === 'Backspace') {
      if (otp[idx] === '') {
        if (idx > 0) { inputRefs.current[idx - 1]?.focus(); }
        return;
      }
      const next = [...otp]; next[idx] = '';
      setOtp(next);
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = [...otp]; next[idx] = e.key;
    setOtp(next);
    if (idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const arr = text.split('');
    setOtp(arr.concat(Array(6 - arr.length).fill('')));
    if (arr.length > 0) inputRefs.current[Math.min(arr.length, 5)]?.focus();
    e.preventDefault();
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      navigate('home');
    }, 900);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setCountdown(60);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;

  return (
    <div style={{ width:'100%', minHeight:'100dvh', background: NX_BG, display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>

      {/* Blobs */}
      <div style={{ position:'absolute',top:'-80px',right:'-60px',width:'260px',height:'260px',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.4),transparent 70%)',filter:'blur(24px)',pointerEvents:'none' }} />

      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'52px 24px 0',zIndex:2 }}>
        <button onClick={() => navigate('login')} style={{ background:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.7)',borderRadius:'999px',padding:'8px 16px',color:'#6B5B7A',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'Inter,sans-serif' }}>
          ← Back
        </button>
        <div style={{ display:'flex',alignItems:'center',gap:'6px' }}>
          <span style={{ fontSize:'1.1rem',color:'#1A1A2E' }}>✦</span>
          <span style={{ fontSize:'1rem',fontWeight:700,color:'#1A1A2E',fontFamily:'Inter,sans-serif' }}>nexus</span>
        </div>
      </div>

      {/* Icon */}
      <div style={{ display:'flex',justifyContent:'center',padding:'32px 24px 20px',zIndex:2 }}>
        <div style={{
          width:'80px',height:'80px',borderRadius:'24px',
          background:'rgba(255,255,255,0.7)',
          backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.9)',
          boxShadow:'0 8px 32px rgba(180,100,140,0.15)',
          display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:'36px',
        }}>
          🔑
        </div>
      </div>

      {/* Title */}
      <div style={{ padding:'0 28px 24px',textAlign:'center',zIndex:2 }}>
        <h1 style={{ fontSize:'1.9rem',fontWeight:800,color:'#1A1A2E',letterSpacing:'-0.03em',lineHeight:1.2,marginBottom:'10px',fontFamily:'Inter,sans-serif' }}>
          Verify Code
        </h1>
        <p style={{ fontSize:'14px',color:'#6B5B7A',lineHeight:1.65,fontFamily:'Inter,sans-serif' }}>
          We sent a 6-digit code to{' '}
          <strong style={{ color:'#1A1A2E' }}>{data.email || 'your email'}</strong>.
          Enter it below to continue.
        </p>
      </div>

      {/* OTP card */}
      <div style={{
        margin: '0 20px',
        background: 'rgba(255, 255, 255, 0.32)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1.5px solid rgba(255, 255, 255, 0.78)',
        borderRadius: '26px',
        padding: '28px 20px',
        boxShadow: '0 12px 40px rgba(240, 140, 170, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
        zIndex: 2,
      }}>

        {/* OTP inputs */}
        <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'24px' }}>
          {otp.map((val, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onKeyDown={e => handleKey(i, e)}
              onPaste={handlePaste}
              onChange={() => {}}
              style={{
                width: '46px',
                height: '54px',
                background: val ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.48)',
                border: val
                  ? '1.5px solid #141414'
                  : '1px solid rgba(255, 255, 255, 0.65)',
                borderRadius: '14px',
                textAlign: 'center',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#141414',
                fontFamily: 'Inter, -apple-system, sans-serif',
                outline: 'none',
                transition: 'all 0.18s ease',
                caretColor: '#141414',
                backdropFilter: 'blur(10px)',
              }}
              onFocus={e => { e.target.style.borderColor = '#141414'; e.target.style.boxShadow = '0 0 0 3px rgba(240, 140, 170, 0.18)'; }}
              onBlur={e => { if (!val) { e.target.style.borderColor = 'rgba(255, 255, 255, 0.65)'; e.target.style.boxShadow = 'none'; } }}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div style={{ display:'flex',justifyContent:'center',gap:'6px',marginBottom:'24px' }}>
          {otp.map((v, i) => (
            <div key={i} style={{
              width:'8px',height:'8px',borderRadius:'50%',
              background: v ? '#141414' : 'rgba(180, 150, 170, 0.3)',
              transition:'all 0.2s ease',
            }}/>
          ))}
        </div>

        {/* Verify button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={filled < 6 || verifying}
          style={{
            width: '100%',
            height: '52px',
            background: filled === 6 ? '#141414' : 'rgba(20, 20, 20, 0.4)',
            border: 'none',
            borderRadius: '16px',
            color: filled === 6 ? '#ffffff' : 'rgba(255,255,255,0.6)',
            fontSize: '16px',
            fontWeight: 700,
            cursor: filled === 6 ? 'pointer' : 'not-allowed',
            fontFamily: 'Inter, -apple-system, sans-serif',
            boxShadow: filled === 6 ? '0 4px 18px rgba(20, 10, 30, 0.25)' : 'none',
            letterSpacing: '-0.01em',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
          onMouseDown={e => { if (filled === 6) e.currentTarget.style.transform = 'scale(0.98)'; }}
          onMouseUp={e => { if (filled === 6) e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {verifying ? 'Verifying...' : 'Verify Code'}
        </button>

        {/* Resend */}
        <div style={{ textAlign:'center' }}>
          {canResend ? (
            <button onClick={handleResend} style={{ background:'none',border:'none',color:'#C04878',fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif',fontSize:'14px' }}>
              Resend Code
            </button>
          ) : (
            <p style={{ fontSize:'13px',color:'#B8A0B8',fontFamily:'Inter,sans-serif' }}>
              Resend code in <strong style={{ color:'#6B5B7A' }}>{countdown}s</strong>
            </p>
          )}
        </div>
      </div>

      <p style={{ textAlign:'center',marginTop:'20px',fontSize:'13px',color:'rgba(107,91,122,0.7)',fontFamily:'Inter,sans-serif',paddingBottom:'32px',zIndex:2 }}>
        Didn't receive it? Check your spam folder.
      </p>
    </div>
  );
}
