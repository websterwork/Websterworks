import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="mt-4 inline-block bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Websterwork is operated by <strong>Muhammad Hussnain</strong> from Lahore, Pakistan.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Welcome to Websterwork ("we," "our," or "us"). We are committed to protecting 
              your personal information and your right to privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when 
              you visit our website <Link href="https://websterwork.com" className="text-blue-600 dark:text-blue-400 hover:underline">websterwork.com</Link>.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              By using our website, you consent to the data practices described in this 
              policy. If you do not agree with the terms of this policy, please do not 
              access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  2.1 Personal Information
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When you contact us through our website, we may collect:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Phone number (if provided)</li>
                  <li>Any other information you voluntarily provide in your message</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  2.2 Automatically Collected Information
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                  <li>IP address and browser type</li>
                  <li>Pages you visit and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Device information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use the information we collect for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>To respond to your inquiries and provide customer service</li>
              <li>To improve our website and services</li>
              <li>To send you updates and information about our services</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To protect against unauthorized access and ensure website security</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Data Protection and Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal 
              information. However, no method of transmission over the Internet or 
              electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We retain your personal information only for as long as necessary to 
              fulfill the purposes outlined in this policy.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may use third-party services such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Website hosting providers</li>
              <li>Analytics tools (Google Analytics)</li>
              <li>Email service providers</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              These third parties have access to your information only to perform 
              specific tasks on our behalf and are obligated not to disclose or use 
              it for any other purpose.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may use cookies and similar tracking technologies to track activity 
              on our website and store certain information. You can instruct your 
              browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              However, if you do not accept cookies, you may not be able to use some 
              portions of our website.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Your Data Protection Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Depending on your location, you may have the following rights regarding 
              your personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate or incomplete data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              To exercise these rights, please contact us at{' '}
              <Link href="mailto:info@websterwork.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                info@websterwork.com
              </Link>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our website is not intended for children under the age of 13. We do not 
              knowingly collect personal information from children under 13. If you are 
              a parent or guardian and believe your child has provided us with personal 
              information, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you 
              of any changes by posting the new Privacy Policy on this page and updating 
              the "Last updated" date.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              You are advised to review this Privacy Policy periodically for any changes. 
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions or concerns about this Privacy Policy, please 
              contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Business Name</p>
                  <p className="font-medium dark:text-white">Websterwork</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Legal Owner</p>
                  <p className="font-medium dark:text-white">Muhammad Hussnain</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href="mailto:info@websterwork.com" className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline">
                    info@websterwork.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <Link href="tel:+923134385885" className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline">
                    +92 313 4385885
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                  <Link href="https://websterwork.com" className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline">
                    https://websterwork.com
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Websterwork. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <Link href="/legal/terms&conditions" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/legal/owner" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Business Verification
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/contacts" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}