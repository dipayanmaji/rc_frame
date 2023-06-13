export const sectionBElement = [
    {
        name: "selfWeight",
        displayName: "Self Weight"
    },
    {
        name: "pavement",
        displayName: "Pavement",
        labels: [
            {
                name: "pavementWeightDensity",
                displayName: "Weight Density",
                forceUnit: true,
                lengthUnit: true,
                square: 3,
            },
            {
                name: "pavementThickness",
                displayName: "Thickness",
                forceUnit: "",
                lengthUnit: true,
            }
        ]
    },
    {
        name: "soil",
        displayName: "Soil",
        labels: [
            {
                name: "soilWeightDensity",
                displayName: "Weight Density",
                forceUnit: true,
                lengthUnit: true,
                square: "3",
            },
            {
                name: "phi",
                displayName: "Phi",
                degreeUnit: "[deg]",
            },
            {
                name: "surcharge",
                displayName: "Surcharge",
                forceUnit: true,
                lengthUnit: true,
                square: "2",
            },
            {
                name: "submergedWeightDensity",
                displayName: "Submerged Weight Density",
                forceUnit: true,
                lengthUnit: true,
                square: "3",
            },
            {
                name: "loadSlope",
                displayName: "Load Slope",
            }
        ]
    },
    {
        name: "undergroundWater",
        displayName: "Underground Water",
        labels: [
            {
                name: "gl",
                displayName: "GL",
                lengthUnit: true,
            }
        ]
    },
    {
        name: "barrier",
        displayName: "Barrier",
        labels: [
            {
                name: "barrierSelfWeight",
                displayName: "Self Weight",
                forceUnit: true,
                lengthUnit: true,
            },
            {
                name: "additionalLoad",
                displayName: "Additional Load",
                forceUnit: true,
                lengthUnit: true,
            }
        ]
    },
    {
        name: "medianStrip",
        displayName: "Median Strip",
        labels: [
            {
                name: "medianStripValue",
                displayName: "",
                forceUnit: true,
                lengthUnit: true,
            }
        ]
    },
    {
        name: "sideWalk",
        displayName: "Side Walk",
        labels: [
            {
                name: "sideWalkWeightDensity",
                displayName: "Weight Density",
                forceUnit: true,
                lengthUnit: true,
                square: "3",
            },
            {
                name: "sideWalkThickness",
                displayName: "Thickness",
                lengthUnit: true,
            },
            {
                name: "crowdLoad",
                displayName: "Crowd Load",
                forceUnit: true,
                lengthUnit: true,
                square: "2",
            }
        ]
    },
] 