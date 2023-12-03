
import { useEffect, useState } from "react";
import { TableRendered } from "./TableRendered";
export interface DataType {
  id: string;
  name: string;
  email: string;
  role: string;
}
function App() {

  const [fetchedData, setFetchedData] = useState<DataType[] | null>(null);

  // Data Fetching Login
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const fetchRes = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
          {
            signal: signal,
          }
        );
        const data = (await fetchRes.json()) as DataType[];
        setFetchedData(() => data);
      } catch (err) {
        if (err instanceof DOMException) {
          console.log("aborted");
        }
      }
    })();
    return () => {
      controller.abort();
    };
  }, []);






  if (fetchedData == null) {
    return (
      <h3 className="font-semibold text-center mt-12">Loading.. Dashboard..</h3>
    );
  }

 
   
  

  return (
    <>
      <TableRendered FetchData={fetchedData}/>
    </>
  );

}

export default App;
