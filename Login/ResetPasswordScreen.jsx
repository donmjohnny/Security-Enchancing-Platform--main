import React, { useState } from 'react';

const NX_BG = 'linear-gradient(160deg, #FFDDE8 0%, #F5B8CB 30%, #E89BB4 55%, #D4A0C8 78%, #C8A8D8 100%)';

function getStrength(pw) {
  if (!pw) return { level: 0, color: '#eee' };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return { level: s, color: ['#EF4444','#F59E0B','#3B82F6','#28A86A'][s-1] || '#eee' };
}

export default function ResetPasswordScreen({ navigate }) {
  const [pw, setPw]         = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [showC, setShowC]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const strength = getStrength(pw);
  const match = pw && confirm && pw === confirm;
  const canSubmit = pw.length >= 8 && match;

  const handleReset = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 900);
  };

  const inputSt = {
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
  };

  return (
    <div style={{ width:'100%',minHeight:'100dvh',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden' }}>

      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'52px 24px 0',zIndex:2 }}>
        <button onClick={()=>navigate('forgot')} style={{ background:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.7)',borderRadius:'999px',padding:'8px 16px',color:'#6B5B7A',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'Inter,sans-serif' }}>← Back</button>
        <div style={{ display:'flex',alignItems:'center',gap:'6px' }}>
          <span style={{ fontSize:'1.1rem',color:'#111111' }}>✦</span>
          <span style={{ fontSize:'1rem',fontWeight:700,color:'#111111',fontFamily:'Inter,sans-serif' }}>nexus</span>
        </div>
      </div>

      {/* Icon */}
      <div style={{ display:'flex',justifyContent:'center',padding:'32px 24px 20px',zIndex:2 }}>
        <div style={{ width:'80px',height:'80px',borderRadius:'24px',background:'rgba(255,255,255,0.5)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.9)',boxShadow:'0 8px 32px rgba(180,100,140,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px' }}>
          {done ? '🎉' : '🛡️'}
        </div>
      </div>

      {!done ? (
        <>
          <div style={{ padding:'0 28px 24px',textAlign:'center',zIndex:2 }}>
            <h1 style={{ fontSize:'1.9rem',fontWeight:800,color:'#141414',letterSpacing:'-0.03em',lineHeight:1.2,marginBottom:'10px',fontFamily:'Inter,sans-serif' }}>Reset Password</h1>
            <p style={{ fontSize:'14px',color:'#584D60',lineHeight:1.65,fontFamily:'Inter,sans-serif' }}>Create a strong new password for your account.</p>
          </div>

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

            {/* New Password */}
            <div style={{ position:'relative',marginBottom:'6px' }}>
              <div style={{ position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',color:'#8F8298',display:'flex',alignItems:'center' }}><LockIcon/></div>
              <input type={showPw?'text':'password'} placeholder="New Password" value={pw} onChange={e=>setPw(e.target.value)} style={inputSt}
                onFocus={e=>{e.target.style.background='rgba(255,255,255,0.75)';e.target.style.borderColor='rgba(255,255,255,0.95)';e.target.style.boxShadow='0 0 0 3px rgba(240,140,170,0.18)'}}
                onBlur={e=>{e.target.style.background='rgba(255,255,255,0.48)';e.target.style.borderColor='rgba(255,255,255,0.65)';e.target.style.boxShadow='none'}}/>
              <button onClick={()=>setShowPw(!showPw)} style={{ position:'absolute',right:'16px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#8F8298',display:'flex',alignItems:'center' }}>
                {showPw?<EyeOffIcon/>:<EyeIcon/>}
              </button>
            </div>

            {/* Strength bar */}
            {pw.length > 0 && (
              <div style={{ display:'flex',gap:'5px',margin:'6px 4px 10px',alignItems:'center' }}>
                {[1,2,3,4].map(i=>(
                  <div key={i} style={{ flex:1,height:'4px',borderRadius:'999px',background:i<=strength.level?strength.color:'rgba(200,140,170,0.2)',transition:'background 0.3s ease' }}/>
                ))}
                <span style={{ fontSize:'11px',color:strength.color,fontWeight:600,fontFamily:'Inter,sans-serif',minWidth:'42px',textAlign:'right' }}>
                  {['Weak','Fair','Good','Strong'][strength.level-1]||''}
                </span>
              </div>
            )}

            {/* Confirm */}
            <div style={{ position:'relative',marginBottom:'20px' }}>
              <div style={{ position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',color:'#8F8298',display:'flex',alignItems:'center' }}><LockIcon/></div>
              <input type={showC?'text':'password'} placeholder="Confirm Password" value={confirm} onChange={e=>setConfirm(e.target.value)} style={{ ...inputSt, borderColor: confirm && (match ? 'rgba(40,168,106,0.5)' : 'rgba(239,68,68,0.4)') }}
                onFocus={e=>{e.target.style.background='rgba(255,255,255,0.75)'}}
                onBlur={e=>{e.target.style.background='rgba(255,255,255,0.48)'}}/>
              <button onClick={()=>setShowC(!showC)} style={{ position:'absolute',right:'16px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#8F8298',display:'flex',alignItems:'center' }}>
                {showC?<EyeOffIcon/>:<EyeIcon/>}
              </button>
            </div>

            {/* Match indicator */}
            {confirm && (
              <p style={{ fontSize:'12px',marginBottom:'14px',fontFamily:'Inter,sans-serif',color:match?'#28A86A':'#EF4444' }}>
                {match ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}

            <button
              type="button"
              onClick={handleReset}
              disabled={!canSubmit||loading}
              style={{
                width: '100%',
                height: '52px',
                background: canSubmit ? '#141414' : 'rgba(20, 20, 20, 0.4)',
                border: 'none',
                borderRadius: '16px',
                color: canSubmit ? '#ffffff' : 'rgba(255,255,255,0.6)',
                fontSize: '16px',
                fontWeight: 700,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                fontFamily: 'Inter, -apple-system, sans-serif',
                boxShadow: canSubmit ? '0 4px 18px rgba(20, 10, 30, 0.25)' : 'none',
                letterSpacing: '-0.01em',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading?'Resetting...':'Reset Password'}
            </button>
          </div>
        </>
      ) : (
        <div style={{
          margin: '0 20px',
          background: 'rgba(255, 255, 255, 0.32)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1.5px solid rgba(255, 255, 255, 0.78)',
          borderRadius: '26px',
          padding: '32px 24px',
          boxShadow: '0 12px 40px rgba(240, 140, 170, 0.16)',
          textAlign: 'center',
          zIndex: 2,
        }}>
          <h2 style={{ fontSize:'1.3rem',fontWeight:700,color:'#141414',marginBottom:'10px',fontFamily:'Inter,sans-serif' }}>Password Reset!</h2>
          <p style={{ fontSize:'14px',color:'#584D60',lineHeight:1.65,marginBottom:'24px',fontFamily:'Inter,sans-serif' }}>Your password has been successfully updated. Log in with your new password.</p>
          <button
            type="button"
            onClick={()=>navigate('login')}
            style={{
              width: '100%',
              height: '52px',
              background: '#141414',
              border: 'none',
              borderRadius: '16px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              boxShadow: '0 4px 18px rgba(20, 10, 30, 0.25)',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Back to Login →
          </button>
          <p style={{ fontSize:'14px',color:'#6B5B7A',lineHeight:1.65,marginBottom:'24px',fontFamily:'Inter,sans-serif' }}>Your password has been successfully updated. Log in with your new password.</p>
          <button onClick={()=>navigate('login')} style={{ width:'100%',padding:'15px',background:'#111111',border:'none',borderRadius:'999px',color:'#ffffff',fontSize:'15px',fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',boxShadow:'0 4px 20px rgba(30,10,50,0.3)',letterSpacing:'-0.01em' }}>
            Back to Login →
          </button>
        </div>
      )}
    </div>
  );
}

function LockIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
function EyeIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>; }
function EyeOffIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>; }
