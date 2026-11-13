import React, { useMemo } from "react";
import TeamTile from "./TeamTile";
import { useCollection } from "@provider";
import styles from "./Teams.module.css";

const Mannschaften: React.FC<{ category: string }> = ({ category }) => {
  const { items: groups } = useCollection("Group");

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
    <div className={styles.teams}>
      {teams.map((value) => (
        <TeamTile key={value.team.id} team={value.team} group={value.group} />
      ))}
    </div>
  );
};

export default Mannschaften;
