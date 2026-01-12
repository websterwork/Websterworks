import Link from "next/link";
export default function BusinessVerificationPage() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="">
          
          {/* Simple Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Business Verification</h1>
            <p className="mt-2 text-gray-600 dark:text-white">Websterwork - Owner Information</p>
          </div>
  
          {/* Clean Card */}
          <div className="w-full bg-white dark:bg-gray-800  rounded-lg shadow-sm border p-6 md:p-8">
            
            {/* Owner Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Owner Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">Legal Name</p>
                    <p className="font-medium dark:text-white">Muhammad Hussnain</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">CNIC</p>
                    <p className="font-mono dark:text-white">XXXXX-0674482-X</p>
                  </div>
                </div>
              </div>
  
              {/* Business Information */}
              <div className="pt-4 border-t">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Business Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">Business Name</p>
                    <p className="font-medium dark:text-white">Websterwork</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">Business Type</p>
                    <p className="font-medium dark:text-white">Sole Proprietorship</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">Address</p>
                    <p className="font-medium dark:text-white ">Green Town, Lahore, Pakistan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white">Contact:</p>
                    <p className="font-medium dark:text-white">+92 313-4385885</p>
                    <p className="text-sm text-gray-500 dark:text-white">Email:</p>
                    <p className="font-medium dark:text-white">info@websterwork.com</p>
                  </div>
                </div>
              </div>
  
              {/* Digital Information */}
              <div className="pt-4 border-t">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Digital Information</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">Website</span>
                    <Link href="https://websterwork.com" className="text-blue-600 hover:underline">
                      websterwork.com
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">Domain Verified</span>
                    <span className="text-green-600 font-medium">Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-white">SSL Certificate</span>
                    <span className="text-green-600 dark:text-white font-medium">Active</span>
                  </div>
                </div>
              </div>
  
              {/* Simple Statement */}
              <div className="pt-4 border-t">
                <p className="text-gray-700 dark:text-white">
                  This page verifies that Muhammad Hussnain is the owner and operator of Websterwork.
                </p>
              </div>
  
              {/* Security Notes */}
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-500 dark:text-white space-y-2">
                  <p>• CNIC is masked for security purposes</p>
                  <p>• Full documents available through secure verification channels</p>
                  <p>• This is an owner information page for verification</p>
                </div>
              </div>
  
            </div>
  
          </div>
        </div>
      </div>
    );
  }