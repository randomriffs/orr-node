import React, { useState, useEffect } from 'react';
import './blackAComponent.css'

export function BlackAComponent(props){
  let textData = `“The awful thing is 
  that beauty is mysterious as well as terrible.
   God and the devil are fighting there and 
   the battlefield is the heart of man.”`
   let arrayText = textData.split('');
  const [finalData, setTextData] = useState('');
  const [count, setCount] = useState(0);
  useEffect(() => {
        handleAInText();
  });
  const handleAInText = ()=>{
      let onlyA = ''
    //   debugger
    //   textData.split().map((eachLetter)=>{
    //     if(['a','A'].includes(eachLetter)){
    //         onlyA+=eachLetter
    //     }else {
    //         onlyA+='&nbsp;'
    //     }
    //   })
      
    //   var text = $("#theTextArea").val();
      
    //   debugger
      for(let i=0;i<arrayText.length;i++){
        //   setCount(count+1)
        let isContainLinkBreak = /\r|\n/.exec(arrayText[i]);
        if(['a','A'].includes(arrayText[i]) || isContainLinkBreak){
            onlyA+=arrayText[i]
            setTextData(onlyA)
        }else {
            onlyA+=' '
            setTextData(onlyA)
        }
      }
    //   debugger
    //   console.log('only a',onlyA)
      
    setTimeout(() => {
        setRestData()
    }, 1000);  
  }
  const setRestData = ()=>{
    let finalArr = finalData.split('');
      if(finalArr.length>1){
        for(let i=0;i<arrayText.length;i++){
            let restData = finalArr;
            debugger
            restData[i]=arrayText[i]
            setTextData(restData)
        }
      }

  }
  return (
    <React.Fragment>
      <div className="backA-container">
        <pre>
            {`${finalData}`}
        </pre>
      </div>
    </React.Fragment>
  )
}

