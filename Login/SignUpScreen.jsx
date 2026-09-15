import React, { useState } from 'react';

const NX_BG = 'linear-gradient(160deg, #FFDDE8 0%, #F5B8CB 30%, #E89BB4 55%, #D4A0C8 78%, #C8A8D8 100%)';

const inputStyle = {
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
};

const InputIcon = ({ children }) => (
  <div style={{
    position: 'absolute', left: '16px', top: '50%',
    transform: 'translateY(-50%)',
    color: '#B8A0B8', display: 'flex', alignItems: 'center',
    pointerEvents: 'none',
  }}>
    {children}
  </div>
);

export default function SignUpScreen({ navigate }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getStrength(form.password);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSignUp = () => {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('otp', { email: form.email, context: 'signup' });
    }, 900);
  };

  return (
    <div style={{
      width: '100%', minHeight: '100dvh',
      background: NX_BG,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Blobs */}
      <div style={{ position:'absolute',top:'-80px',right:'-60px',width:'250px',height:'250px',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.4),transparent 70%)',filter:'blur(24px)',pointerEvents:'none' }} />

      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'52px 24px 0',zIndex:2 }}>
        <button onClick={() => navigate('login')} style={{ background:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.7)',borderRadius:'999px',padding:'8px 16px',color:'#6B5B7A',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'Inter,sans-serif',display:'flex',alignItems:'center',gap:'5px' }}>
          â† Back
        </button>
        <div style={{ display:'flex',alignItems:'center',gap:'6px' }}>
          <span style={{ fontSize:'1.1rem',color:'#1A1A2E' }}>âœ¦</span>
          <span style={{ fontSize:'1rem',fontWeight:700,color:'#1A1A2E',fontFamily:'Inter,sans-serif' }}>nexus</span>
        </div>
      </div>

      {/* Title */}
      <div style={{ padding:'28px 28px 20px',zIndex:2 }}>
        <h1 style={{ fontSize:'2rem',fontWeight:800,color:'#1A1A2E',letterSpacing:'-0.03em',lineHeight:1.2,marginBottom:'8px',fontFamily:'Inter,sans-serif' }}>
          Create Account
        </h1>
        <p style={{ fontSize:'14px',color:'#6B5B7A',lineHeight:1.6,fontFamily:'Inter,sans-serif' }}>
          Join NEXUS and start protecting what matters most.
        </p>
      </div>

      {/* Form card */}
      <div style={{
        margin: '0 20px',
        background: 'rgba(255, 255, 255, 0.32)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1.5px solid rgba(255, 255, 255, 0.78)',
        borderRadius: '26px',
        padding: '24px 20px',
        boxShadow: '0 12px 40px rgba(240, 140, 170, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
        zIndex: 2,
      }}>

        {/* Full Name */}
        <div style={{ position:'relative',marginBottom:'10px' }}>
          <InputIcon><UserIcon/></InputIcon>
          <input style={inputStyle} placeholder="Full Name" value={form.name} onChange={set('name')}
            onFocus={e=>{e.target.style.background='rgba(255,190,210,0.55)';e.target.style.borderColor='rgba(200,72,112,0.4)'}}
            onBlur={e=>{e.target.style.background='rgba(255,200,215,0.35)';e.target.style.borderColor='rgba(220,160,180,0.3)'}}/>
        </div>

        {/* Email */}
        <div style={{ position:'relative',marginBottom:'10px' }}>
          <InputIcon><MailIcon/></InputIcon>
          <input style={inputStyle} type="email" placeholder="Email Address" value={form.email} onChange={set('email')}
            onFocus={e=>{e.target.style.background='rgba(255,190,210,0.55)';e.target.style.borderColor='rgba(200,72,112,0.4)'}}
            onBlur={e=>{e.target.style.background='rgba(255,200,215,0.35)';e.target.style.borderColor='rgba(220,160,180,0.3)'}}/>
        </div>

        {/* Phone */}
        <div style={{ position:'relative',marginBottom:'10px' }}>
          <InputIcon><PhoneIcon/></InputIcon>
          <input style={inputStyle} type="tel" placeholder="Phone Number" value={form.phone} onChange={set('phone')}
            onFocus={e=>{e.target.style.background='rgba(255,190,210,0.55)';e.target.style.borderColor='rgba(200,72,112,0.4)'}}
            onBlur={e=>{e.target.style.background='rgba(255,200,215,0.35)';e.target.style.borderColor='rgba(220,160,180,0.3)'}}/>
        </div>

        {/* Password */}
        <div style={{ position:'relative',marginBottom:'6px' }}>
          <InputIcon><LockIcon/></InputIcon>
          <input style={{...inputStyle,paddingRight:'46px'}} type={showPw?'text':'password'} placeholder="Password" value={form.password} onChange={set('password')}
            onFocus={e=>{e.target.style.background='rgba(255,190,210,0.55)';e.target.style.borderColor='rgba(200,72,112,0.4)'}}
            onBlur={e=>{e.target.style.background='rgba(255,200,215,0.35)';e.target.style.borderColor='rgba(220,160,180,0.3)'}}/>
          <button onClick={()=>setShowPw(!showPw)} style={{ position:'absolute',right:'16px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#B8A0B8',display:'flex',alignItems:'center' }}>
            {showPw ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        </div>

        {/* Strength meter */}
        {form.password.length > 0 && (
          <div style={{ display:'flex',gap:'5px',marginBottom:'10px',padding:'0 4px' }}>
            {[1,2,3,4].map(i=>(
              <div key={i} style={{
                flex:1,height:'4px',borderRadius:'999px',
                background: i<=strength.level ? strength.color : 'rgba(200,140,170,0.2)',
                transition:'background 0.3s ease',
              }}/>
            ))}
          </div>
        )}

        {/* Confirm Password */}
        <div style={{ position:'relative',marginBottom:'16px' }}>
          <InputIcon><LockIcon/></InputIcon>
          <input style={{...inputStyle,paddingRight:'46px'}} type={showConfirm?'text':'password'} placeholder="Confirm Password" value={form.confirm} onChange={set('confirm')}
            onFocus={e=>{e.target.style.background='rgba(255,190,210,0.55)';e.target.style.borderColor='rgba(200,72,112,0.4)'}}
            onBlur={e=>{e.target.style.background='rgba(255,200,215,0.35)';e.target.style.borderColor='rgba(220,160,180,0.3)'}}/>
          <button onClick={()=>setShowConfirm(!showConfirm)} style={{ position:'absolute',right:'16px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#B8A0B8',display:'flex',alignItems:'center' }}>
            {showConfirm ? <EyeOffIcon/> : <EyeIcon/>}
          </button>
        </div>

        {/* Terms */}
        <label style={{ display:'flex',alignItems:'flex-start',gap:'10px',marginBottom:'20px',cursor:'pointer' }}>
          <div
            onClick={()=>setAgreed(!agreed)}
            style={{
              width:'20px',height:'20px',flexShrink:0,
              borderRadius:'6px',
              background:agreed?'#111111':'rgba(255,200,215,0.5)',
              border:agreed?'1.5px solid #111111':'1.5px solid rgba(220,160,180,0.5)',
              display:'flex',alignItems:'center',justifyContent:'center',
              cursor:'pointer',transition:'all 0.2s ease',marginTop:'1px',
            }}
          >
            {agreed && <span style={{color:'#fff',fontSize:'11px',fontWeight:700}}>âœ“</span>}
          </div>
          <p style={{ fontSize:'13px',color:'#6B5B7A',lineHeight:1.55,fontFamily:'Inter,sans-serif' }}>
            I agree to the{' '}
            <span style={{color:'#C04878',fontWeight:600}}>Terms of Service</span>
            {' '}and{' '}
            <span style={{color:'#C04878',fontWeight:600}}>Privacy Policy</span>
          </p>
        </label>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading || !agreed}
          style={{
            width: '100%',
            height: '52px',
            background: agreed ? '#141414' : 'rgba(20, 20, 20, 0.4)',
            border: 'none',
            borderRadius: '16px',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 700,
            cursor: agreed ? 'pointer' : 'not-allowed',
            fontFamily: 'Inter, -apple-system, sans-serif',
            boxShadow: agreed ? '0 4px 18px rgba(20, 10, 30, 0.25)' : 'none',
            letterSpacing: '-0.01em',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseDown={e => { if (agreed) e.currentTarget.style.transform = 'scale(0.98)'; }}
          onMouseUp={e => { if (agreed) e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </div>

      {/* Login link */}
      <p style={{ textAlign:'center',marginTop:'20px',fontSize:'14px',color:'#6B5B7A',fontFamily:'Inter,sans-serif',paddingBottom:'32px',zIndex:2 }}>
        Already have an account?{' '}
        <button onClick={()=>navigate('login')} style={{ background:'none',border:'none',color:'#C04878',fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',fontSize:'14px' }}>
          Log in
        </button>
      </p>
    </div>
  );
}

function getStrength(pw) {
  if (!pw) return { level: 0, color: '#eee', label: '' };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const colors = ['#EF4444','#F59E0B','#3B82F6','#28A86A'];
  return { level: s, color: colors[s-1] || '#eee', label: ['Weak','Fair','Good','Strong'][s-1] || '' };
}

function UserIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function MailIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function PhoneIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 12.12 19.79 19.79 0 011.88 3.5 2 2 0 013.86 1.32h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9a16 16 0 006.29 6.29l1.05-1.05a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.03z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function LockIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function EyeIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function EyeOffIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }

