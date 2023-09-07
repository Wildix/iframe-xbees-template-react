import connectProvider from "./connectProvider";

let cache: number;

export default async function setViewport( offset: number = 0): Promise<void> {
  const height = document.body.clientHeight + offset;

  if (height !== cache) {
    const width = document.documentElement.scrollWidth;
    cache = height;
    await connectProvider().setViewport({ height, width });
  }
}
