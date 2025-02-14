export const defaultConfig = {
    gauge: {
        hub: {
            radius: 5,
        },
        colorScale: {
            radius: 50,
            thickness: 15,
            color: "green",
            colorBack: "#f4f4f4"
        },
        trendArc: {
            radius: 60,
            thickness: 5,
            colorUp: "pink",
            colorDown: "lightblue",
        },
        ticks: {
            major: {
                radius: 60,
                length: 10,
                thickness: 1,
                resolution: 10,
                color: "black",
            },
            minor: {
                radius: 64,
                length: 3,
                thickness: .5,
                resolution: 1,
                color: "black",
            },
            label: {
                radius: 79,
                fontSize: 15,
                resolution: 10,
                color: "black",
            },
        },
        pointer: {
            length: 60,
            thickness: 3,
            color: "black",
        },
        valueLabel: {
            radius: 20,
            fontSize: 15,
            color: "black",
            unit: "°C",
            digits: 1,
        },
        scale: {
            startValue: 0,
            endValue: 40,
            startAngle: -120,
            endAngle: 120,
        },
        setPointMark: {
            radius: 65,
            color: "purple",
        }
    }
};

export default defaultConfig;
