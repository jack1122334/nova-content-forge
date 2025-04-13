
import React from "react";

const DecorativeElements: React.FC = () => {
  return (
    <>
      {/* Enhanced top-left decorative blobs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-nova-deep-purple/15 to-nova-blue/10 blur-3xl animate-scale-pulse"></div>
        <div className="absolute w-[70%] h-[70%] top-[15%] left-[15%] rounded-full bg-gradient-to-r from-nova-hot-pink/10 to-nova-blue/5 blur-3xl animate-scale-pulse animation-delay-1000"></div>
      </div>
      
      {/* Enhanced top-right decorative blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] translate-x-1/3 -translate-y-1/3">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-l from-nova-hot-pink/10 to-nova-vivid-orange/5 blur-3xl animate-scale-pulse animation-delay-2000"></div>
        <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] rounded-full bg-gradient-to-l from-nova-blue/10 to-nova-deep-purple/5 blur-3xl animate-scale-pulse animation-delay-3000"></div>
      </div>
      
      {/* Enhanced center decorative element */}
      <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
        <div className="absolute w-full h-full rounded-full border-[30px] border-nova-blue/5 animate-spin-slow"></div>
        <div className="absolute w-[75%] h-[75%] top-[12.5%] left-[12.5%] rounded-full border-[25px] border-nova-deep-purple/5 animate-spin-slow animation-delay-1000" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute w-[50%] h-[50%] top-[25%] left-[25%] rounded-full border-[20px] border-nova-hot-pink/5 animate-spin-slow"></div>
        <div className="absolute w-[25%] h-[25%] top-[37.5%] left-[37.5%] rounded-full border-[15px] border-nova-vivid-orange/5 animate-spin-slow animation-delay-2000" style={{ animationDirection: 'reverse' }}></div>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-nova-blue/20 blur-lg animate-float"></div>
      <div className="absolute top-3/4 left-1/3 w-8 h-8 rounded-full bg-nova-deep-purple/15 blur-lg animate-float animation-delay-500"></div>
      <div className="absolute top-2/3 right-1/4 w-10 h-10 rounded-full bg-nova-hot-pink/10 blur-lg animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-nova-vivid-orange/10 blur-lg animate-float animation-delay-1500"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-nova-blue/10 blur-xl animate-float animation-delay-2000"></div>
      
      {/* Additional ethereal elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-[400px] bg-gradient-to-t from-nova-blue/5 to-transparent blur-3xl opacity-30"></div>
      <div className="absolute top-[30%] right-[20%] w-[200px] h-[200px] bg-gradient-to-br from-nova-hot-pink/5 to-nova-vivid-orange/5 rounded-full blur-3xl animate-float-rotate animation-delay-700"></div>
      <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] bg-gradient-to-tr from-nova-deep-purple/5 to-nova-blue/5 rounded-full blur-3xl animate-float-rotate animation-delay-1500" style={{ animationDirection: 'reverse' }}></div>
    </>
  );
};

export default DecorativeElements;
