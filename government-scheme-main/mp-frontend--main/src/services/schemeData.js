export const allSchemes = [
  {
    id: 1,
    nameKey: "schemes.pm_kisan.name",
    descKey: "schemes.pm_kisan.desc",
    score: 98,
    benefits: ["₹6000 per year", "Direct Benefit Transfer"],
    minAge: 18,
    maxAge: 75,
    occupations: ["Farmer", "Agriculture", "Other"],
    maxIncome: 5000000, // Increased to be more permissive for demo
    states: ["All", "Karnataka", "Maharashtra", "Tamil Nadu"]
  },
  {
    id: 2,
    nameKey: "schemes.kaushal_vikas.name",
    descKey: "schemes.kaushal_vikas.desc",
    score: 85,
    benefits: ["Skill Certification", "Placement Assistance"],
    minAge: 15,
    maxAge: 45,
    occupations: ["Student", "Unemployed", "Worker", "Other"],
    maxIncome: 1000000,
    states: ["All"]
  },
  {
    id: 3,
    name: "Sukanya Samriddhi Yojana",
    description: "Savings scheme for the girl child to provide a bright future and marriage expenses.",
    score: 90,
    benefits: ["High interest rate", "Tax benefits (80C)", "Long-term savings"],
    minAge: 0,
    maxAge: 80, // High for demo flexibility
    occupations: ["Any"],
    maxIncome: 9999999,
    states: ["All"],
    gender: "Female"
  },
  {
    id: 4,
    name: "PMEGP (Employment Gen)",
    description: "Credit linked subsidy program for setting up new micro-enterprises.",
    score: 75,
    benefits: ["Up to 35% subsidy", "Bank loan support"],
    minAge: 18,
    maxAge: 60,
    occupations: ["Entrepreneur", "Business", "Other"],
    maxIncome: 9999999,
    states: ["All"]
  },
  {
    id: 5,
    name: "Ayushman Bharat PM-JAY",
    description: "National Health Protection Scheme providing coverage of up to ₹5 lakh per family per year.",
    score: 95,
    benefits: ["₹5 Lakh Insurance", "Cashless treatment", "All pre-existing diseases"],
    minAge: 0,
    maxAge: 100,
    occupations: ["Any", "Worker", "Farmer"],
    maxIncome: 250000,
    states: ["All"]
  },
  {
    id: 6,
    name: "Atal Pension Yojana",
    description: "Pension scheme focused on the unorganized sector to provide a steady income after retirement.",
    score: 88,
    benefits: ["Fixed monthly pension", "Government contribution", "Death benefit to spouse"],
    minAge: 18,
    maxAge: 40,
    occupations: ["Worker", "Other", "Farmer"],
    maxIncome: 9999999,
    states: ["All"]
  },
  {
    id: 7,
    name: "PM Awas Yojana (Urban)",
    description: "Credit linked subsidy scheme for purchasing/constructing a house in urban areas.",
    score: 82,
    benefits: ["Interest subsidy", "Home ownership support", "Direct fund transfer"],
    minAge: 18,
    maxAge: 70,
    occupations: ["Any"],
    maxIncome: 1800000,
    states: ["All"]
  },
  {
    id: 8,
    name: "PM-SYM (Pension Scheme)",
    description: "Pradhan Mantri Shram Yogi Maandhan for unorganized workers.",
    score: 89,
    benefits: ["₹3000 monthly pension", "Safe retirement", "Gov matching contribution"],
    minAge: 18,
    maxAge: 40,
    occupations: ["Worker", "Daily Wage", "Farmer"],
    maxIncome: 180000,
    states: ["All"]
  },
  {
    id: 9,
    name: "National Social Assistance Programme",
    description: "Financial assistance to the elderly, widows and persons with disabilities.",
    score: 93,
    benefits: ["Monthly financial support", "Dignified living", "Social security"],
    minAge: 60,
    maxAge: 100,
    occupations: ["Any"],
    maxIncome: 120000,
    states: ["All"]
  }
];

export const filterSchemes = (user) => {
  if (!user) return allSchemes;
  
  return allSchemes.filter(s => {
    const age = parseInt(user.age) || 25;
    const income = parseInt(user.income) || 0;
    const occupation = user.occupation || "Other";
    const state = user.state || "All";
    const gender = user.gender || "Any";
    
    const ageMatch = age >= s.minAge && age <= s.maxAge;
    const incomeMatch = income <= s.maxIncome;
    const stateMatch = s.states.includes("All") || s.states.includes(state);
    
    // Very permissive occupation match for better UX
    const occupationMatch = s.occupations.includes("Any") || 
                           s.occupations.some(occ => occupation.toLowerCase().includes(occ.toLowerCase())) ||
                           occupation === "Other";

    const genderMatch = !s.gender || s.gender === "Any" || s.gender === gender;

    return ageMatch && incomeMatch && stateMatch && occupationMatch && genderMatch;
  });
};
