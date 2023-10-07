import { useState, useEffect } from "react"
import Menu from "../components/Menu"
import Questions from "../components/Questions"
import {nanoid} from "nanoid"
import blob from "./assets/blob.svg"

function App() {
 
   const [started, setStarted] = useState(false);
   const [count, setCount] = useState(0);
   const [checked, setChecked] = useState(false);
   const [correct, setCorrect] = useState(0);
   const [questions,setQuestion] = useState([]);

   const shuffleArr = (arr)=> arr.sort(()=> Math.random() - 0.5);


   useEffect(()=>{

    async function getQuestions(){ 

      const res = await fetch("https://opentdb.com/api.php?amount=5&category=18");
      const data = await res.json();
      const quest = [];

      data.results.forEach(question =>{
           quest.push({
              id: nanoid(),
              question: question.question,
              answers : shuffleArr([...question.incorrect_answers, question.correct_answer]),
              correct : question.correct_answer,
              selected: null,
              checked:false
           });

           setQuestion(quest)

      })
    
    }
       //changed and edited.....
    getQuestions();


   },[count])



   function start(){
      setStarted(oldState=> !oldState)
   };




   const questionElements = questions? questions.map(question =>(
       <Questions
         key={question.id}
         question = {question}
         id = {question.id}
         handleClick= {handleClick}
       />
   )) : []



       function handleCheck(){
          
        let selected = true;

        questions.forEach(question=>{ 
          if(question.selected === null){
            selected = false;
            return;
          }
        });



        if(!selected){
          return;
        }


        setQuestion(oldQuestion => oldQuestion.map(question =>{

                             return {...question, checked:true}         
        }))


        setChecked(true);



        let correct = 0;
        questions.forEach(question =>{
              if(question.correct === question.selected){
                correct += 1;
              }
        })

        setCorrect(correct);
     };



        function handleClick(id,answer){

            setQuestion(oldQuestion=> oldQuestion.map(question=>{

                      return question.id === id? {...question, selected:answer} : question
            }));
          
        };


        function playAgain(){
            setCount(oldCount => oldCount + 1);
            setChecked(false)
        };



  return (
  
    <div className="main-container">
       <div className="content-container">
          {
            started? 
            <div className="start-content-container">

                 {questionElements}

                <div className="end-div">
                  {checked && <span className="score">You scored {correct}/5 corect answers</span>}
                  <button className="check" onClick={checked? playAgain : handleCheck}>{checked? "Play Again" :"Check Answer"}</button>
                </div> 
            </div> 
            :
            <Menu  value={start}/>
          }
       </div>

       <div className="blob">
          <img src={blob} alt="" />
       </div>
    </div>
    
  )
}

export default App
