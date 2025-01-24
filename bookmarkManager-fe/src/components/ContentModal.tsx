// import { useQuery } from "@tanstack/react-query"
import { contentType } from "../types/contentTypes"
// import { getMeta } from "../services/previewService"


const ContentModal = ({ content } : { content : contentType }) => {

    return (
        <div>ContentModal { content.link }</div>
    )
}

export default ContentModal