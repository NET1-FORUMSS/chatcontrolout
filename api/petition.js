export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch(
            `https://api.jsonbin.io/v3/b/${process.env.BIN_ID}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': process.env.MASTER_KEY,
                    'X-Access-Key': process.env.ACCESS_KEY
                },
                body: JSON.stringify(req.body)
            }
        );

        const data = await response.json();

        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}
