import { NextResponse } from "next/server"


const urlHeaderMaker = async (req: any,key:any) => {
    const token = req.headers.get("authorization")?.split("Bearer ")[1];
    if (!token) {
        return NextResponse.json(null, { status: 404, statusText: "Token not found, please log in again" });
    }
    const id = await req.headers.get("id");
    const group = await req.headers.get("group");
    const workspace =await req.headers.get("workspace");
    if (!id || !group || !workspace) {
        return NextResponse.json(null, { status: 400, statusText: "Missing required headers" });
    }
    const url = `https://management.azure.com/subscriptions/${id}/resourceGroups/${group}/providers/Microsoft.OperationalInsights/workspaces/${workspace}/providers/Microsoft.SecurityInsights/${key}?api-version=2023-11-01`;
    return { token, url };
}

export default urlHeaderMaker