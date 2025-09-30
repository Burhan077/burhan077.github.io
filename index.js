// Background
VANTA.GLOBE({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: "#3b82f6",
  backgroundColor: "#111827",
  size: 0.8
});

// --- Isotope Database ---
const isotopeDatabase = {
  // Uranium-238 series
  "Uranium-238": { halfLife: 4.468e9, unit: "years", decayChain: ["Thorium-234"] },
  "Thorium-234": { halfLife: 24.1, unit: "days", decayChain: ["Protactinium-234"] },
  "Protactinium-234": { halfLife: 6.69, unit: "hours", decayChain: ["Uranium-234"] },
  "Uranium-234": { halfLife: 2.455e5, unit: "years", decayChain: ["Thorium-230"] },
  "Thorium-230": { halfLife: 7.538e4, unit: "years", decayChain: ["Radium-226"] },
  "Radium-226": { halfLife: 1600, unit: "years", decayChain: ["Radon-222"] },
  "Radon-222": { halfLife: 3.82, unit: "days", decayChain: ["Polonium-218"] },
  "Polonium-218": { halfLife: 3.1, unit: "minutes", decayChain: ["Lead-214"] },
  "Lead-214": { halfLife: 26.8, unit: "minutes", decayChain: ["Bismuth-214"] },
  "Bismuth-214": { halfLife: 19.9, unit: "minutes", decayChain: ["Polonium-214"] },
  "Polonium-214": { halfLife: 164e-6, unit: "seconds", decayChain: ["Lead-210"] },
  "Lead-210": { halfLife: 22.3, unit: "years", decayChain: ["Bismuth-210"] },
  "Bismuth-210": { halfLife: 5.01, unit: "days", decayChain: ["Polonium-210"] },
  "Polonium-210": { halfLife: 138.4, unit: "days", decayChain: ["Lead-206"] },
  "Lead-206": { halfLife: Infinity, unit: "stable", decayChain: [] },

  // Uranium-235 series
  "Uranium-235": { halfLife: 7.04e8, unit: "years", decayChain: ["Thorium-231"] },
  "Thorium-231": { halfLife: 25.5, unit: "hours", decayChain: ["Protactinium-231"] },
  "Protactinium-231": { halfLife: 3.276e4, unit: "years", decayChain: ["Actinium-227"] },
  "Actinium-227": { halfLife: 21.8, unit: "years", decayChain: ["Thorium-227"] },
  "Thorium-227": { halfLife: 18.7, unit: "days", decayChain: ["Radium-223"] },
  "Radium-223": { halfLife: 11.4, unit: "days", decayChain: ["Radon-219"] },
  "Radon-219": { halfLife: 3.96, unit: "seconds", decayChain: ["Polonium-215"] },
  "Polonium-215": { halfLife: 1.78e-3, unit: "seconds", decayChain: ["Lead-211"] },
  "Lead-211": { halfLife: 36.1, unit: "minutes", decayChain: ["Bismuth-211"] },
  "Bismuth-211": { halfLife: 2.14, unit: "minutes", decayChain: ["Thallium-207"] },
  "Thallium-207": { halfLife: 4.77, unit: "minutes", decayChain: ["Lead-207"] },
  "Lead-207": { halfLife: Infinity, unit: "stable", decayChain: [] },

  // Thorium-232 series
  "Thorium-232": { halfLife: 1.405e10, unit: "years", decayChain: ["Radium-228"] },
  "Radium-228": { halfLife: 5.75, unit: "years", decayChain: ["Actinium-228"] },
  "Actinium-228": { halfLife: 6.15, unit: "hours", decayChain: ["Thorium-228"] },
  "Thorium-228": { halfLife: 1.91, unit: "years", decayChain: ["Radium-224"] },
  "Radium-224": { halfLife: 3.66, unit: "days", decayChain: ["Radon-220"] },
  "Radon-220": { halfLife: 55.6, unit: "seconds", decayChain: ["Polonium-216"] },
  "Polonium-216": { halfLife: 0.145, unit: "seconds", decayChain: ["Lead-212"] },
  "Lead-212": { halfLife: 10.6, unit: "hours", decayChain: ["Bismuth-212"] },
  "Bismuth-212": { halfLife: 60.6, unit: "minutes", decayChain: ["Polonium-212", "Thallium-208"] },
  "Polonium-212": { halfLife: 0.3e-6, unit: "seconds", decayChain: ["Lead-208"] },
  "Thallium-208": { halfLife: 3.05, unit: "minutes", decayChain: ["Lead-208"] },
  "Lead-208": { halfLife: Infinity, unit: "stable", decayChain: [] },

  // Other isotopes (sample)
  "Carbon-14": { halfLife: 5730, unit: "years", decayChain: ["Nitrogen-14"] },
  "Iodine-131": { halfLife: 8.02, unit: "days", decayChain: ["Xenon-131"] },
  "Cobalt-60": { halfLife: 5.27, unit: "years", decayChain: ["Nickel-60"] },
  "Cesium-137": { halfLife: 30.17, unit: "years", decayChain: ["Barium-137m"] },
  "Barium-137m": { halfLife: 2.55, unit: "minutes", decayChain: ["Barium-137"] },
  "Technetium-99m": { halfLife: 6.01, unit: "hours", decayChain: ["Technetium-99"] },
  "Technetium-99": { halfLife: 2.11e5, unit: "years", decayChain: ["Ruthenium-99"] },
  "Strontium-90": { halfLife: 28.8, unit: "years", decayChain: ["Yttrium-90"] },
  "Yttrium-90": { halfLife: 64, unit: "hours", decayChain: ["Zirconium-90"] },
  "Plutonium-239": { halfLife: 2.41e4, unit: "years", decayChain: ["Uranium-235"] },
  "Iodine-129": { halfLife: 1.57e7, unit: "years", decayChain: ["Xenon-129"] },
  "Tritium": { halfLife: 12.32, unit: "years", decayChain: ["Helium-3"] },
  "Deuterium": { halfLife: Infinity, unit: "stable", decayChain: [] },
  "Helium-3": { halfLife: Infinity, unit: "stable", decayChain: [] },
  "Helium-4": { halfLife: Infinity, unit: "stable", decayChain: [] },
  "Neutron": { halfLife: 14.7, unit: "minutes", decayChain: ["Proton", "Electron", "Antineutrino"] },
  "Proton": { halfLife: Infinity, unit: "stable", decayChain: [] },
  "Electron": { halfLife: Infinity, unit: "stable", decayChain: [] },
  "Antineutrino": { halfLife: Infinity, unit: "stable", decayChain: [] },
  "Fluorine-18": { halfLife: 109.8, unit: "minutes", decayChain: ["Oxygen-18"] },
  "Oxygen-18": { halfLife: Infinity, unit: "stable", decayChain: [] }
};

