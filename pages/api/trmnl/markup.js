export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify the authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the user UUID from the request body
  const { user_uuid } = req.body;
  if (!user_uuid) {
    return res.status(400).json({ error: 'Missing user_uuid' });
  }

  // Basic Hello World markup for all layouts
  const response = {
    "markup": `
      <div class="view view--full">
        <div class="layout">
          <div class="columns">
            <div class="column">
              <div class="markdown gap--large">
                <span class="title">Hello</span>
                <div class="content-element content content--center">World</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    "markup_half_horizontal": `
      <div class="view view--half_horizontal">
        <div class="content-element content content--center">
          Hello World
        </div>
      </div>
    `,
    "markup_half_vertical": `
      <div class="view view--half_vertical">
        <div class="content-element content content--center">
          Hello World
        </div>
      </div>
    `,
    "markup_quadrant": `
      <div class="view view--quadrant">
        <div class="content-element content content--center">
          Hello World
        </div>
      </div>
    `
  };

  res.status(200).json(response);
} 