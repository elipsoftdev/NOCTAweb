export const demoData = {
  guard: {
    name: 'Porfirio Torres',
    communityCode: 'MEDE',
    community: 'Multicentro Empresarial del Este',
    shift: '7:00 a.m. – 7:00 p.m.',
    gate: 'Acceso principal',
  },
  residents: [
    { id: 'resident-lucia', name: 'Lucía Andrade', unit: 'Torre A · Apto 4B' },
    { id: 'resident-daniel', name: 'Daniel Herrera', unit: 'Torre B · Apto 7C' },
  ],
  visitors: {
    valid: {
      id: 'visitor-valentina', name: 'Valentina Méndez', document: 'V-21•••84',
      unit: 'Torre A · Apto 4B', resident: 'Lucía Andrade', reason: 'Visita',
      credential: 'Pase de visitante', validUntil: 'Hoy · 22:30', plate: null,
    },
    expired: {
      id: 'visitor-pablo', name: 'Pablo Acosta', document: 'V-18•••07',
      unit: 'Torre B · Apto 7C', resident: 'Daniel Herrera', reason: 'Visita',
      credential: 'Pase de visitante', validUntil: 'Ayer · 18:00', plate: null,
    },
    revoked: {
      id: 'visitor-ines', name: 'Inés Valera', document: 'V-20•••51', kind: 'revoked',
      unit: 'Torre A · Apto 4B', resident: 'Lucía Andrade', reason: 'Visita',
      credential: 'Pase de visitante', validUntil: 'Revocado', plate: null,
    },
    inside: {
      id: 'visitor-julian', name: 'Julián Salas', document: 'V-24•••16',
      unit: 'Torre B · Apto 7C', resident: 'Daniel Herrera', reason: 'Servicio técnico',
      credential: 'Registro manual', validUntil: '—', plate: 'AC7-4M2',
    },
  },
  residentCredential: {
    id: 'resident-lucia', name: 'Lucía Andrade', document: 'V-12•••45',
    unit: 'Torre A · Apto 4B', resident: 'Residente', reason: 'Acceso personal',
    credential: 'Credencial personal', validUntil: 'Código activo', plate: null,
  },
  history: [
    { id: 'h-1', name: 'Sofía Villar', unit: 'Torre A · Apto 2A', direction: 'Entrada', origin: 'QR', time: '08:12', sync: 'Sincronizado' },
    { id: 'h-2', name: 'Andrés Gil', unit: 'Torre B · Apto 8A', direction: 'Salida', origin: 'QR', time: '07:58', sync: 'Sincronizado' },
  ],
};

export const defaultState = () => ({
  screen: 'home',
  online: true,
  events: structuredClone(demoData.history),
  inside: [structuredClone(demoData.visitors.inside)],
  candidate: null,
  manual: { name: '', document: '', phone: '', residentId: 'resident-lucia', reason: 'Visita', vehicle: false, plate: '', authorization: '', authorizationNote: '' },
  message: null,
});
