export async function GET() {
  const notionBlock = await fetch(
    `https://api.notion.com/v1/blocks/${process.env.NT_BLOCK}/children`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Notion-Version': '2022-06-28',
        Authorization: `Bearer ${process.env.NT_TOKEN}`,
      }
    }
  );
  console.log(notionBlock)
  return new Response(`html`);
}