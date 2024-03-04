import { fetchData } from "@/components/essentails/functions/fetchData";
import urlHeaderMaker from "@/components/essentails/functions/urlHeaderMaker";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { token, url }: any = await urlHeaderMaker(req,"alertRules");

        const data = await fetchData(url, token);

        if (data && data.length > 0) {
            return NextResponse.json(
                { value: data },
                { status: 200, statusText: "Analytics fetched successfully" }
            );
        } else {
            return NextResponse.json(
                null,
                { status: 404, statusText: "No analytics found" }
            );
        }
    } catch (error:any) {
        console.error("Error:", error.status);
        return NextResponse.json(
            null,
            { status: error.status||500, statusText: "Internal Server Error" }
        );
    }
};
