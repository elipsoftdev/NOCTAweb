
const solutionData = {
  access: {
    icon: "⌾",
    title: "Control de acceso inteligente",
    text: "Gestiona, valida y registra cada acceso desde una sola plataforma.",
    features: ["Invitaciones digitales","Validación por QR","Roles y permisos","Historial auditable"]
  },
  vision: {
    icon: "◉",
    title: "Monitoreo de cámaras con IA",
    text: "Convierte cámaras IP existentes en sensores inteligentes de seguridad.",
    features: ["Personas y vehículos","Zonas virtuales","Alertas a Guard","Incidentes en Admin"]
  }
};
document.querySelectorAll(".solution-card").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".solution-card").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const d=solutionData[btn.dataset.solution];
    document.getElementById("selectedIcon").textContent=d.icon;
    document.getElementById("selectedTitle").textContent=d.title;
    document.getElementById("selectedText").textContent=d.text;
    document.getElementById("selectedFeatures").innerHTML=d.features.map(x=>`<span>${x}</span>`).join("");
  });
});

const accessData = [
  ["01","Residente autoriza","Desde NOCTA Resident se crea la invitación para visitante, proveedor o familiar."],
  ["02","NOCTA genera el pase","La plataforma asocia el pase a comunidad, unidad, fecha, permisos y vigencia."],
  ["03","Guard valida el QR","El personal de seguridad escanea el código y recibe una respuesta operacional clara."],
  ["04","Admin conserva trazabilidad","La operación queda registrada para auditoría, consulta e investigación posterior."]
];
let currentAccess = 0;
function setAccess(i){
  currentAccess=i;
  document.querySelectorAll(".access-step").forEach((x,idx)=>x.classList.toggle("active",idx===i));
  document.getElementById("accessIcon").textContent=accessData[i][0];
  document.getElementById("accessTitle").textContent=accessData[i][1];
  document.getElementById("accessDescription").textContent=accessData[i][2];
}
document.querySelectorAll(".access-step").forEach((btn,i)=>btn.addEventListener("click",()=>setAccess(i)));
document.getElementById("nextAccess").addEventListener("click",()=>setAccess((currentAccess+1)%accessData.length));

const scenarios = {
  person:{camera:"Entrada principal",risk:"Medio",label:"PERSONA DETECTADA",text:"Persona detectada cerca del punto de control.",response:"Guard recibe alerta con captura y ubicación.",box:[23,29,120,160]},
  vehicle:{camera:"Acceso vehicular",risk:"Medio",label:"VEHÍCULO DETECTADO",text:"Vehículo cruza línea virtual de entrada.",response:"NOCTA busca acceso autorizado asociado.",box:[35,38,210,105]},
  zone:{camera:"Perímetro norte",risk:"Alto",label:"ZONA RESTRINGIDA",text:"Objeto entra en polígono restringido.",response:"Admin registra incidente y seguimiento.",box:[57,24,135,185]},
  time:{camera:"Zona común",risk:"Alto",label:"FUERA DE HORARIO",text:"Movimiento detectado en horario no permitido.",response:"Se activa regla de seguridad nocturna.",box:[42,33,150,165]}
};
document.querySelectorAll(".scenario").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".scenario").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    const d=scenarios[btn.dataset.scenario];
    document.getElementById("cameraName").textContent="Cámara: "+d.camera;
    document.getElementById("riskLevel").textContent="Riesgo: "+d.risk;
    document.getElementById("detectionLabel").textContent=d.label;
    document.getElementById("detectionText").textContent=d.text;
    document.getElementById("responseText").textContent=d.response;
    const box=document.getElementById("detectionBox");
    box.style.left=d.box[0]+"%"; box.style.top=d.box[1]+"%"; box.style.width=d.box[2]+"px"; box.style.height=d.box[3]+"px";
  });
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
