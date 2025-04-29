export default function WifiQRDocs() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">WiFi QR Code Plugin for TRMNL</h1>

      <div className="prose">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-6">
          The WiFi QR Code plugin helps Airbnb hosts and property managers create easy-to-scan QR codes 
          that automatically connect guests to your WiFi network. No more typing complicated passwords or 
          leaving sensitive WiFi credentials on paper!
        </p>

        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Secure storage of WiFi credentials</li>
          <li>Automatic QR code generation</li>
          <li>Works with all modern smartphones</li>
          <li>Multiple display layouts for TRMNL screens</li>
          <li>Easy to update when you change your WiFi password</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <ol className="list-decimal pl-6 mb-6">
          <li className="mb-3">
            <strong>Install the Plugin</strong>
            <p>From your TRMNL dashboard, search for "WiFi QR Code" and click Install.</p>
          </li>
          <li className="mb-3">
            <strong>Configure Your WiFi Settings</strong>
            <p>After installation, you'll be directed to the settings page where you can enter your:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>WiFi Network Name (SSID)</li>
              <li>WiFi Password</li>
            </ul>
          </li>
          <li className="mb-3">
            <strong>Add to Your TRMNL Display</strong>
            <p>Choose how to display your QR code:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Full screen for maximum visibility</li>
              <li>Half screen (vertical or horizontal) for use with other content</li>
              <li>Quadrant for a compact display</li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p className="mb-6">
          We take the security of your WiFi credentials seriously:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>All WiFi credentials are encrypted before storage</li>
          <li>Data is automatically deleted when you uninstall the plugin</li>
          <li>No plain-text passwords are ever stored</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">QR Code Not Scanning?</h3>
          <ul className="list-disc pl-6">
            <li>Ensure your TRMNL display is clean and well-lit</li>
            <li>Verify that you've entered the correct WiFi credentials</li>
            <li>Try updating your device's screen refresh rate</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Support</h2>
        <p className="mb-6">
          Need help? Contact us at support@yourdomain.com or visit our 
          <a href="https://github.com/yourusername/wifi-qr-plugin/issues" className="text-blue-600 hover:text-blue-800 ml-1">
            GitHub issues page
          </a>.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Updates</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Latest Version: 1.0.0</h3>
          <ul className="list-disc pl-6">
            <li>Initial release</li>
            <li>Support for all TRMNL display layouts</li>
            <li>Secure credential storage</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 