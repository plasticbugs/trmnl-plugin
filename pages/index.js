import { useEffect, useState } from 'react';

export default function Home() {
  const [apiData, setApiData] = useState(null);
  
  useEffect(() => {
    // Fetch data from our API endpoint
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error('Error fetching API data:', error));
  }, []);

  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>TRMNL Hello World Plugin</h1>
      
      <p>This is a simple plugin for the TRMNL eink device. The API endpoint at <code>/api/hello</code> provides 
      data that can be displayed on your TRMNL device.</p>
      
      <h2>API Response Preview:</h2>
      
      {apiData ? (
        <pre style={{ 
          backgroundColor: '#f4f4f4', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto' 
        }}>
          {JSON.stringify(apiData, null, 2)}
        </pre>
      ) : (
        <p>Loading API data...</p>
      )}
      
      <h2>TRMNL Configuration</h2>
      
      <p>In your TRMNL dashboard:</p>
      <ol>
        <li>Create a new Private Plugin</li>
        <li>Select the "Polling" strategy</li>
        <li>Enter the API URL: <code>https://your-vercel-deployment-url/api/hello</code></li>
        <li>For the markup template, you can use something like:</li>
      </ol>
      
      <pre style={{ 
        backgroundColor: '#f4f4f4', 
        padding: '1rem', 
        borderRadius: '4px',
        overflow: 'auto'
      }}>
{`<div class="screen screen-center">
  <div class="title">{{ title }}</div>
  <div class="subtitle">{{ message }}</div>
  <hr>
  <div class="text-large">{{ date }}</div>
  <div class="text-large">{{ time }}</div>
  <div class="text-small">Random counter: {{ counter }}</div>
</div>`}
      </pre>
    </div>
  );
} 