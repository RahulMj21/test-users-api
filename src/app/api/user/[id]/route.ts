import users from "@/data/USER_DATA.json";
import { NextResponse } from "next/server";

interface IParams {
    params: {
        id: string;
    };
}

export async function GET(_req: Request, { params }: IParams) {
    const { id } = params;

    const user = users.find((item) => item.id === Number(id));
    if (!user) {
        return NextResponse.json(
            { status: "OK", message: `user not found with the id: ${id}` },
            { status: 404 }
        );
    } else {
        return NextResponse.json({ status: "OK", data: user }, { status: 200 });
    }
}

export async function PUT(_req: Request, { params }: IParams) {
    const { id } = params;

    const user = users.find((item) => item.id === Number(id));
    if (!user) {
        return NextResponse.json(
            { status: "OK", message: `user not found with the id: ${id}` },
            { status: 404 }
        );
    } else {
        return NextResponse.json(
            { status: "OK", message: "user updated successfully" },
            { status: 200 }
        );
    }
}

export async function DELETE(_req: Request, { params }: IParams) {
    const { id } = params;

    const user = users.find((item) => item.id === Number(id));
    if (!user) {
        return NextResponse.json(
            { status: "OK", message: `user not found with the id: ${id}` },
            { status: 404 }
        );
    } else {
        return NextResponse.json(
            { status: "OK", message: "user deleted successfully" },
            { status: 200 }
        );
    }
}
