import { addPluginAuthor, addPluginConstant, addPluginDescription, createPlugin } from '../../../utils/plugin-builder';
import createNumberNode from '../../../create/NumberNode';

const physicalConstantsPlugin = createPlugin('core/physical-constants');

addPluginAuthor(physicalConstantsPlugin, 'core');
addPluginDescription(physicalConstantsPlugin, 'Adds many physical constants.');

// source: https://physics.nist.gov/cgi-bin/cuu/Value?physics:c
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:c',
    value: createNumberNode(299792458),
    documentation: {
        en: {
            synopsis: 'physics:c',
            description: 'Speed of light in m/s in vacuum',
        },
        de: {
            synopsis: 'physics:c',
            description: 'Lichtgeschwindigkeit in m/s in Vakuum',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Proton
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:m_p',
    value: createNumberNode(1.672621923e-27),
    documentation: {
        en: {
            synopsis: 'physics:m_p',
            description: 'proton mass in kg',
        },
        de: {
            synopsis: 'physics:m_p',
            description: 'Protonenmasse in kg',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Neutron
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:m_n',
    value: createNumberNode(1.674927498e-27),
    documentation: {
        en: {
            synopsis: 'physics:m_n',
            description: 'neutron mass in kg',
        },
        de: {
            synopsis: 'physics:m_n',
            description: 'Neutronenmasse in kg',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Electron
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:m_e',
    value: createNumberNode(9.1093837e-31),
    documentation: {
        en: {
            synopsis: 'physics:m_e',
            description: 'electron mass in kg',
        },
        de: {
            synopsis: 'physics:m_e',
            description: 'Elektronenmasse in kg',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Muon
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:m_mu',
    value: createNumberNode(1.8835316e-28),
    documentation: {
        en: {
            synopsis: 'physics:m_mu',
            description: 'muon mass in kg',
        },
        de: {
            synopsis: 'physics:m_mu',
            description: 'Masse des Myons in kg',
        },
    },
});

// source: https://de.wikipedia.org/wiki/Bohrscher_Radius
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:a_0',
    value: createNumberNode(5.291772109e-11),
    documentation: {
        en: {
            synopsis: 'physics:a_0',
            description: 'Bohr radius in m denotes the radius of the hydrogen atom in the lowest energy state ',
        },
        de: {
            synopsis: 'physics:a_0',
            description:
                'Der bohrsche Radius in m bezeichnet den Radius des Wasserstoffatoms im niedrigsten Energiezustand',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?physics:h
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:h',
    value: createNumberNode(6.62607015e-34),
    documentation: {
        en: {
            synopsis: 'physics:h',
            description: 'Planck constant in J s',
        },
        de: {
            synopsis: 'physics:h',
            description: "Planck'sches Wirkungsquantum in J s",
        },
    },
});

// source: https://en.wikipedia.org/wiki/Nuclear_magneton
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:mu_N',
    value: createNumberNode(5.05078374e-27),
    documentation: {
        en: {
            synopsis: 'physics:mu_N',
            description: 'nuclear magneton in J/T is a constant of magnetic moment',
        },
        de: {
            synopsis: 'physics:mu_N',
            description: 'Das Kernmagneton in J/T wird als Einheit für magnetische Momente verwendet',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Bohr_magneton
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:mu_B',
    value: createNumberNode(9.27401007e-24),
    documentation: {
        en: {
            synopsis: 'physics:mu_B',
            description:
                'Bohr magneton in J/T the magnitude of the magnetic moment of an electron with orbital angular momentum quantum number ℓ = 1',
        },
        de: {
            synopsis: 'physics:mu_B',
            description:
                'Das bohrsche Magneton in J/T der Betrag des magnetischen Moments eines Elektrons mit  Bahndrehimpulsquantenzahl ℓ = 1',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Fine-structure_constant
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:alpha',
    value: createNumberNode(7.29735256e-3),
    documentation: {
        en: {
            synopsis: 'physics:alpha',
            description:
                'The fine structure constant is dimensionless and indicates the strength of the electromagnetic interaction',
        },
        de: {
            synopsis: 'physics:alpha',
            description:
                'Die Feinstrukturkonstante ist dimensionslos und gibt die Stärke der elektromagnetischen Wechselwirkung an',
        },
    },
});

// source: https://de.wikipedia.org/wiki/Rydberg-Konstante
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:R_inf',
    value: createNumberNode(1.09737315681e7),
    documentation: {
        en: {
            synopsis: 'physics:R_inf',
            description: 'Rydberg constant in 1/m is used for the calculation of atomic spectra',
        },
        de: {
            synopsis: 'physics:R_inf',
            description: 'Die Rydberg-Konstante in 1/m wird zur Berechnung von Atomspektren verwendet',
        },
    },
});

// source: https://en.wikipedia.org/wiki/Faraday_constant
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:F',
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    value: createNumberNode(96485.3321233100184),
    documentation: {
        en: {
            synopsis: 'physics:F',
            description: 'Faraday constant in C/mol is the electric charge of one mole of electrons',
        },
        de: {
            synopsis: 'physics:F',
            description: 'Die Faraday-Konstante in C/mol ist die elektrische Ladung eines Mols einfach geladener Ionen',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?e
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:e',
    value: createNumberNode(1.602176634e-19),
    documentation: {
        en: {
            synopsis: 'physics:e',
            description: 'elementary charge in Colomb of an electron',
        },
        de: {
            synopsis: 'physics:e',
            description: 'Elementarladung in Colomb eines Elektrons',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?na
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:N_A',
    value: createNumberNode(6.02214076e23),
    documentation: {
        en: {
            synopsis: 'physics:N_A',
            description: 'Avogadro constant in 1/mol indicates how many particles are contained in one mole',
        },
        de: {
            synopsis: 'physics:N_A',
            description: 'Die Avogadro-Konstante in 1/mol gibt an, wie viele Teilchen in einem Mol enthalten sind',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?physics:k
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:k',
    value: createNumberNode(1.380649e-23),
    documentation: {
        en: {
            synopsis: 'physics:k',
            description: 'Boltzmann constant in J/K indicates the scaling between energy and temperature',
        },
        de: {
            synopsis: 'physics:k',
            description: 'Die Boltzmann-Konstante in J/K gibt die Skalierung zwischen Energie und Temperatur an',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?r
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:R',
    value: createNumberNode(8.314462618),
    documentation: {
        en: {
            synopsis: 'physics:R',
            description: 'molar gas constant in J/(mol K) occurs in the thermal equation of state of ideal gases',
        },
        de: {
            synopsis: 'physics:R',
            description: 'Die Gaskonstante in J/(mol K) tritt in der thermischen Zustandsgleichung idealer Gase auf',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?ep0
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:epsilon_0',
    value: createNumberNode(8.85418781e-12),
    documentation: {
        en: {
            synopsis: 'physics:epsilon_0',
            description:
                'electric field constant in (A s)/(V m) gives the ratio of electric flux density to electric field strength in vacuum',
        },
        de: {
            synopsis: 'physics:epsilon_0',
            description:
                'Die elektrische Feldkonstante in (A s)/(V m) gibt das Verhältnis der elektrischen Flussdichte zur elektrischen Feldstärke im Vakuum an',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?mu0
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:mu_0',
    value: createNumberNode(1.256637062e-6),
    documentation: {
        en: {
            synopsis: 'physics:mu_0',
            description:
                'magnetic field constant in N/(A^2) gives the ratio of the magnetic flux density to the magnetic field strength in vacuum',
        },
        de: {
            synopsis: 'physics:mu_0',
            description:
                'Die magnetische Feldkonstante in N/(A^2) gibt das Verhältnis der magnetischen Flussdichte zur magnetischen Feldstärke im Vakuum an',
        },
    },
});

// source: https://physics.nist.gov/cgi-bin/cuu/Value?bg
addPluginConstant(physicalConstantsPlugin, {
    name: 'physics:G',
    value: createNumberNode(6.674e-11),
    documentation: {
        en: {
            synopsis: 'physics:G',
            description:
                'Gravitational constant in m^3/(kg s^2) gives the strength of the gravitational force between two bodies as a function of their distance and masses.',
        },
        de: {
            synopsis: 'physics:G',
            description:
                'Die Gravitationskonstante in m^3/(kg s^2) gibt die Stärke der Gravitationskraft zwischen zwei Körpern in Abhängigkeit von ihrem Abstand und ihren Massen berechnen',
        },
    },
});

export default physicalConstantsPlugin;
