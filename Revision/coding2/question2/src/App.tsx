import "./App.css";
import Otp4RefOnly from "./components/otp4RefOnly";

function App() {
  return (
    <>
      <div>
        <Otp4RefOnly
          onChange={(v) => console.log("OTP so far:", v)}
          onComplete={(v) => console.log("OTP Completed:", v)}
        />
      </div>
    </>
  );
}

export default App;
