import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Timer = ({ className }: { className?: string }) => {
  const targetDate = new Date("2024-09-29T04:00:00.000Z").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isGameStarted, setIsGameStarted] = useState(false);

  function padNumber(num: number, totalLength: number = 2, paddingChar = "0") {
    const numStr = num.toString();

    return numStr.padStart(totalLength, paddingChar);
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = now - targetDate;
      if (difference > 0) setIsGameStarted(true);
      const days = Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = Math.abs(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      const minutes = Math.abs(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      );
      const seconds = Math.abs(Math.floor((difference % (1000 * 60)) / 1000));

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div
      className={cn(
        "w-32 flex gap-2 justify-center items-center text-4xl",
        className
      )}
    >
      {!isGameStarted && "-"}
      <span>{timeLeft.days}</span>:<span>{padNumber(timeLeft.hours, 2)}</span>:
      <span>{padNumber(timeLeft.minutes, 2)}</span>:
      <span>{padNumber(timeLeft.seconds, 2)}</span>
    </div>
  );
};

export default Timer;
