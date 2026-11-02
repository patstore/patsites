import { env } from "@env";
import { useQuery } from "@apollo/client/react";
import { generateQuery, sanitizeGraphQlNode } from "@provider";
import settings from "@settings";
import { memberContainer } from "@styles";
import { ContentContainer } from "@ui";
import React, { useMemo } from "react";

const Protokolle: React.FC = () => {
    const { data: downloads } = useQuery(
        generateQuery({
            type: "find",
            objectName: "Download",
            queryName: "downloads",
            fields: [
                "objectId",
                "title",
                "label",
                "file {name url}",
                "categories",
                "date"
            ]
        }),
        {
            variables: {
                params: {
                    project: {
                        have: {
                            id: {
                                equalTo: env.patstoreProjectId
                            }
                        }
                    },
                    categories: { in: ["eVh1N0twn5"] }
                }
            }
        }
    );

    const downloadsArray: {
    title: string;
    date: string;
    url: string;
    objectId: string;
  }[] = useMemo(() => {
      if (!downloads) return [];
      return downloads?.downloads?.edges.map((edge: any) => ({
          title: edge.node.title,
          url: edge.node.file.url,
          objectId: edge.node.objectId,
          date: edge.node.date
      }));
  }, [downloads]);

    return (
        <ContentContainer>
            <div css={memberContainer}>
                <div>
                    <h1>Protokolle der Mitgliederversammlungen</h1>
                    <p>
                        Hier können Sie die Protokolle der Mitgliederversammlungen ab dem
                        Jahr 2012 herunterladen.
                    </p>
                    {downloadsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((dl) => (
                        <div key={dl.objectId} css={{marginBottom: settings.sizes.medium}}>
                            <a href={dl.url}
                                target="_blank"
                                rel="noopener noreferrer">{dl.title}</a>
                        </div>
                    ))}
                </div>
            </div>
        </ContentContainer>
    );
};

export default Protokolle;
