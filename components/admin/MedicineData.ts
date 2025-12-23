const MEDICINES_KEY = 'medicines';

export function loadMedicines() {
  const raw = localStorage.getItem(MEDICINES_KEY);
  if (raw) return JSON.parse(raw);
  const initial = [
    {
      id: 'med-drepto-relief',
      name: 'Drepto Surveda Relief',
      brand: 'Drepto Biodevices',
      price: 100,
      mrp: 200,
      packSize: '2 Patches',
      imageUrl: '/images/drepto-surveda-relief.png',
      images: [],
      description: 'The most sophisticated and safest method of treating pain and inflammation. Powerful (NSAID) & Anti-Inflammatory Patch. Post Surgery Pain Relief. Recovery from minor or major strains, sprains & bruises.',
      contains: 'Diclofenac Diethylamine BP 200mg (size 70sq cm)',
      therapy: 'Pain Relief',
      uses: ['Deformas Arthritis', 'Scapula inflammation', 'Tennis Elbow', 'Peritendinitis', 'Tendon Tenovaginitis', 'Swelling', 'Pain after Trauma (bruise, strain or sprain etc)'],
      contraindications: ['History of Aspirin induced Asthma', 'Hypersensitivity to the drug', 'Safety in paediatric patients has not been established', 'Pregnancy (large dose or long term use should be avoided)'],
      sideEffects: [],
      precautions: [
        { title: 'Pregnancy', advice: 'Avoid large dose or long term use. Consult a doctor before use.' },
        { title: 'Paediatric', advice: 'Safety not established. Consult a doctor before use.' }
      ],
      howToUse: 'One patch to be applied for 24 hours. Open the pouch, remove the patch, peel liners off, apply the patch, dispose in the bin.',
      storage: 'Store in a cool dry place away from light and moisture.',
      quickTips: [
        'Dosage: one patch to be applied for 24 hours',
        'Active 24h relief'
      ],
      dosage: {
        overdose: '',
        missedDose: ''
      },
      modeOfAction: 'Inhibits prostaglandin synthesis.',
      interactions: '',
      productFaqs: []
    }
  ];
  localStorage.setItem(MEDICINES_KEY, JSON.stringify(initial));
  return initial;
}

export function saveMedicines(items) {
  localStorage.setItem(MEDICINES_KEY, JSON.stringify(items));
}
