
import {nanoid} from "nanoid"


export default function Questions(props){

    function handleClick(answer){
        if(props.question.checked){
            return;
        }

        props.handleClick(props.id, answer)
    }

    const answerElement = props.question.answers.map(answer =>{

        let id = null;

          if(props.question.checked){

            if(props.question.correct === answer){

                id ="correct";

            }else if (props.question.selected === answer){

                id = "inCorrect";
                
            }else{

                id = "notSelected";
            }

          }

          return(
            <button key ={nanoid()} id = {id} className= {answer === props.question.selected? "answer selected" : "" } onClick={()=>handleClick(answer)}>{answer}</button>
          )
          
    })

    return(
        <div className="question-container">
            <h3 className="question-title">{props.question.question}</h3>
            {answerElement}

            <div className="line"></div>
        </div>
    )
}