import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {ethers} from "ethers";
import Counter from "./contracts/Counter.sol/Counter.json"


import "./App.css";

const counterAddress = '0x7bbeE3C5bd6c7171eF271B50F2918846F12A1c6E';
console.log(counterAddress, "Counter ABI",Counter.abi);


function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const incrementCounter = async() => {
    // we should read currentCount from the blockchain
   // const currentCount = count;
    //setCount(currentCount + 1);
    await updateCounter();
  };

  useEffect(() => {
    const fetchCount = async () => {
      const data = await readCounterValue();
      return data;
    };
    fetchCount().catch(console.error);
  }, [readCounterValue]);

  async function requestAccount(){
    await window.ethereum.request({method: "eth_requestAccounts"});
  }

  
 //  const readCounterValue = async() => {

    async function readCounterValue() {
    if (typeof window.ethereum !== "undefined"){
      const provider = new ethers.BrowserProvider(window.ethereum);

      console.log("provider", provider);

      const contract = new ethers.Contract(
        counterAddress,
        Counter.abi,
        provider

      );
      console.log("{contract", contract);

      try {
        const data = await contract.retrieve();
        console.log(data);
        console.log("data: ", parseInt(data.toString()));
        setCount(parseInt(data.toString()));
      }catch(err){
        console.log("Error: ",err);
        alert("Switch your MetaMask network to Polygon zkEVM and refresh");
      }
    
    } 
  }

  async function updateCounter() {
    if(typeof window.ethereum !== "undefined"){
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("provider", provider);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
      const transaction = await contract.increment();
      setIsLoading(true);
      await transaction.wait();
      setIsLoading(false);
      readCounterValue();
    }
  }


 


  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, marginTop: 20 }}>
        <CardContent>
          <p>Count: {count}</p>
          <Button onClick={incrementCounter} 
          variant="outlined"
          disabled = {isLoading}
          >
            {isLoading ? "loading..." : "+1"}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
