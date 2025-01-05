import Group from "../components/Group/Group";
import RoomSetup from "../components/RoomSetup/RoomSetup";
import CardGrid from "../components/CardGrid/CardGrid";

export default function Groups({ HOST_IP, API_KEY, CONFIG }) {
  const config = CONFIG;

  return (
    <div className="inner">
      <CardGrid>
        {Object.keys(config.groups).length === 0 ? <RoomSetup /> : <></>}
        {Object.entries(config.groups)
          .filter((group) => group[1].type !== "Entertainment")
          .map(([id, group]) => (
            <Group
              key={id}
              api_key={API_KEY}
              HOST_IP={HOST_IP}
              id={id}
              group={group}
              lights={config.lights}
              scenes={config.scenes}
            />
          ))}
      </CardGrid>
    </div>
  );
}
