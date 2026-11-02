import React from "react";
import { profileContainer } from "./styles";
import { useSiteContext } from "@provider";
import UserAccount from "./components/UserAccount";
import MemberSearch from "./components/MemberSearch";
import Newsletter from "./components/Newsletter";
import { ContentContainer } from "@ui";
import Password from "./components/Password";

const Profile: React.FC = () => {
    const { user, getUser } = useSiteContext();

    if (!user) {
        return null;
    }

    return (
        <ContentContainer>
            <div css={profileContainer}>
                <div>
                    <h1>Ihre Daten</h1>
                    <p>Hier können Sie Ihr persönliches Profil verwalten.</p>
                </div>
                <UserAccount
                    user={user}
                    getUser={getUser}
                />
                <Password
                    user={user}
                    getUser={getUser}
                />
                <MemberSearch
                    user={user}
                    getUser={getUser}
                />
                <Newsletter
                    user={user}
                    getUser={getUser}
                />
            </div>
        </ContentContainer>
    );
};

export default Profile;
