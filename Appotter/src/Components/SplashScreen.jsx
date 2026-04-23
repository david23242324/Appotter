import { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    const finish = setTimeout(() => onFinish(), 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(finish);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-8xl mb-6 animate-bounce">⚡</div>
      <h1 className="text-4xl font-bold text-yellow-400 tracking-widest mb-2">
        Harry Potter
      </h1>

      <p className="text-gray-400 text-sm tracking-widest uppercase">
        Characters DB
      </p>

      <div className="mt-10 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-400 rounded-full animate-[loading_2.5s_ease-in-out_forwards]" />
      </div>
    </div>
  );
};

export default SplashScreen;