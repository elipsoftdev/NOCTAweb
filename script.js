const accessData = [
  {
    number: "01",
    title: "Resident invita",
    role: "NOCTA Resident",
    visual: "resident-invite",
    description: "Desde NOCTA Resident se crea y comparte una invitación para la visita.",
    status: "Invitación creada",
    details: ["Visita definida", "Información inicial preparada", "Enlace listo para compartir"]
  },
  {
    number: "02",
    title: "Visit completa sus datos",
    role: "NOCTA Visit",
    visual: "visit-identify",
    description: "La persona invitada abre el enlace y completa la información requerida desde su teléfono.",
    status: "Información completada",
    details: ["Enlace recibido", "Datos requeridos completados", "Proceso listo para continuar"]
  },
  {
    number: "03",
    title: "Resident aprueba",
    role: "NOCTA Resident",
    visual: "resident-approve",
    description: "El residente revisa la solicitud y confirma la visita cuando el proceso lo requiere.",
    status: "Visita aprobada",
    details: ["Solicitud revisada", "Autorización confirmada", "Pase disponible para la visita"]
  },
  {
    number: "04",
    title: "Guard verifica",
    role: "NOCTA Guard",
    visual: "guard-verify",
    description: "En la entrada, Guard verifica el pase y recibe un estado operativo fácil de interpretar.",
    status: "Acceso verificado",
    details: ["Pase presentado", "Estado mostrado con claridad", "Decisión asociada al acceso"]
  },
  {
    number: "05",
    title: "Admin registra",
    role: "NOCTA Admin",
    visual: "admin-record",
    description: "La actividad del acceso queda disponible para supervisión y trazabilidad administrativa.",
    status: "Actividad registrada",
    details: ["Evento asociado al recorrido", "Actividad disponible para consulta", "Trazabilidad preservada"]
  }
];

const accessSteps = Array.from(document.querySelectorAll(".access-step"));
const accessOutput = document.getElementById("accessOutput");
const accessIcon = document.getElementById("accessIcon");
const accessTitle = document.getElementById("accessTitle");
const accessRole = document.getElementById("accessRole");
const accessDescription = document.getElementById("accessDescription");
const accessStatus = document.getElementById("accessStatus");
const accessDetails = document.getElementById("accessDetails");
const nextAccess = document.getElementById("nextAccess");
let currentAccess = 0;

function setAccess(index) {
  const data = accessData[index];
  if (!data) return;

  currentAccess = index;
  accessSteps.forEach((step, stepIndex) => {
    const isActive = stepIndex === index;
    step.classList.toggle("active", isActive);
    step.setAttribute("aria-pressed", String(isActive));
  });

  accessOutput.dataset.visual = data.visual;
  accessIcon.textContent = data.number;
  accessTitle.textContent = data.title;
  accessRole.textContent = data.role;
  accessDescription.textContent = data.description;
  accessStatus.textContent = data.status;
  accessDetails.replaceChildren(
    ...data.details.map((detail) => {
      const item = document.createElement("li");
      item.textContent = detail;
      return item;
    })
  );
}

accessSteps.forEach((step, index) => {
  step.addEventListener("click", () => setAccess(index));
});

nextAccess.addEventListener("click", () => {
  setAccess((currentAccess + 1) % accessData.length);
});

const scenarios = {
  person: {
    camera: "Entrada principal",
    attention: "Media",
    label: "PERSONA",
    text: "Persona detectada cerca del punto de control.",
    response: "Guard puede recibir una alerta con contexto.",
    box: [23, 29, 120, 160]
  },
  vehicle: {
    camera: "Acceso vehicular",
    attention: "Media",
    label: "VEHÍCULO",
    text: "Vehículo observado en el área de entrada.",
    response: "NOCTA Vision puede aportar contexto al evento.",
    box: [35, 38, 210, 105]
  },
  zone: {
    camera: "Perímetro norte",
    attention: "Alta",
    label: "ZONA RESTRINGIDA",
    text: "Actividad ilustrativa dentro de una zona restringida.",
    response: "Admin puede conservar el evento para seguimiento.",
    box: [57, 24, 135, 185]
  },
  time: {
    camera: "Zona común",
    attention: "Alta",
    label: "FUERA DE HORARIO",
    text: "Movimiento ilustrativo observado fuera del horario esperado.",
    response: "La situación puede presentarse al equipo responsable.",
    box: [42, 33, 150, 165]
  }
};

const scenarioButtons = Array.from(document.querySelectorAll(".scenario"));
const cameraName = document.getElementById("cameraName");
const riskLevel = document.getElementById("riskLevel");
const detectionLabel = document.getElementById("detectionLabel");
const detectionText = document.getElementById("detectionText");
const responseText = document.getElementById("responseText");
const detectionBox = document.getElementById("detectionBox");

function setScenario(button) {
  const data = scenarios[button.dataset.scenario];
  if (!data) return;

  scenarioButtons.forEach((scenarioButton) => {
    const isActive = scenarioButton === button;
    scenarioButton.classList.toggle("active", isActive);
    scenarioButton.setAttribute("aria-pressed", String(isActive));
  });

  cameraName.textContent = `Escenario: ${data.camera}`;
  riskLevel.textContent = `Atención: ${data.attention}`;
  detectionLabel.textContent = data.label;
  detectionText.textContent = data.text;
  responseText.textContent = data.response;
  detectionBox.style.left = `${data.box[0]}%`;
  detectionBox.style.top = `${data.box[1]}%`;
  detectionBox.style.width = `${data.box[2]}px`;
  detectionBox.style.height = `${data.box[3]}px`;
}

scenarioButtons.forEach((button) => {
  button.addEventListener("click", () => setScenario(button));
});

const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileNavLinks = Array.from(mobileNav.querySelectorAll("a"));

function setMobileMenu(isOpen) {
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  mobileNav.classList.toggle("is-open", isOpen);
  mobileNav.setAttribute("aria-hidden", String(!isOpen));
  mobileNavLinks.forEach((link) => {
    link.tabIndex = isOpen ? 0 : -1;
  });
  document.body.classList.toggle("menu-open", isOpen);
}

mobileMenuToggle.addEventListener("click", () => {
  setMobileMenu(mobileMenuToggle.getAttribute("aria-expanded") !== "true");
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenuToggle.getAttribute("aria-expanded") === "true") {
    setMobileMenu(false);
    mobileMenuToggle.focus();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (
    mobileMenuToggle.getAttribute("aria-expanded") === "true" &&
    !mobileNav.contains(event.target) &&
    !mobileMenuToggle.contains(event.target)
  ) {
    setMobileMenu(false);
  }
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
