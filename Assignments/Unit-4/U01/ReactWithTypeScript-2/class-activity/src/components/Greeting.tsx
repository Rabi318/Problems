type GreetingProps = {
  name: string;
  age?: number;
};

const Greeting = ({ name, age }: GreetingProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold track-widest">
        Hello, {name} {age}
      </h1>
    </div>
  );
};

export default Greeting;
