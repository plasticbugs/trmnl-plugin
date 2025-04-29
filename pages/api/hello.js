export default function handler(req, res) {
  // Get current date and time
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Respond with JSON data for TRMNL
  res.status(200).json({
    title: "Hello TRMNL World!",
    message: "This is a basic TRMNL plugin",
    date: formattedDate,
    time: formattedTime,
    counter: Math.floor(Math.random() * 100) // Random number that changes on each poll
  });
} 