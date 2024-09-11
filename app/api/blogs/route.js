import { ConnectDB } from "@/lib/config/db";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
const { NextResponse } = require("next/server");

const LoadDB = async () => {
    await ConnectDB();
};

LoadDB();

export async function GET(request) {
    return NextResponse.json({ msg: "Api works" });
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();
        const image = formData.get('image'); // Ensure this matches the form field name
        
        if (!image) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        
        // Construct the file path
        const directory = path.join(process.cwd(), 'assets', 'images');
        
        // Ensure the directory exists
        await mkdir(directory, { recursive: true });
        
        const filepath = path.join(directory, `${timestamp}_${image.name}`);
        
        // Write the file
        await writeFile(filepath, buffer);
        
        // Return the URL
        const imgUrl = `/assets/images/${timestamp}_${image.name}`;
        console.log(imgUrl);
        
        return NextResponse.json({ imgUrl });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
