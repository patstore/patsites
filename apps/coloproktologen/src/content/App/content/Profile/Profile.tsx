import React from "react";
import { useSiteContext } from "@provider";
import UserAccount from "./components/UserAccount";
import Newsletter from "./components/Newsletter";
import { ContentContainer, FlexBox } from "@ui";
import Password from "./components/Password";
import { memberContainer } from "@styles";

const Profile: React.FC = () => {
    const { user, getUser } = useSiteContext();

    if (!user) {
        return null;
    }

    return (
        <ContentContainer>
            <div css={memberContainer}>
                <div>
                    <h1>Ihre Daten</h1>
                    <p>Hier können Sie Ihr persönliches Profil verwalten.</p>
                </div>
                <FlexBox direction="row"
                    gap="20px"
                    changeToColumn>
                    <UserAccount user={user} getUser={getUser} />
                    <Password user={user} getUser={getUser} />
                </FlexBox>
                <Newsletter user={user} getUser={getUser} />
            </div>
        </ContentContainer>
    );
};

export default Profile;
