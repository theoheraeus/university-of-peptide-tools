# University of Peptide: concentration calculator

A small, dependency-free calculator for mass, concentration and liquid volume. Download `concentration-calculator.html` and open it in a browser. It works offline, does not store inputs, and contains no analytics, remote scripts or network requests.

Use the [online calculator](https://universityofpeptide.com/calculator), read the [worked calculation lesson](https://universityofpeptide.com/reconstitution-math), or browse [University of Peptide's free research tools](https://universityofpeptide.com/research-tools).

## What it does

- Converts a target mass from micrograms to milligrams.
- Calculates concentration in mg/mL and the corresponding liquid volume in mL.
- Shows the volume on a U-100 scale, where 100 markings represent 1 mL.
- Rejects empty, non-positive, non-finite and out-of-range results, and targets larger than the entered total mass.
- Keeps the formulas visible and supports printing a calculation.

This is educational arithmetic. It does not choose a dose, identify a compound, verify a product, assess sterility or establish safe use. U-100 markings describe a particular volume scale, not peptide mass or biological activity. Other scales differ.

## Example and formulas

The example is hypothetical and is not a treatment or preparation recommendation.

| Quantity | Value |
| --- | --- |
| Total mass | 10 mg |
| Liquid volume | 2 mL |
| Target mass | 250 mcg = 0.25 mg |
| Concentration | 10 / 2 = 5 mg/mL |
| Target volume | 0.25 / 5 = 0.05 mL |
| U-100 markings | 0.05 × 100 = 5 |

Reverse check: 0.05 mL × 5 mg/mL = 0.25 mg.

```text
target_mg = target_mcg / 1000
concentration_mg_per_ml = total_mg / liquid_ml
target_ml = target_mg / concentration_mg_per_ml
u100_markings = target_ml * 100
```

The calculation assumes that the entered liquid volume represents the solution volume and the compound is evenly distributed. It does not account for displacement, incomplete dissolution or handling losses. Display precision is not measurement accuracy. SI prefixes are documented by [NIST](https://www.nist.gov/pml/owm/metric-si-prefixes).

## Verify the arithmetic

With Node.js installed, run:

```sh
node verify.mjs
```

The checks cover fixed examples, mg/mcg equivalence, reversed calculations, changed liquid volume, invalid inputs and floating-point overflow/underflow. They also check that the standalone file has no remote dependencies or network-call code. These are software checks, not clinical validation.

## Use and contribute

Open the HTML file directly; a server and package installation are unnecessary. To include it in a teaching site, host a copy under your own policies and link to the calculation lesson for context. A visible credit to University of Peptide is welcome; no promotional backlink is required by the licence.

For a reproducible arithmetic issue, open an issue with the inputs, expected result and browser version. Do not include private medical information. Website questions and corrections can go through the [contact page](https://universityofpeptide.com/contact).

## Scope and licence

This repository contains original University of Peptide software and documentation, prepared with AI assistance. Its MIT licence covers these files. It does not license third-party protocol material, supplier information or research papers in the wider website library. This project has no claimed university accreditation, clinical endorsement or peer review.
