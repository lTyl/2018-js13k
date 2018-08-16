/**
 * a = space
 * l = left
 * r = right
 * u = up
 * d = down
 */
a=u=r=d=l=0;onkeydown=(e)=>t(e,1);onkeyup=(e)=>t(e);t=(e,v,l,i)=>{for(i in l={u:[38,90,87],r:[39,68],d:[40,83],l:[37,65,81],a:[32]})if(l[i].includes(e.keyCode))top[i]=v}