import axios from "axios"
import { API_URL } from "../config/config";


export const getPresignedUrl = async ({ id, attachmentType }) => {

    try {
        const response = await axios.get(`${API_URL}/forms/${id}/attachments/url`,
            { params: { attachmentType } }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }

}