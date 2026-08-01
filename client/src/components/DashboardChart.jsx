import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
} from "recharts";

function DashboardChart({
    completed,
    pending,
    interviews,
}) {

    const pieData = [
        {
            name: "Completed",
            value: completed,
        },
        {
            name: "Pending",
            value: pending,
        },
    ];

    const COLORS = [
        "#22c55e",
        "#f59e0b",
    ];

    const barData = interviews.map((item) => ({
        role: item.role.length > 10
            ? item.role.slice(0, 10) + "..."
            : item.role,
        score: Number(item.score),
    }));
    const lineData = interviews
    .filter((item) => item.status === "Completed")
    .map((item, index) => ({
        interview: `#${index + 1}`,
        score: Number(item.score),
    }));

    return (

        <div className="chart-grid">

            <div className="chart-card">

                <h2>Interview Status</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie
                            data={pieData}
                            dataKey="value"
                            outerRadius={100}
                            label
                        >

                            {pieData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-card">

                <h2>Interview Scores</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={barData}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="role"/>

                        <YAxis/>

                        <Tooltip/>

                        <Bar
                            dataKey="score"
                            fill="#2563eb"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>
            <div className="chart-card">

    <h2>Progress Over Time</h2>

    <ResponsiveContainer
        width="100%"
        height={300}
    >

        <LineChart data={lineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="interview" />

            <YAxis domain={[0, 10]} />

            <Tooltip />

            <Line
                type="monotone"
                dataKey="score"
                stroke="#22c55e"
                strokeWidth={3}
            />

        </LineChart>

    </ResponsiveContainer>

</div>

        </div>
        

    );
}

export default DashboardChart;