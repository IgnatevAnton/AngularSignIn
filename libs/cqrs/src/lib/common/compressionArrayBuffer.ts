export function compressionArrayBuffer(input: ArrayBuffer): Promise<ArrayBuffer> {
  const ds = new CompressionStream("deflate-raw");
  const writer = ds.writable.getWriter();
  writer.write(input);
  writer.close();
  return new Response(ds.readable).arrayBuffer();
}
