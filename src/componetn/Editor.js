import React, { useEffect, useState } from 'react'
import purify from 'dompurify'
import axios from 'axios'

export default function Editor() {

   let[htmloutput,setHtmloutput]=useState("")
   
   function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  let Changee= (markupText)=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/`,markupText, { headers: { 'Content-Type': 'text/plain' } }).then((res)=>{
        console.log("API data",res.data)
         setHtmloutput(res.data)
        }).catch((error)=>{return error})

   }


   const processChange = debounce((e) => Changee(e.target.value));
  
  
    
   
   

//    console.log("ENV ",process.env.REACT_APP_BACKEND_URL)

   

  

     console.log("Outpt",htmloutput)

  return (
    <>
            <div className='App'>
               <div>
                    <div className='inline-div-left'>
                    <h2>MarkdownText</h2>
                    <textarea onChange={processChange} ></textarea>
                    </div>
               </div>
                    
                    <div className='ChildRight'>
                    <div>
                    <h2>ConvertedText</h2>
                    <div dangerouslySetInnerHTML={{ __html: purify.sanitize(htmloutput, { sanitize: true })}}></div>
                    </div>
                    </div>

      </div>
    </>
  )
}
