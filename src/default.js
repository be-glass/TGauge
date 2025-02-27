export const defaultConfig = {
    gauge: {
        hub: {
            radius: 5,
        },
        colorScale: {
            radius: 63,
            thickness: 15,
            color: "green",
            colorBack: "#f4f4f4"
        },
        trendArc: {
            radius: 73,
            thickness: 5,
            colorUp: "pink",
            colorDown: "lightblue",
        },
        ticks: {
            major: {
                radius: 73,
                length: 10,
                thickness: 1,
                resolution: 10,
                color: "black",
            },
            minor: {
                radius: 77,
                length: 3,
                thickness: .5,
                resolution: 1,
                color: "black",
            },
            label: {
                radius: 92,
                fontSize: 15,
                resolution: 20,
                color: "black",
            },
        },
        pointer: {
            length: 73,
            thickness: 3,
            color: "black",
        },
        label: {
            value: {
                radius:48,
                fontSize: 30,
                color: "black",
                digits: 1,
            },
            unit: {
                radius: 73,
                fontSize: 15,
                color: "black",
                text: "°C",
            },
            controlValue: {
                radius: 70,
                fontSize: 15,
                color: "black",
                unit: "%",
                xOffset: 70,
            },

            name: {
                radius: -90,
                xOffset: -70,
                fontSize: 15,
                color: "black",
            },
            room: {
                radius: -70,
                xOffset: -70,
                fontSize: 10,
                color: "black",
            },

            channel: {
                radius: -90,
                fontSize: 10,
                xOffset: 70,
                color: "black",
            },
        },
        scale: {
            startValue: 0,
            endValue: 40,
            startAngle: -120,
            endAngle: 120,
        },
        setPointMark: {
            radius: 78,
            color: "purple",
        }
    }
};

export default defaultConfig;
