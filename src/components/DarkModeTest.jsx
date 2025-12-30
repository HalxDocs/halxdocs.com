export default function DarkModeTest() {
  return (
    <div className="fixed top-4 right-4 z-[9999] p-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white">
      <p>If you see white background and black text, dark mode is OFF</p>
      <p>If you see dark background and white text, dark mode is ON</p>
    </div>
  );
}