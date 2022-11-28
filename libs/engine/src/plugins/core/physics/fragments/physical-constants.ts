import createNumberNode from '../../../../create/create-number-node';
import { PluginFragment } from '../../../../utils/plugin-builder';

const physicalConstantsFragment = new PluginFragment()

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?physics:c
    .addConstant(
        'physics:c',
        'Speed of light in m/s in vacuum',
        'Lichtgeschwindigkeit in m/s in Vakuum',
        createNumberNode(299792458),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?mp
    .addConstant('physics:m_p', 'proton mass in kg', 'Protonenmasse in kg', createNumberNode(1.672621923e-27))

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?mn
    .addConstant('physics:m_n', 'neutron mass in kg', 'Neutronenmasse in kg', createNumberNode(1.674927498e-27))

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?me
    .addConstant('physics:m_e', 'electron mass in kg', 'Elektronenmasse in kg', createNumberNode(9.1093837e-31))

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?mmu
    .addConstant('physics:m_mu', 'muon mass in kg', 'Masse des Myons in kg', createNumberNode(1.8835316e-28))

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?bohrrada0
    .addConstant(
        'physics:a_0',
        'Bohr radius in m denotes the radius of the hydrogen atom in the lowest energy state ',
        'Der bohrsche Radius in m bezeichnet den Radius des Wasserstoffatoms im niedrigsten Energiezustand',
        createNumberNode(5.291772109e-11),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?physics:h
    .addConstant(
        'physics:h',
        'Planck constant in J s',
        "Planck'sches Wirkungsquantum in J s",
        createNumberNode(6.62607015e-34),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?mun|search_for=nuclear+magneton
    .addConstant(
        'physics:mu_N',
        'nuclear magneton in J/T is a constant of magnetic moment',
        'Das Kernmagneton in J/T wird als Einheit für magnetische Momente verwendet',
        createNumberNode(5.05078374e-27),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?mub
    .addConstant(
        'physics:mu_B',
        'Bohr magneton in J/T the magnitude of the magnetic moment of an electron with orbital angular momentum quantum number ℓ = 1',
        'Das bohrsche Magneton in J/T der Betrag des magnetischen Moments eines Elektrons mit  Bahndrehimpulsquantenzahl ℓ = 1',
        createNumberNode(9.27401007e-24),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?alph
    .addConstant(
        'physics:alpha',
        'The fine structure constant is dimensionless and indicates the strength of the electromagnetic interaction',
        'Die Feinstrukturkonstante ist dimensionslos und gibt die Stärke der elektromagnetischen Wechselwirkung an',
        createNumberNode(7.29735256e-3),
    )

    // https://physics.nist.gov/cgi-bin/cuu/Value?ryd
    .addConstant(
        'physics:R_inf',
        'Rydberg constant in 1/m is used for the calculation of atomic spectra',
        'Die Rydberg-Konstante in 1/m wird zur Berechnung von Atomspektren verwendet',
        createNumberNode(1.09737315681e7),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?f
    .addConstant(
        'physics:F',
        'Faraday constant in C/mol is the electric charge of one mole of electrons',
        'Die Faraday-Konstante in C/mol ist die elektrische Ladung eines Mols einfach geladener Ionen',
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        createNumberNode(96485.3321233100184),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?e
    .addConstant(
        'physics:e',
        'elementary charge in Colomb of an electron',
        'Elementarladung in Colomb eines Elektrons',
        createNumberNode(1.602176634e-19),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?na
    .addConstant(
        'physics:N_A',
        'Avogadro constant in 1/mol indicates how many particles are contained in one mole',
        'Die Avogadro-Konstante in 1/mol gibt an, wie viele Teilchen in einem Mol enthalten sind',
        createNumberNode(6.02214076e23),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?physics:k
    .addConstant(
        'physics:k',
        'Boltzmann constant in J/K indicates the scaling between energy and temperature',
        'Die Boltzmann-Konstante in J/K gibt die Skalierung zwischen Energie und Temperatur an',
        createNumberNode(1.380649e-23),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?r
    .addConstant(
        'physics:R',
        'molar gas constant in J/(mol K) occurs in the thermal equation of state of ideal gases',
        'Die Gaskonstante in J/(mol K) tritt in der thermischen Zustandsgleichung idealer Gase auf',
        createNumberNode(8.314462618),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?ep0
    .addConstant(
        'physics:epsilon_0',
        'electric field constant in (A s)/(V m) gives the ratio of electric flux density to electric field strength in vacuum',
        'Die elektrische Feldkonstante in (A s)/(V m) gibt das Verhältnis der elektrischen Flussdichte zur elektrischen Feldstärke im Vakuum an',
        createNumberNode(8.85418781e-12),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?mu0
    .addConstant(
        'physics:mu_0',
        'magnetic field constant in N/(A^2) gives the ratio of the magnetic flux density to the magnetic field strength in vacuum',
        'Die magnetische Feldkonstante in N/(A^2) gibt das Verhältnis der magnetischen Flussdichte zur magnetischen Feldstärke im Vakuum an',
        createNumberNode(1.256637062e-6),
    )

    // source: https://physics.nist.gov/cgi-bin/cuu/Value?bg
    .addConstant(
        'physics:G',
        'Gravitational constant in m^3/(kg s^2) gives the strength of the gravitational force between two bodies as a function of their distance and masses.',
        'Die Gravitationskonstante in m^3/(kg s^2) gibt die Stärke der Gravitationskraft zwischen zwei Körpern in Abhängigkeit von ihrem Abstand und ihren Massen berechnen',
        createNumberNode(6.674e-11),
    );

export default physicalConstantsFragment;
