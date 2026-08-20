import { demoData, defaultState } from './data/demo-data.js';

const storageKey = 'nocta-guard-demo-v1';
const app = document.querySelector('#app');
const load = () => {
  try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(storageKey)) }; } catch { return defaultState(); }
};
let state = load();
let reconcileTimer;
const save = () => localStorage.setItem(storageKey, JSON.stringify(state));
const set = (next) => { state = { ...state, ...next }; save(); render(); };
const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' })[char]);
const resident = () => demoData.residents.find((item) => item.id === state.manual.residentId) ?? demoData.residents[0];
const onlineChip = () => `<span class="connection-chip ${state.online ? '' : 'offline'}">${state.online ? 'En línea' : 'Sin conexión'}</span>`;
const header = (title, subtitle, back = 'home') => `<header class="app-header">${back ? `<button class="back" data-nav="${back}" aria-label="Volver">‹</button>` : ''}<div class="header-copy"><h1>${title}</h1><p>${subtitle}</p></div>${onlineChip()}</header>`;
const tabs = (active = 'home') => `<nav class="tabbar" aria-label="Navegación Guard"><button class="${active === 'home' ? 'active' : ''}" data-nav="home"><b>⌂</b>Inicio</button><button class="${active === 'inside' ? 'active' : ''}" data-nav="inside"><b>◉</b>Dentro</button><button class="${active === 'history' ? 'active' : ''}" data-nav="history"><b>▤</b>Bitácora</button></nav>`;
const frame = (content, active, title = 'NOCTA Guard', subtitle = demoData.guard.gate, back) => `<div class="app-frame">${header(title, subtitle, back)}<section class="view">${content}</section>${tabs(active)}</div>`;
const eventId = () => `demo-${Date.now()}`;
const manualCandidate = () => {
  const m = state.manual; const r = resident();
  return { id: `manual-${m.name.toLowerCase().replace(/\s+/g,'-') || 'visitor'}`, name: m.name || 'Visitante sin nombre', document: m.document || 'Documento no indicado', unit: r.unit, resident: r.name, reason: m.reason, credential: 'Registro manual', validUntil: 'Registro local', plate: m.vehicle ? m.plate || 'Sin placa' : null };
};
function recordAccess(candidate, direction = 'Entrada', origin = 'QR') {
  const event = { id: eventId(), name: candidate.name, unit: candidate.unit, direction, origin, time: new Intl.DateTimeFormat('es-VE',{hour:'2-digit',minute:'2-digit'}).format(new Date()), sync: state.online ? 'Sincronizado' : 'Pendiente de sincronizar' };
  state.events = [event, ...state.events];
  if (direction === 'Entrada') state.inside = [...state.inside.filter((item) => item.id !== candidate.id), candidate];
  else state.inside = state.inside.filter((item) => item.id !== candidate.id);
  state.message = state.online ? 'El movimiento quedó sincronizado.' : 'El movimiento quedó guardado localmente y espera conciliación.';
  state.screen = 'success'; state.success = { candidate, direction, event }; save(); render();
}
function reconcile() {
  state.events = state.events.map((item) => item.sync === 'Pendiente de sincronizar' ? { ...item, sync: 'Sincronizando' } : item);
  state.message = 'Los movimientos pendientes se están sincronizando.'; save(); render();
  window.clearTimeout(reconcileTimer);
  reconcileTimer = window.setTimeout(() => {
    if (!state.online) return;
    state.events = state.events.map((item) => item.sync === 'Sincronizando' ? { ...item, sync: 'Sincronizado' } : item);
    state.message = 'Los movimientos pendientes se conciliaron automáticamente.'; save(); render();
  }, 800);
}
function home() {
  return frame(`<div class="home"><div class="guard-profile"><span class="avatar">ER</span><span><b>${demoData.guard.name}</b><span>${demoData.guard.community}</span></span></div><div class="status-row"><article class="status"><span class="dot ${state.online ? '' : 'offline'}"></span>Servicio<b>${state.online ? 'Operativo' : 'Modo offline'}</b></article><article class="status">Puesto<b>${demoData.guard.gate}</b></article></div><section class="hero-action"><div class="scan-mark">⌗</div><h2>Escanear pase</h2><p>Verifica una invitación o una credencial personal con un resultado claro.</p><button class="primary" data-nav="scanner">Ir al escáner</button></section><button class="manual-entry" data-nav="manual"><span><strong>Registrar visitante</strong><small>Ingreso sin QR, con datos y autorización.</small></span><i>›</i></button><div class="home-links"><button class="text-action" data-nav="inside"><b>Personas dentro</b>${state.inside.length} registro${state.inside.length === 1 ? '' : 's'} activo${state.inside.length === 1 ? '' : 's'}</button><button class="text-action" data-nav="history"><b>Bitácora</b>${state.events.filter((item) => item.sync !== 'Sincronizado').length} pendiente${state.events.filter((item) => item.sync !== 'Sincronizado').length === 1 ? '' : 's'}</button></div></div>`, 'home', 'NOCTA Guard', demoData.guard.gate, null);
}
function scanner() {
  return frame(`<div class="scanner"><div class="scanner-window" aria-label="Simulación visual de cámara"><div class="scan-frame"></div></div><div><span class="eyebrow">SIMULADOR DE ESCANEO</span><p class="denied-copy">Selecciona un caso para continuar. No necesitas cámara ni un código externo.</p></div><div class="scenario-grid"><button class="scenario valid" data-scan="valid">QR válido<small>Visitante autorizado</small></button><button class="scenario expired" data-scan="expired">QR vencido<small>Fuera de vigencia</small></button><button class="scenario revoked" data-scan="revoked">QR revocado<small>No debe autorizarse</small></button><button class="scenario invalid" data-scan="invalid">QR inválido<small>No verificable</small></button><button class="scenario resident" data-scan="resident">QR residente<small>Credencial personal</small></button></div></div>`, 'home', 'Escáner', 'Alinea el código dentro del marco', 'home');
}
function candidateDetails(candidate) {
  return `<section class="identity"><div class="identity-top"><span class="avatar">${candidate.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</span><span><h2>${esc(candidate.name)}</h2><p>${esc(candidate.document)}</p></span></div><span class="credential">${esc(candidate.credential)}</span><ul class="details"><li><span>Destino</span><b>${esc(candidate.unit)}</b></li><li><span>${candidate.credential === 'Credencial personal' ? 'Tipo' : 'Residente'}</span><b>${esc(candidate.resident)}</b></li><li><span>Motivo</span><b>${esc(candidate.reason)}</b></li><li><span>Vigencia</span><b>${esc(candidate.validUntil)}</b></li>${candidate.plate ? `<li><span>Placa</span><b>${esc(candidate.plate)}</b></li>` : ''}</ul></section>`;
}
function verdict() {
  const candidate = state.candidate;
  if (!candidate) return home();
  if (candidate.kind === 'invalid' || candidate.kind === 'expired' || candidate.kind === 'revoked') {
    const expired = candidate.kind === 'expired'; const revoked = candidate.kind === 'revoked';
    return frame(`<div class="verdict"><section class="verdict-banner denied"><div class="symbol">×</div><b>${revoked ? 'PASE REVOCADO' : expired ? 'PASE VENCIDO' : 'QR NO VÁLIDO'}</b><small>${revoked ? 'El pase fue revocado y no debe autorizarse.' : expired ? 'La vigencia del pase ya terminó.' : 'El código no superó la validación local.'}</small></section><p class="denied-copy">${revoked || expired ? 'No se puede registrar un acceso con este pase.' : 'Intenta nuevamente con un código válido o usa el registro manual.'}</p><button class="secondary" data-nav="scanner">Volver al escáner</button>${!expired && !revoked ? '<button class="primary" data-nav="manual">Registrar visitante</button>' : ''}</div>`, 'home', 'Resultado de validación', 'El acceso no está autorizado', 'scanner');
  }
  return frame(`<div class="verdict"><section class="verdict-banner allowed"><div class="symbol">✓</div><b>ACCESO PERMITIDO</b><small>La validación de este demo fue exitosa.</small></section>${candidateDetails(candidate)}<button class="primary" data-nav="record">Continuar con entrada o salida</button><button class="secondary" data-nav="scanner">Escanear otro pase</button></div>`, 'home', 'Resultado de validación', 'Verificación completada', 'scanner');
}
function record() {
  const candidate = state.candidate;
  if (!candidate) return home();
  const direction = state.direction ?? 'Entrada';
  return frame(`<div class="record">${candidateDetails(candidate)}<div class="direction-toggle"><button class="${direction === 'Entrada' ? 'active' : ''}" data-direction="Entrada">↳ Entrada</button><button class="${direction === 'Salida' ? 'active' : ''}" data-direction="Salida">↲ Salida</button></div>${!state.online ? '<div class="notice">Sin red: el movimiento se guardará localmente como pendiente de sincronizar.</div>' : ''}<button class="primary" data-record="${direction}">Registrar ${direction.toLowerCase()}</button></div>`, 'home', 'Confirmar movimiento', 'El registro se guarda primero en este dispositivo', 'verdict');
}
function manual() {
  const m = state.manual; const selected = resident();
  return frame(`<form class="form" id="manualForm"><span class="eyebrow">REGISTRO MANUAL</span><p class="denied-copy">Los campos reproducen el registro de visitante de Guard. La autorización se documenta en el siguiente paso.</p><label class="field">Nombres y apellidos<input name="name" required value="${esc(m.name)}" placeholder="Nombre del visitante" /></label><div class="split"><label class="field">Documento<input name="document" value="${esc(m.document)}" placeholder="V-12345678" /></label><label class="field">Teléfono<input name="phone" value="${esc(m.phone)}" placeholder="Opcional" /></label></div><label class="field">Unidad destino<select name="residentId">${demoData.residents.map((item) => `<option value="${item.id}" ${item.id === m.residentId ? 'selected' : ''}>${item.unit}</option>`).join('')}</select></label><label class="field">Motivo<select name="reason">${['Visita','Entrega','Proveedor','Técnico','Emergencia','Otro'].map((item) => `<option ${item === m.reason ? 'selected' : ''}>${item}</option>`).join('')}</select></label><label class="check-field"><input name="vehicle" type="checkbox" ${m.vehicle ? 'checked' : ''}/>Ingreso vehicular</label>${m.vehicle ? '<label class="field">Placa<input name="plate" value="'+esc(m.plate)+'" placeholder="AA1-2B3" /></label>' : ''}<div class="notice">Destino: ${esc(selected.unit)}. Se usa el roster local ficticio del demo.</div><button class="primary" type="submit">Documentar autorización</button></form>`, 'home', 'Registrar visitante', 'Sin QR preparado', 'home');
}
function authorization() {
  const m = state.manual; const methods = ['Llamada telefónica', 'Autorizado por admin', 'Estaba en prelista', 'Excepcional'];
  return frame(`<form class="auth" id="authorizationForm"><section class="auth-card"><span class="eyebrow">REGISTRO MANUAL</span><h2>Método de autorización</h2><p>Documenta cómo se autorizó este ingreso. Esta selección es local: no llama, notifica ni espera respuesta de otra persona.</p><div class="authorization-options">${methods.map((method) => `<button type="button" class="authorization-option ${m.authorization === method ? 'selected' : ''}" data-authorization="${method}" aria-pressed="${m.authorization === method}">${method}</button>`).join('')}</div>${m.authorization === 'Excepcional' ? '<label class="field">Nota de autorización<input name="authorizationNote" required value="'+esc(m.authorizationNote)+'" placeholder="Explica la excepción" /></label>' : ''}<div class="notice">Requisitos del punto de acceso: no hay requisitos adicionales en este ingreso ficticio.</div><button class="primary" type="submit">Ver resumen</button></section></form>`, 'home', 'Registrar visitante', 'Documenta la autorización', 'manual');
}
function manualSummary() {
  const candidate = state.candidate ?? manualCandidate(); const m = state.manual;
  return frame(`<div class="manual-summary"><span class="eyebrow">RESUMEN DEL INGRESO</span>${candidateDetails(candidate)}<section class="summary-card"><div><span>Autorización</span><b>${esc(m.authorization)}</b></div>${m.authorization === 'Excepcional' ? `<div><span>Nota</span><b>${esc(m.authorizationNote)}</b></div>` : ''}<div><span>Requisitos</span><b>Sin requisitos adicionales</b></div></section><button class="primary" data-nav="record">Continuar a registrar acceso</button></div>`, 'home', 'Registrar visitante', 'Revisa antes de registrar', 'authorization');
}
function inside() {
  return frame(`<div class="list">${state.inside.length ? state.inside.map((item) => `<button class="list-item" data-exit="${item.id}"><span class="avatar">${item.name.split(' ').map((part) => part[0]).join('').slice(0,2)}</span><span class="item-main"><b>${esc(item.name)}</b><small>${esc(item.unit)} · ${esc(item.reason)}</small></span><span class="right">Registrar<br/>salida ›</span></button>`).join('') : '<div class="empty">No hay visitantes dentro en este demo.</div>'}</div>`, 'inside', 'Personas dentro', 'Selecciona un registro para marcar salida', 'home');
}
function history() {
  return frame(`<div class="list">${state.events.map((item) => `<article class="list-item"><span class="avatar">${item.direction === 'Entrada' ? '↳' : '↲'}</span><span class="item-main"><b>${esc(item.name)}</b><small>${esc(item.direction)} · ${esc(item.unit)} · ${esc(item.origin)}</small></span><span class="right ${item.sync !== 'Sincronizado' ? 'pending' : ''}">${esc(item.time)}<br/>${esc(item.sync)}</span></article>`).join('')}</div>`, 'history', 'Bitácora', `${state.events.filter((item) => item.sync !== 'Sincronizado').length} movimiento(s) pendiente(s)`, 'home');
}
function success() {
  const result = state.success; if (!result) return home();
  const isExit = result.direction === 'Salida';
  return frame(`<div class="success"><div class="success-content"><div class="success-icon">✓</div><span class="eyebrow">MOVIMIENTO REGISTRADO</span><h2>${isExit ? 'Salida registrada' : 'Acceso autorizado'}</h2><p>${esc(result.candidate.name)} · ${esc(result.candidate.unit)}<br/>${esc(state.message || '')}</p><button class="primary" data-nav="${isExit ? 'history' : 'inside'}">${isExit ? 'Ver bitácora' : 'Ver personas dentro'}</button><button class="secondary" data-nav="home">Volver al inicio</button></div></div>`, 'home', 'NOCTA Guard', 'Registro local del demo', 'home');
}
function render() {
  document.querySelector('#connectionToggle').checked = !state.online;
  document.querySelector('#connectionLabel').textContent = state.online ? 'En línea' : 'Sin conexión';
  document.querySelector('#connectionDescription').textContent = state.online ? 'Los registros se concilian automáticamente.' : 'Los movimientos quedan pendientes en este navegador.';
  app.innerHTML = ({ home, scanner, verdict, record, manual, authorization, manualSummary, inside, history, success }[state.screen] ?? home)();
  app.focus({ preventScroll: true });
}
document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-nav],[data-scan],[data-direction],[data-record],[data-authorization],[data-exit],[data-action]'); if (!target) return;
  if (target.dataset.nav) set({ screen: target.dataset.nav });
  if (target.dataset.scan) {
    const type = target.dataset.scan; const candidate = type === 'valid' ? demoData.visitors.valid : type === 'revoked' ? demoData.visitors.revoked : type === 'resident' ? demoData.residentCredential : { kind: type };
    set({ candidate, screen: 'verdict', direction: 'Entrada' });
  }
  if (target.dataset.direction) set({ direction: target.dataset.direction });
  if (target.dataset.record) recordAccess(state.candidate, target.dataset.record, state.candidate.credential === 'Registro manual' ? 'Manual' : 'QR');
  if (target.dataset.authorization) set({ manual: { ...state.manual, authorization: target.dataset.authorization, authorizationNote: target.dataset.authorization === 'Excepcional' ? state.manual.authorizationNote : '' } });
  if (target.dataset.exit) { const candidate = state.inside.find((item) => item.id === target.dataset.exit); set({ candidate, screen: 'record', direction: 'Salida' }); }
  if (target.dataset.action === 'reset') { state = defaultState(); save(); render(); }
});
document.addEventListener('submit', (event) => {
  if (event.target.id === 'manualForm') { event.preventDefault(); const form = new FormData(event.target); state.manual = { ...state.manual, name: form.get('name').trim(), document: form.get('document').trim(), phone: form.get('phone').trim(), residentId: form.get('residentId'), reason: form.get('reason'), vehicle: form.get('vehicle') === 'on', plate: form.get('plate')?.trim() ?? '' }; set({ screen: 'authorization' }); }
  if (event.target.id === 'authorizationForm') { event.preventDefault(); const form = new FormData(event.target); const authorizationNote = form.get('authorizationNote')?.trim() ?? ''; if (!state.manual.authorization || (state.manual.authorization === 'Excepcional' && !authorizationNote)) return; state.manual = { ...state.manual, authorizationNote }; set({ candidate: manualCandidate(), screen: 'manualSummary', direction: 'Entrada' }); }
});
document.addEventListener('change', (event) => { if (!event.target.matches('#manualForm [name="vehicle"]')) return; const form = new FormData(event.target.form); state.manual = { ...state.manual, name: form.get('name').trim(), document: form.get('document').trim(), phone: form.get('phone').trim(), residentId: form.get('residentId'), reason: form.get('reason'), vehicle: event.target.checked, plate: form.get('plate')?.trim() ?? '' }; save(); window.setTimeout(render, 50); });
document.querySelector('#connectionToggle').addEventListener('change', (event) => { const online = !event.target.checked; window.clearTimeout(reconcileTimer); state.online = online; save(); render(); if (online) reconcile(); });
render();
