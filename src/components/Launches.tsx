import { useQuery, gql } from "@apollo/client";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Rocket {
  rocket_name: string;
}

interface Launch {
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  rocket: Rocket;
}

interface LaunchesData {
  launches: Launch[];
}

const GET_LAUNCHES = gql`
  query {
    launches {
      mission_name
      launch_year
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery<LaunchesData>(GET_LAUNCHES);

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

  const chartData = data!.launches.reduce<{ [key: string]: number }>(
    (acc, launch) => {
      const year = launch.launch_year;
      if (!acc[year]) acc[year] = 0;
      acc[year]++;
      return acc;
    },
    {}
  );

  const formattedData = Object.keys(chartData).map((year) => ({
    year,
    launches: chartData[year],
  }));

  return (
    <div
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
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "400px",
          marginBottom: "20px",
        }}
      >
        <h1 className="pt-10">SpaceX Launch Data - Year-wise</h1>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="launches" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", maxWidth: "1000px", height: "400px" }}>
        <h1 className="pt-20">Launches Over the Years</h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={[0, "auto"]} interval={0} />
            <Tooltip />
            <Line type="monotone" dataKey="launches" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Launches;
