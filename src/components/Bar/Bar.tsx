import React, { useEffect, useState } from "react";

export default function Bar() {
  const [time, setTime] = useState(10);

  useEffect(() => {
    function countDown() {
      setTimeout(() => {
        setTime((t) => {
          if (t > 1) countDown();
          return t - 1;
        });
      }, 1000);
    }
    countDown();
  }, []);

  return (
    <div>
      {time > 0 ? (
        <div>
          活动还剩余
          {time}秒开始!!!
        </div>
      ) : (
        <div>开始抢购</div>
      )}
    </div>
  );
}
