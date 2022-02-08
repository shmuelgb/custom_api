import React, { useEffect } from "react";
import { useTokenPro } from "../../providers/SessionProvider";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const [token] = useTokenPro();
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push("/login");
  }, [token, history]);

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
      nostrum eos vitae eum temporibus quisquam laboriosam, ea veniam sequi
      assumenda expedita ipsa doloremque praesentium officiis maiores commodi ut
      est hic?
    </div>
  );
}
