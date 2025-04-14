import { GOOGLE_LOGIN_URL } from "~/lib/urls"

export const getAuthorizationUrl = async (): Promise<string> => {
    const resp = await fetch(GOOGLE_LOGIN_URL)
    const data: string = await resp.json()
    return data
}