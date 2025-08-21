'use client';
import {useState} from 'react';
export default function Login(){
  const[mode,setMode]=useState('login'); const[msg,setMsg]=useState(''); const[loading,setLoading]=useState(false);
  async function submit(e:any){
    e.preventDefault(); setMsg(''); setLoading(true);
    const data=Object.fromEntries(new FormData(e.target).entries());
    const endpoint=mode==='login'?'/api/auth/login':'/api/auth/register';
    const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const json=await res.json(); setLoading(false);
    if(res.ok) location.href='/'; else setMsg(json.error||'حدث خطأ');
  }
  return(<div className='container'>
    <div className='mb-3'><a className='btn' href='/'>← رجوع</a></div>
    <div className='card p-4'>
      <div className='flex gap-2 mb-3'>
        <button className={`btn ${mode==='login'?'opacity-100':'opacity-60'}`} onClick={()=>setMode('login')}>تسجيل الدخول</button>
        <button className={`btn ${mode==='signup'?'opacity-100':'opacity-60'}`} onClick={()=>setMode('signup')}>مستخدم جديد</button>
      </div>
      <form onSubmit={submit} className='grid gap-3'>
        <input name='username' placeholder='اسم المستخدم' required className='input'/>
        <input name='password' type='password' placeholder='كلمة المرور' required className='input'/>
        {mode==='signup'&&(<><input name='phone' placeholder='الهاتف' className='input'/><input name='city' placeholder='المدينة' className='input'/></>)}
        <button className='btn' type='submit' disabled={loading}>{loading?'جارٍ...':mode==='login'?'دخول':'تسجيل'}</button>
        {msg&&<div className='text-red-600 text-sm'>{msg}</div>}
      </form>
    </div>
  </div>)
}
