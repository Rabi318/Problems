import { useEffect, useRef, useState } from "react";

const UserForm = () => {
  const [name, setName] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log("Name Changed: ", name);
  }, [name]);
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mt-4 "
        placeholder="Enter Your Name"
      />
      <button
        ref={buttonRef}
        onClick={() => alert(`Hello ${name}`)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Say Hello
      </button>
    </div>
  );
};

export default UserForm;
