export function decompressionArrayBuffer(input: ArrayBuffer): Promise<ArrayBuffer> {
    const ds = new DecompressionStream("deflate-raw");
    const writer = ds.writable.getWriter();
    writer.write(input);
    writer.close();
    return new Response(ds.readable).arrayBuffer();
}
