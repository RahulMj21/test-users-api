import { NextResponse } from "next/server";
import users from "@/data/USER_DATA.json";
import { z } from "zod";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit");
    const data = limit && Number(limit) ? users.slice(0, Number(limit)) : users;

    return NextResponse.json({ status: "OK", data }, { status: 200 });
}

const UserSchema = z.object({
    first_name: z.string({ required_error: "first_name is a required field" }),
    last_name: z.string({ required_error: "last_name is a required field" }),
    email: z
        .string({ required_error: "email is a required field" })
        .email("please provide a valid email"),
    city: z.string({ required_error: "city is a required field" }),
});

export async function POST(req: Request) {
    let body: z.infer<typeof UserSchema> | null = null;

    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json(
            { status: "FAILED", message: "request body is missing" },
            { status: 422 }
        );
    }

    const parse = UserSchema.safeParse(body);
    if (parse.success === false) {
        return NextResponse.json(
            {
                status: "ERROR",
                error: parse.error.issues.map((item) => ({
                    path: item.path[0],
                    message: item.message,
                })),
            },
            { status: 422 }
        );
    }
    return NextResponse.json(
        { status: "OK", message: "user created successfully" },
        { status: 201 }
    );
}
