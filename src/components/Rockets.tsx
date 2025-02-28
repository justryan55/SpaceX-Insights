import { useQuery, gql } from "@apollo/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Dragon {
  name: string;
  first_flight: string;
  diameter: {
    feet: number;
  };
  launch_payload_mass: {
    lb: number;
  };
}

interface DragonsData {
  dragons: Dragon[];
}

const GET_DRAGONS = gql`
  query Rockets {
    dragons {
      name
      first_flight
      diameter {
        feet
      }
      launch_payload_mass {
        lb
      }
    }
  }
`;

const DragonsBarGraph = () => {
  const { loading, error, data } = useQuery<DragonsData>(GET_DRAGONS);

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

  const formattedData = data!.dragons.map((dragon) => ({
    name: dragon.name,
    diameter: dragon.diameter.feet,
    payload_capacity: dragon.launch_payload_mass.lb,
  }));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        padding: "0 20px",
      }}
    >
      <h1 className="pt-10">
        Dragon Spacecraft - Diameter vs Payload Capacity
      </h1>
      <div style={{ width: "100%", maxWidth: "1000px", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" domain={[0, "auto"]} />

            <YAxis
              yAxisId="right"
              orientation="right"
              dataKey="payload_capacity"
              stroke="#4A90E2"
              domain={[0, "auto"]}
            />
            <Tooltip />
            <Bar
              yAxisId="left"
              dataKey="diameter"
              fill="#8884d8"
              name="Diameter (feet)"
              barSize={30}
            />
            <Bar
              yAxisId="right"
              dataKey="payload_capacity"
              fill="#4A90E2"
              name="Payload Capacity (lbs)"
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DragonsBarGraph;
