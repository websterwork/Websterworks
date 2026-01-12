import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms and Conditions
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
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By accessing and using <Link href="https://websterwork.com" className="text-blue-600 dark:text-blue-400 hover:underline">websterwork.com</Link> 
              ("the Website"), you accept and agree to be bound by these Terms and Conditions. 
              If you disagree with any part of these terms, you may not access the Website.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms apply to all visitors, users, and others who access or use the Website.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Unless otherwise stated, Websterwork and/or its licensors own the intellectual 
                property rights for all material on the Website. All intellectual property 
                rights are reserved.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                You may access this from Websterwork for your own personal use subjected to 
                restrictions set in these terms and conditions.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700 dark:text-yellow-300">
                  <strong>You must not:</strong>
                </p>
                <ul className="list-disc pl-6 mt-2 text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>Republish material from this Website</li>
                  <li>Sell, rent, or sub-license material from the Website</li>
                  <li>Reproduce, duplicate, or copy material from the Website</li>
                  <li>Redistribute content from Websterwork</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Services Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Services Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Websterwork provides digital services including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Web design and development</li>
              <li>Mobile application development</li>
              <li>Digital consulting services</li>
              <li>UI/UX design</li>
              <li>Digital marketing consultation</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              All services are provided on a project basis with specific terms outlined in 
              individual service agreements.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By using our Website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Provide accurate and complete information when contacting us</li>
              <li>Not use the Website for any unlawful purpose</li>
              <li>Not attempt to gain unauthorized access to any part of the Website</li>
              <li>Not interfere with or disrupt the Website or servers</li>
              <li>Not use automated systems or software to extract data</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Limitation of Liability
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                To the maximum extent permitted by applicable law, Websterwork shall not be 
                liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
                <p className="text-red-700 dark:text-red-300">
                  <strong>Disclaimer:</strong> The information on this Website is provided 
                  "as is" without any representations or warranties, express or implied. 
                  Websterwork makes no representations or warranties in relation to the 
                  completeness, accuracy, reliability, suitability, or availability of the 
                  information on the Website.
                </p>
              </div>
            </div>
          </section>

          {/* Project Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Project Terms
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  6.1 Quotations and Pricing
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All project quotations are valid for 30 days from the date of issue. 
                  Prices are subject to change based on project scope adjustments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  6.2 Payment Terms
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Payment terms will be specified in individual project agreements. 
                  Typically, projects require:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-300 space-y-1">
                  <li>50% advance payment to commence work</li>
                  <li>25% upon milestone completion</li>
                  <li>25% upon project delivery</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                  6.3 Project Timeline
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project timelines are estimates and may vary based on project complexity, 
                  client responsiveness, and scope changes. We will provide regular updates 
                  on project progress.
                </p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may terminate or suspend access to our Website immediately, without prior 
              notice or liability, for any reason whatsoever, including without limitation 
              if you breach the Terms.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              All provisions of the Terms which by their nature should survive termination 
              shall survive termination, including, without limitation, ownership provisions, 
              warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              These Terms shall be governed and construed in accordance with the laws of 
              Pakistan, without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Any disputes arising from these Terms or your use of the Website shall be 
              subject to the exclusive jurisdiction of the courts of Lahore, Pakistan.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these 
              Terms at any time. If a revision is material, we will try to provide at least 
              30 days' notice prior to any new terms taking effect.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              By continuing to access or use our Website after those revisions become 
              effective, you agree to be bound by the revised terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For any questions about these Terms and Conditions, please contact us:
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
                  <Link href="mailto:info@websterwork.com" className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline">
                    info@websterwork.com
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <Link href="tel:+923134385885" className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline">
                    +92 313 4385885
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p className="font-medium dark:text-white">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </section>

          {/* Acceptance Section */}
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
              Acceptance of Terms
            </h3>
            <p className="text-green-700 dark:text-green-400">
              By using this Website, you acknowledge that you have read these Terms and 
              Conditions, understand them, and agree to be bound by them. If you do not 
              agree to these Terms, please do not use our Website.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Websterwork. All rights reserved.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link href="/legal/privacypolicy" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
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