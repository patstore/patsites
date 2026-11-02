import settings from "@settings";
import { ContentContainer, FlexBox, SmallContentElement } from "@ui";
import React from "react";
import tasks from "../constants/tasks";

const Tasks: React.FC = () => {
    return (
        <ContentContainer id="der-bcd">
            <FlexBox
                align="center"
                direction="column"
                gap={settings.sizes.large}
                hasFullWidth
            >

                <h2>Kernaufgaben des BCD</h2>
                <p css={{ textAlign: "center" }}>
                    Basis der erfolgreichen Verbandsgeschichte ist der hohe Anspruch an
                    die Qualifikation unserer Mitglieder mit dem Ziel, betroffenen
                    Patienten eine qualifizierte Versorgung zu bieten.
                </p>
                <FlexBox
                    direction="row"
                    align="stretch"
                    justify="space-between"
                    gap={settings.sizes.medium}
                    hasFullWidth
                    changeToColumn
                    wrap
                >
                    {tasks.map((task) => (
                        <SmallContentElement
                            key={task.title}
                            flex="1 1 30%"
                            title={task.title}
                            text={task.description}
                            content={task.content}
                        />
                    ))}
                </FlexBox>
                {/* <ListElement
                    title="Kernaufgaben des BCD"
                    description=" Basis der erfolgreichen Verbandsgeschichte ist der hohe
                        Anspruch an die Qualifikation unserer Mitglieder mit dem
                        Ziel, betroffenen Patienten eine qualifizierte
                        Versorgung zu bieten."
                    listItems={tasks}
                /> */}
            </FlexBox>
        </ContentContainer>
    );
};

export default Tasks;
