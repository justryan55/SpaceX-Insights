import { useQuery, gql } from "@apollo/client";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const GET_SHIPS = gql`
  query Ships {
    ships {
      id
      model
      name
      type
      status
    }
  }
`;

const Ships = () => {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading)
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const chartData = data.ships.reduce((acc, ship) => {
    const shipType = ship.type;
    if (!acc[shipType]) acc[shipType] = 0;
    acc[shipType]++;
    return acc;
  }, {});

  const formattedData = Object.keys(chartData).map((type) => ({
    name: type,
    value: chartData[type],
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff0000"];

  return (
    <div>
      <h1 className="pt-10 text-center">SpaceX Ships Data - By Type</h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Ships;
