import React from "react";
import { Story } from "./components/Story";
import { fetchFrontPage } from "./api"

export const Home = () => {

    const [frontPage, setFrontPage] = useState({});

    const frontPage = async() => {
        const fPStorys = await fetchFrontPage();
        if (fPStorys) {
            setFrontPage(fpStorys);
        }
    };

    useEffect(() => {
        frontPage();
    }, []);

    return (
        <div className="main-content-container">
            <div>Home</div>
            {frontPage.forEach((storyObj) => {
                storyObj.frontPage = true;
                return (
                    <Story props={storyObj} />
                )
            })}
            {/* <Story />
            <Story />
            <Story />
            <Story />
            <Story /> */}

        </div>
    );
};