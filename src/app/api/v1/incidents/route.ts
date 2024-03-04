import { fetchData } from "@/components/essentails/functions/fetchData";
import urlHeaderMaker from "@/components/essentails/functions/urlHeaderMaker";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { token, url }: any = await urlHeaderMaker(req,"incidents");

        const data = await fetchData(url, token);
if(data===401){
    return NextResponse.json(
        null,
        { status: 401, statusText: "Token Expired" }
    );
}
        if (data && data.length > 0) {
            return NextResponse.json(
                { value: data },
                { status: 200, statusText: "Incidents fetched successfully" }
            );
        } else {
            return NextResponse.json(
                null,
                { status: 404, statusText: "No incidents found" }
            );
        }
    } catch (error:any) {
        console.error("Error:", error);
        return NextResponse.json(
            null,
            { status: error.status||500, statusText: "Internal Server Error" }
        );
    }
};
