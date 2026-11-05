import React, { useMemo } from "react";
import TeamTile from "./TeamTile";
import { useGetGroup } from "@provider";

const Mannschaften: React.FC<{ category: string }> = ({ category }) => {
  const { groups } = useGetGroup();

  const teams = useMemo(
    () =>
      groups.flatMap((group) =>
        group.team && group.categories.includes(category)
          ? [{ team: group.team, group }]
          : [],
      ),
    [groups, category],
  );

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "2em",
      }}
    >
      {teams.map((value) => (
        <TeamTile key={value.team.id} team={value.team} group={value.group} />
      ))}
    </div>
  );
};

export default Mannschaften;