// --- Helpers ---
function convertToYears(value, unit) {
  const conversion = {
    seconds: 1 / (60 * 60 * 24 * 365),
    minutes: 1 / (60 * 24 * 365),
    hours: 1 / (24 * 365),
    days: 1 / 365,
    years: 1,
    stable: Infinity
  };
  return value * (conversion[unit] || 1);
}

function formatHalfLife(value, unit) {
  if (unit === "stable") return "Stable";
  return `${value} ${unit}`;
}

// --- Search Suggestions ---
const searchInput = document.getElementById("isotope-search");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  if (!query) {
    suggestionsBox.classList.add("hidden");
    return;
  }

  const matches = Object.keys(isotopeDatabase).filter(key =>
    key.toLowerCase().includes(query)
  );
  if (matches.length === 0) {
    suggestionsBox.classList.add("hidden");
    return;
  }

  matches.forEach(match => {
    const div = document.createElement("div");
    div.textContent = match;
    div.className = "px-4 py-2 hover:bg-gray-700 cursor-pointer";
    div.addEventListener("click", () => {
      searchInput.value = match;
      suggestionsBox.classList.add("hidden");
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.classList.remove("hidden");
});

// --- Calculate Decay ---
document.getElementById("calculate-btn").addEventListener("click", () => {
  const isotopeName = searchInput.value.trim();
  if (!isotopeDatabase[isotopeName]) {
    alert("Please select a valid isotope from the list.");
    return;
  }

  const isotope = isotopeDatabase[isotopeName];
  const timeValue = parseFloat(document.getElementById("time-value").value) || 0;
  const timeUnit = document.getElementById("time-unit").value;
  const initialNuclei = parseInt(document.getElementById("initial-nuclei").value) || 1;

  const timeInYears = convertToYears(timeValue, timeUnit);
  const halfLifeInYears = convertToYears(isotope.halfLife, isotope.unit);

  let decayProbability = 0;
  let remainingNuclei = initialNuclei;

  if (isotope.unit !== "stable") {
    const decayConstant = Math.log(2) / halfLifeInYears;
    decayProbability = 1 - Math.exp(-decayConstant * timeInYears);
    remainingNuclei = initialNuclei * Math.exp(-decayConstant * timeInYears);
  }

  document.getElementById("decay-probability").textContent =
    (decayProbability * 100).toFixed(2) + "%";
  document.getElementById("remaining-nuclei").textContent =
    remainingNuclei.toFixed(2);

  const chainDiv = document.getElementById("decay-chain");
  chainDiv.innerHTML = "";
  isotope.decayChain.forEach((step, i) => {
    const div = document.createElement("div");
    div.className = "decay-chain-item p-3 rounded-lg bg-gray-700 border border-gray-600";
    div.innerHTML = `<strong class="text-green-300">Step ${i + 1}:</strong> ${step}`;
    chainDiv.appendChild(div);
  });

  const interpretation = `For ${isotopeName} with half-life ${formatHalfLife(
    isotope.halfLife,
    isotope.unit
  )}, after ${timeValue} ${timeUnit}, about ${(
    decayProbability * 100
  ).toFixed(2)}% of nuclei have decayed.`;
  document.getElementById("interpretation").textContent = interpretation;

  document.getElementById("results-section").classList.remove("hidden");
});

feather.replace();
