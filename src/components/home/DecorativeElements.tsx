
import React from "react";

const DecorativeElements: React.FC = () => {
  return (
    <>
      {/* Top-left decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-nova-deep-purple/20 to-nova-blue/10 blur-3xl animate-scale-pulse"></div>
      </div>
      
      {/* Top-right decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] translate-x-1/3 -translate-y-1/3">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-l from-nova-hot-pink/15 to-nova-vivid-orange/10 blur-3xl animate-scale-pulse animation-delay-2000"></div>
      </div>
      
      {/* Center decorative element */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none">
        <div className="absolute w-full h-full rounded-full border-[50px] border-nova-blue/5 animate-spin-slow"></div>
        <div className="absolute w-[70%] h-[70%] top-[15%] left-[15%] rounded-full border-[40px] border-nova-deep-purple/5 animate-spin-slow animation-delay-1000" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute w-[40%] h-[40%] top-[30%] left-[30%] rounded-full border-[30px] border-nova-hot-pink/5 animate-spin-slow"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-nova-blue/40 blur-sm animate-float"></div>
      <div className="absolute top-3/4 left-1/3 w-2 h-2 rounded-full bg-nova-deep-purple/40 blur-sm animate-float animation-delay-500"></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-4 rounded-full bg-nova-hot-pink/30 blur-sm animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-nova-vivid-orange/40 blur-sm animate-float animation-delay-1500"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-nova-blue/30 blur-sm animate-float animation-delay-2000"></div>
    </>
  );
};

export default DecorativeElements;
