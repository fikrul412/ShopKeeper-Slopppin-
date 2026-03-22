import axios from 'axios'
import './App.css'
import { useState } from 'react';

interface Datas {
  persona: string,
  username: string
}

interface ResponseData {
  confidence: number,
  happiness: number,
  message: string,
  name: string,
  warmth: number
}

const initDatas: Datas = {
  persona: "",
  username: ""
}

function App() {
  const [data, setData] = useState<Datas>(initDatas);
  const [result, setResult] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function postData() {
  try {
    setIsLoading(true);
    const response = await axios.post("http://127.0.0.1:5000/data", {
      persona: data.persona,
      username: data.username
    });

    const aiResponse: ResponseData = response.data.content;
    setResult(aiResponse);
    setIsLoading(false);

  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}

  return (
    <>
      <div className='main-container'>
        <h1>AI ShopeKeeper</h1>
        <hr className='line' />
        
        <div className='display-container'>
          {isLoading && <p>Loading...</p>}
          {result && (
            <div className="ai-bubble">
              <p>{result.message}</p>
            </div>
          )}
        </div>

        <div className='control-container'>
          <div className='left'>
            <input 
              type="text" 
              className='input' 
              placeholder='Username' 
              onChange={(e) => setData({ ...data, username: e.target.value })} 
            /> 
            <input 
              type="text" 
              className='input' 
              placeholder='Product' 
              onChange={(e) => setData({ ...data, persona: e.target.value })}
            />
            <button className='btn-submit' onClick={postData}>Submit</button>
          </div>
          <div className='right'>
            <img src="src/assets/sample.png" alt="" className="img"/>
            <p className='name-char stat'>Name: {result?.name || "???"}</p>
            <p className='confidence-stat stat'> Confidence: {result?.confidence || 0}%</p>
            <p className='happiness-stat stat'> Happiness: {result?.happiness || 0}%</p>
            <p className='affection-stat stat'> Affection: {result?.warmth || 0}%</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;