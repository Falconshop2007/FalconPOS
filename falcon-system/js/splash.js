/* Welcome animation + sticky title bar shadow */
(function(){const s=document.getElementById('splash'),hr=new Date().getHours(),g=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';
document.getElementById('gr').textContent=g+' — welcome to Falcon System 👋';
document.getElementById('clock').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const st=document.getElementById('st'),steps=['Starting Falcon System…','Loading stock…','Preparing POS…','Ready!'];
steps.forEach((t,i)=>setTimeout(()=>st.textContent=t,i*900));
setTimeout(()=>{s.classList.add('out');const a=document.getElementById('app');a.className='';void a.offsetWidth;a.className='in';setTimeout(()=>s.remove(),800)},3500);addEventListener('scroll',()=>document.querySelector('.top').classList.toggle('stuck',scrollY>4),{passive:true})})();
