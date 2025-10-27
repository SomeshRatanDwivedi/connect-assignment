import { CONNECT_LOGO_URL } from "@/constants";
import { memo } from "react";
//Rendering the header of app
const Header = () => (
  <header className="border-b border-(--primary) px-4">
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-xl font-bold tracking-wider">
            <img src={CONNECT_LOGO_URL} alt="logo" />
          </div>
        </div>
  
        {/* Required Feature Badge */}
        <div className="bg-(--primary) px-4 py-2 rounded text-sm font-medium tracking-wide">
          REQUIRED FEATURE
        </div>
      </div>
    </div>
  </header>

);

export default memo(Header);