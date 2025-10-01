VANTA.GLOBE({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: "#3b82f6",
            backgroundColor: "#f3f4f6",
            size: 0.8
        });

        const isotopeDatabase = {
            "Uranium-238": { symbol: "U-238", halfLife: 4.468e9, mass: 238, decays: [{ type: "α", product: "Thorium-234", branchingRatio: 1.0 }] },
            "Thorium-234": { symbol: "Th-234", halfLife: 24.1 / 365, mass: 234, decays: [{ type: "β⁻", product: "Protactinium-234", branchingRatio: 1.0 }] },
            "Protactinium-234": { symbol: "Pa-234", halfLife: 6.69 / (365 * 24), mass: 234, decays: [{ type: "β⁻", product: "Uranium-234", branchingRatio: 1.0 }] },
            "Uranium-234": { symbol: "U-234", halfLife: 2.455e5, mass: 234, decays: [{ type: "α", product: "Thorium-230", branchingRatio: 1.0 }] },
            "Thorium-230": { symbol: "Th-230", halfLife: 7.538e4, mass: 230, decays: [{ type: "α", product: "Radium-226", branchingRatio: 1.0 }] },
            "Radium-226": { symbol: "Ra-226", halfLife: 1600, mass: 226, decays: [{ type: "α", product: "Radon-222", branchingRatio: 1.0 }] },
            "Radon-222": { symbol: "Rn-222", halfLife: 3.8235 / 365, mass: 222, decays: [{ type: "α", product: "Polonium-218", branchingRatio: 1.0 }] },
            "Polonium-218": { symbol: "Po-218", halfLife: 3.10 / (365 * 24 * 60), mass: 218, decays: [{ type: "α", product: "Lead-214", branchingRatio: 0.9998 }, { type: "β⁻", product: "Astatine-218", branchingRatio: 0.0002 }] },
            "Lead-214": { symbol: "Pb-214", halfLife: 26.8 / (365 * 24 * 60), mass: 214, decays: [{ type: "β⁻", product: "Bismuth-214", branchingRatio: 1.0 }] },
            "Bismuth-214": { symbol: "Bi-214", halfLife: 19.9 / (365 * 24 * 60), mass: 214, decays: [{ type: "β⁻", product: "Polonium-214", branchingRatio: 0.9998 }, { type: "α", product: "Thallium-210", branchingRatio: 0.0002 }] },
            "Polonium-214": { symbol: "Po-214", halfLife: 0.0001643 / (365 * 24 * 60 * 60), mass: 214, decays: [{ type: "α", product: "Lead-210", branchingRatio: 1.0 }] },
            "Lead-210": { symbol: "Pb-210", halfLife: 22.3, mass: 210, decays: [{ type: "β⁻", product: "Bismuth-210", branchingRatio: 1.0 }] },
            "Bismuth-210": { symbol: "Bi-210", halfLife: 5.012 / 365, mass: 210, decays: [{ type: "β⁻", product: "Polonium-210", branchingRatio: 1.0 }] },
            "Polonium-210": { symbol: "Po-210", halfLife: 138.376 / 365, mass: 210, decays: [{ type: "α", product: "Lead-206", branchingRatio: 1.0 }] },
            "Lead-206": { symbol: "Pb-206", halfLife: Infinity, mass: 206, decays: [] }
        };

        const isotopeSearch = document.getElementById('isotope-search');
        const suggestions = document.getElementById('suggestions');
        const timeValue = document.getElementById('time-value');
        const timeUnit = document.getElementById('time-unit');
        const initialNuclei = document.getElementById('initial-nuclei');
        const calculateBtn = document.getElementById('calculate-btn');
        const resultsSection = document.getElementById('results-section');
        const decayProbability = document.getElementById('decay-probability');
        const remainingNuclei = document.getElementById('remaining-nuclei');
        const decayChain = document.getElementById('decay-chain');
        const interpretation = document.getElementById('interpretation');

        isotopeSearch.addEventListener('input', showSuggestions);
        isotopeSearch.addEventListener('focus', showSuggestions);
        document.addEventListener('click', (e) => { if (e.target !== isotopeSearch && e.target !== suggestions) suggestions.classList.add('hidden'); });
        calculateBtn.addEventListener('click', calculateDecay);

        function showSuggestions() {
            const searchTerm = isotopeSearch.value.toLowerCase();
            if (searchTerm.length < 1) { suggestions.classList.add('hidden'); return; }
            suggestions.innerHTML = '';
            const matches = Object.keys(isotopeDatabase).filter(iso => iso.toLowerCase().includes(searchTerm) || isotopeDatabase[iso].symbol.toLowerCase().includes(searchTerm));
            if (matches.length === 0) { suggestions.classList.add('hidden'); return; }
            matches.slice(0, 10).forEach(iso => {
                const div = document.createElement('div');
                div.className = 'p-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center';
                div.innerHTML = `<span class="font-medium">${iso} (${isotopeDatabase[iso].symbol})</span>`;
                div.addEventListener('click', () => { isotopeSearch.value = iso; suggestions.classList.add('hidden'); });
                suggestions.appendChild(div);
            });
            suggestions.classList.remove('hidden');
        }

        function convertToSeconds(value, unit) {
            switch (unit) {
                case 'seconds': return value;
                case 'minutes': return value * 60;
                case 'hours': return value * 3600;
                case 'days': return value * 86400;
                case 'years': return value * 31557600;
                default: return value;
            }
        }

        function convertFromSeconds(seconds, unit) {
            switch (unit) {
                case 'seconds': return seconds;
                case 'minutes': return seconds / 60;
                case 'hours': return seconds / 3600;
                case 'days': return seconds / 86400;
                case 'years': return seconds / 31557600;
                default: return seconds;
            }
        }

        function formatHalfLife(halfLife) {
            if (halfLife === Infinity) return "Stable";
            if (halfLife >= 1e9) return (halfLife / 1e9).toFixed(3) + " billion years";
            if (halfLife >= 1e6) return (halfLife / 1e6).toFixed(3) + " million years";
            if (halfLife >= 1000) return (halfLife / 1000).toFixed(3) + " thousand years";
            if (halfLife >= 1) return halfLife.toFixed(3) + " years";
            if (halfLife >= 1 / 365.25) return (halfLife * 365.25).toFixed(3) + " days";
            if (halfLife >= 1 / (365.25 * 24)) return (halfLife * 365.25 * 24).toFixed(3) + " hours";
            if (halfLife >= 1 / (365.25 * 24 * 60)) return (halfLife * 365.25 * 24 * 60).toFixed(3) + " minutes";
            return (halfLife * 365.25 * 24 * 60 * 60).toFixed(3) + " seconds";
        }

        function calculateDecay() {
            const isotopeName = isotopeSearch.value;
            if (!isotopeDatabase[isotopeName]) { alert("Please select a valid isotope from the suggestions"); return; }

            const time = parseFloat(timeValue.value);
            if (isNaN(time) || time < 0) { alert("Please enter a valid time value"); return; }

            const nuclei = initialNuclei.value ? parseInt(initialNuclei.value) : 1;
            if (isNaN(nuclei) || nuclei < 1) { alert("Please enter a valid number of initial nuclei"); return; }

            let timeInSeconds = convertToSeconds(time, timeUnit.value);
            const isotope = isotopeDatabase[isotopeName];
            const halfLifeInSeconds = convertToSeconds(isotope.halfLife, 'years');

            const decayConst = Math.log(2) / halfLifeInSeconds;
            const prob = 1 - Math.exp(-decayConst * timeInSeconds);
            const remaining = nuclei * Math.exp(-decayConst * timeInSeconds);

            decayProbability.textContent = (prob * 100).toFixed(6) + '%';
            remainingNuclei.textContent = remaining.toFixed(6);

            displayDecayChain(isotopeName, 1.0);

            addInterpretation(isotopeName, prob, remaining, nuclei, time, timeUnit.value);

            resultsSection.classList.remove('hidden');
            const resultCards = document.querySelectorAll('.fade-in');
            resultCards.forEach((card, index) => { card.style.animationDelay = `${index * 0.1}s`; });
        }

        function displayDecayChain(isotopeName, cumulativeProbability, depth = 0, parentContainer = null) {
            const isotope = isotopeDatabase[isotopeName];
            if (!isotope) return;
            if (depth === 0) { decayChain.innerHTML = ''; parentContainer = decayChain; }

            const element = document.createElement('div');
            element.className = 'decay-chain-item bg-white border rounded-lg p-4 shadow-sm mb-2';
            element.style.marginLeft = `${depth * 20}px`;
            element.innerHTML = `<div class="flex justify-between items-center">
    <div><span class="font-bold">${isotopeName} (${isotope.symbol})</span><span class="text-sm text-gray-500 ml-2">${formatHalfLife(isotope.halfLife)}</span></div>
    ${depth > 0 ? `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">${(cumulativeProbability * 100).toFixed(4)}%</span>` : ''}
  </div>`;
            parentContainer.appendChild(element);

            if (!isotope.decays || isotope.decays.length === 0 || isotope.halfLife === Infinity) return;

            isotope.decays.forEach(decay => {
                displayDecayChain(decay.product, cumulativeProbability * decay.branchingRatio, depth + 1, parentContainer);
            });
        }

        function addInterpretation(isotopeName, prob, remaining, initialNuclei, time, timeUnit) {
            const isotope = isotopeDatabase[isotopeName];
            let interpretationText = `For ${isotopeName} (${isotope.symbol}) over ${time} ${timeUnit}:<br><br>`;
            interpretationText += `• Each nucleus has a ${(prob * 100).toFixed(2)}% chance of decaying.<br>`;
            interpretationText += `• Starting with ${initialNuclei} nuclei, you'd expect about ${remaining.toFixed(2)} to remain.<br><br>`;
            const halfLifeInInputUnits = convertFromSeconds(convertToSeconds(isotope.halfLife, 'years'), timeUnit);
            interpretationText += `The half-life of ${isotopeName} is ${halfLifeInInputUnits.toExponential(3)} ${timeUnit}. `;
            interpretation.innerHTML = interpretationText;
        }

        feather.replace();
