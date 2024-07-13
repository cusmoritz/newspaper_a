import React, { useEffect } from "react";

export const SourceRelatedStorysComponent = ({sourceId}) => {

    const [id, setId] = useState(0);
    const [storys, setStorys] = useState([]);

    const fetchStorysForOneSource = async () => {
        const storys = await getStorysForOneSource(sourceId);
        if (storys) {
            setStorys(storys);
        }
    }

    const loadPage = async () => {
        await fetchStorysForOneSource();
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        Related stories component.
        </>
    )
}